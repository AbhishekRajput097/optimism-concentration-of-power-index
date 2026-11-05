import tkinter as tk
from tkinter import Toplevel, messagebox
import csv
from datetime import datetime

def save_user_data(email, weights, scores, results):
    with open('../../../data/measuring_the_cop/frontend/user_data.csv', mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([email, datetime.now(), weights, scores, results])

def calculate_weighted_scores_and_percentages():
    try:
        # Get weights from user inputs
        WP = {
            "WD": float(entry_WD.get() or 1),
            "WS": float(entry_WS.get() or 1),
            "WC": float(entry_WC.get() or 1),
            "WO": float(entry_WO.get() or 1),
            "WV": float(entry_WV.get() or 1),
            "WVe": float(entry_WVe.get() or 1)
        }
        
        councils = {
            "Token House": [],
            "Citizens' House": [],
            "Grants Council": [],
            "Security Council": [],
            "Code of Conduct Council": [],
            "Developer Advisory Board": [],
            "Anticapture Commission": []
        }
        
        total_weighted_scores = 0
        weighted_scores = {}
        scores_data = {}

        for council in councils:
            scores = [
                float(entries[council]["D"].get() or 0),
                float(entries[council]["S"].get() or 0),
                float(entries[council]["C"].get() or 0),
                float(entries[council]["O"].get() or 0),
                float(entries[council]["V"].get() or 0),
                float(entries[council]["Ve"].get() or 0)
            ]
            scores_data[council] = scores
            weighted_score = (
                scores[0] * (WP["WD"] / 100) +
                scores[1] * (WP["WS"] / 100) +
                scores[2] * (WP["WC"] / 100) +
                scores[3] * (WP["WO"] / 100) +
                scores[4] * (WP["WV"] / 100) +
                scores[5] * (WP["WVe"] / 100)
            )
            weighted_scores[council] = weighted_score
            total_weighted_scores += weighted_score
        
        results = ""
        for council, score in weighted_scores.items():
            percentage = (score / total_weighted_scores) * 100
            results += f"{council}: ({percentage:.2f}%)\n"

        # Collect all necessary data
        email = entry_email.get()
        weights = WP
        scores = scores_data

        # Save the collected data
        save_user_data(email, weights, scores, results)

        display_results(results)
    except ValueError:
        display_results("Invalid input. Please enter valid numbers for weights and scores.", error=True)

def display_results(results, error=False):
    result_window = Toplevel(app)
    result_window.title("Results")
    result_window.geometry(f"{window_width}x{window_height}")

    result_label = tk.Label(result_window, text=results, font=('Helvetica', 12), justify=tk.LEFT, padx=10, pady=10)
    result_label.pack(expand=True, fill='both')

    if error:
        result_label.config(fg="red")

def mark_field_changed(event):
    widget = event.widget
    current_value = widget.get()
    initial_value = initial_values.get(widget, "")
    if current_value != initial_value:
        widget.config(bg='lightgreen')
    else:
        widget.config(bg='white')
    update_value_tracking_field()

def update_value_tracking_field():
    total = 0
    try:
        total += float(entry_WD.get() or 0)
        total += float(entry_WS.get() or 0)
        total += float(entry_WC.get() or 0)
        total += float(entry_WO.get() or 0)
        total += float(entry_WV.get() or 0)
        total += float(entry_WVe.get() or 0)
    except ValueError:
        total = 0
    
    remaining_value = 100 - total
    if remaining_value < 0:
        remaining_value = 0

    entry_value_tracking.config(state=tk.NORMAL)
    entry_value_tracking.delete(0, tk.END)
    entry_value_tracking.insert(0, str(remaining_value))
    entry_value_tracking.config(state='readonly')

    if remaining_value == 0:
        if not entry_WD.get(): entry_WD.insert(0, "0")
        if not entry_WS.get(): entry_WS.insert(0, "0")
        if not entry_WC.get(): entry_WC.insert(0, "0")
        if not entry_WO.get(): entry_WO.insert(0, "0")
        if not entry_WV.get(): entry_WV.insert(0, "0")
        if not entry_WVe.get(): entry_WVe.insert(0, "0")

    # Validate total sum of weights
    validate_weight_sum()

def validate_weight_sum():
    current_weights = [
        float(entry_WD.get() or 0),
        float(entry_WS.get() or 0),
        float(entry_WC.get() or 0),
        float(entry_WO.get() or 0),
        float(entry_WV.get() or 0),
        float(entry_WVe.get() or 0)
    ]
    total = sum(current_weights)
    if total > 100:
        messagebox.showwarning("Invalid Input", "Sum of all weights should not exceed 100. Please adjust the values.")
        # Reset only the invalid field to its previous value
        reset_invalid_weight()
    else:
        # Update the previous valid values if total is valid
        update_previous_values()

def update_previous_values():
    previous_values[entry_WD] = entry_WD.get()
    previous_values[entry_WS] = entry_WS.get()
    previous_values[entry_WC] = entry_WC.get()
    previous_values[entry_WO] = entry_WO.get()
    previous_values[entry_WV] = entry_WV.get()
    previous_values[entry_WVe] = entry_WVe.get()

def reset_invalid_weight():
    entry_WD.delete(0, tk.END)
    entry_WD.insert(0, previous_values[entry_WD])
    entry_WS.delete(0, tk.END)
    entry_WS.insert(0, previous_values[entry_WS])
    entry_WC.delete(0, tk.END)
    entry_WC.insert(0, previous_values[entry_WC])
    entry_WO.delete(0, tk.END)
    entry_WO.insert(0, previous_values[entry_WO])
    entry_WV.delete(0, tk.END)
    entry_WV.insert(0, previous_values[entry_WV])
    entry_WVe.delete(0, tk.END)
    entry_WVe.insert(0, previous_values[entry_WVe])
    update_value_tracking_field()

def validate_weight_entry(value):
    try:
        float_value = float(value)
        if 0 <= float_value <= 100:
            return True
        else:
            messagebox.showwarning("Invalid Input", "Sorry, you can enter a value only from 0 to 100 for weights.")
            return False
    except ValueError:
        if value == "":
            return True
        else:
            messagebox.showwarning("Invalid Input", "Sorry, you can enter a numeric value only for weights.")
            return False

def validate_score_entry(value):
    try:
        float_value = float(value)
        if 0 <= float_value <= 5:
            return True
        else:
            messagebox.showwarning("Invalid Input", "Sorry, you can enter a value only from 0 to 5 for scores.")
            return False
    except ValueError:
        if value == "":
            return True
        else:
            messagebox.showwarning("Invalid Input", "Sorry, you can enter a numeric value only for scores.")
            return False

def reset_field_value(event):
    widget = event.widget
    if widget.get() == "":
        widget.delete(0, tk.END)
        widget.insert(0, initial_values.get(widget, ""))
        widget.config(bg='white')

def show_main_app():
    instructions_window.destroy()
    app.deiconify()

def continue_to_main_app():
    email = entry_email.get()
    if email.strip() == "" or not validate_email(email):
        messagebox.showwarning("Invalid Input", "Please enter a valid email address.")
    else:
        show_main_app()

def validate_email(email):
    import re
    # Regular expression for validating an Email
    regex = r'^[a-zA-Z0-9]+[\._]?[a-zA-Z0-9]+[@]\w+[.]\w+$'
    if re.search(regex, email):
        return True
    else:
        return False

def initialize_csv():
    try:
        with open('../../../data/measuring_the_cop/frontend/user_data.csv', mode='x', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["Email", "Timestamp", "Weights", "Scores", "Results"])
    except FileExistsError:
        pass

initialize_csv()

app = tk.Tk()
app.title("Council Share Calculator")

# Hide the main app window initially
app.withdraw()

# Define other necessary variables and constants
screen_width = app.winfo_screenwidth()
screen_height = app.winfo_screenheight()

# Set window size based on screen size
window_width = int(screen_width * 1)
window_height = int(screen_height * 1)

# Create instruction window
instructions_window = Toplevel(app)
instructions_window.title("Instructions")
instructions_window.geometry(f"{window_width}x{window_height}")

instructions_label = tk.Label(instructions_window, text="Instructions:\n\nPlease fill in the weights and scores for each council.\n"
                                                        "Weights must sum up to 100. Scores can be between 0 and 5.\n\n"
                                                        "Enter your email address and press Continue to proceed.",
                              font=('Helvetica', 12), justify=tk.LEFT, padx=10, pady=10)
instructions_label.pack(expand=True, fill='both')

entry_email_label = tk.Label(instructions_window, text="Email:", font=('Helvetica', 12))
entry_email_label.pack(pady=(0, 5))
entry_email = tk.Entry(instructions_window, font=('Helvetica', 12))
entry_email.pack(pady=(0, 20))

continue_button = tk.Button(instructions_window, text="Continue", command=continue_to_main_app, font=('Helvetica', 12))
continue_button.pack(pady=(0, 20))

# Set the window size for the main app window
app.geometry(f"{window_width}x{window_height}")

council_names = [
    "Token House",
    "Citizens' House",
    "Grants Council",
    "Security Council",
    "Code of Conduct Council",
    "Developer Advisory Board",
    "Anticapture Commission"
]

entries = {council: {} for council in council_names}

# Frame for weights
frame_weights = tk.Frame(app, padx=10, pady=10)
frame_weights.pack(side=tk.TOP, fill=tk.X)

weight_labels = ["D", "S", "C", "O", "V", "Ve"]
weight_entries = []

for i, label in enumerate(weight_labels):
    tk.Label(frame_weights, text=f"Weight {label}:", font=('Helvetica', 12)).grid(row=0, column=i, padx=5, pady=5)

entry_WD = tk.Entry(frame_weights, font=('Helvetica', 12), validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))
entry_WS = tk.Entry(frame_weights, font=('Helvetica', 12), validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))
entry_WC = tk.Entry(frame_weights, font=('Helvetica', 12), validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))
entry_WO = tk.Entry(frame_weights, font=('Helvetica', 12), validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))
entry_WV = tk.Entry(frame_weights, font=('Helvetica', 12), validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))
entry_WVe = tk.Entry(frame_weights, font=('Helvetica', 12), validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))

entry_WD.grid(row=1, column=0, padx=5, pady=5)
entry_WS.grid(row=1, column=1, padx=5, pady=5)
entry_WC.grid(row=1, column=2, padx=5, pady=5)
entry_WO.grid(row=1, column=3, padx=5, pady=5)
entry_WV.grid(row=1, column=4, padx=5, pady=5)
entry_WVe.grid(row=1, column=5, padx=5, pady=5)

weight_entries.extend([entry_WD, entry_WS, entry_WC, entry_WO, entry_WV, entry_WVe])

# Initial values for weights
initial_values = {
    entry_WD: "10",
    entry_WS: "20",
    entry_WC: "30",
    entry_WO: "15",
    entry_WV: "15",
    entry_WVe: "10"
}

for entry in weight_entries:
    entry.insert(0, initial_values[entry])
    entry.bind("<KeyRelease>", mark_field_changed)
    entry.bind("<FocusOut>", reset_field_value)

# Frame for remaining value
frame_value_tracking = tk.Frame(app, padx=10, pady=10)
frame_value_tracking.pack(side=tk.TOP, fill=tk.X)

tk.Label(frame_value_tracking, text="Remaining Value:", font=('Helvetica', 12)).grid(row=0, column=0, padx=5, pady=5)
entry_value_tracking = tk.Entry(frame_value_tracking, font=('Helvetica', 12), state='readonly')
entry_value_tracking.grid(row=0, column=1, padx=5, pady=5)

update_value_tracking_field()

# Frame for councils and scores
frame_councils = tk.Frame(app, padx=10, pady=10)
frame_councils.pack(side=tk.TOP, fill=tk.BOTH, expand=True)

for i, council in enumerate(council_names):
    frame = tk.LabelFrame(frame_councils, text=council, padx=10, pady=10, font=('Helvetica', 12))
    frame.grid(row=i // 2, column=i % 2, padx=10, pady=10, sticky="nsew")

    labels = ["D", "S", "C", "O", "V", "Ve"]
    for j, label in enumerate(labels):
        tk.Label(frame, text=label, font=('Helvetica', 12)).grid(row=0, column=j, padx=5, pady=5)

        entry = tk.Entry(frame, font=('Helvetica', 12), validate="key", validatecommand=(app.register(validate_score_entry), '%P'))
        entry.grid(row=1, column=j, padx=5, pady=5)
        entry.bind("<KeyRelease>", mark_field_changed)
        entry.bind("<FocusOut>", reset_field_value)

        entries[council][label] = entry

# Frame for Calculate button
frame_button = tk.Frame(app, padx=10, pady=10)
frame_button.pack(side=tk.TOP, fill=tk.X)

calculate_button = tk.Button(frame_button, text="Calculate", command=calculate_weighted_scores_and_percentages, font=('Helvetica', 12))
calculate_button.pack(pady=(0, 10))

previous_values = {entry: entry.get() for entry in weight_entries}

app.mainloop()
