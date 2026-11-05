import tkinter as tk
from tkinter import Toplevel, messagebox

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
            "Grants Council M&M": [],
            "Security Council": [],
            "Code of Conduct Council": [],
            "Developer Advisory Board": []
        }
        
        total_weighted_scores = 0
        weighted_scores = {}
        
        for council in councils:
            scores = [
                float(entries[council]["D"].get() or 0),
                float(entries[council]["S"].get() or 0),
                float(entries[council]["C"].get() or 0),
                float(entries[council]["O"].get() or 0),
                float(entries[council]["V"].get() or 0),
                float(entries[council]["Ve"].get() or 0)
            ]
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

instruction_text = "Please enter your email to continue to the Council Share Calculator.\n\n" \
                   "Instructions:\n" \
                   "1. Enter weights for each parameter.\n" \
                   "2. Enter scores for each council.\n" \
                   "3. Click 'Calculate Weighted Scores and Percentages' to see results."

instructions_label = tk.Label(instructions_window, text=instruction_text, font=('Helvetica', 12), justify=tk.LEFT, padx=10, pady=10)
instructions_label.pack(pady=20)

entry_email = tk.Entry(instructions_window, width=30)
entry_email.pack(pady=10)

btn_continue = tk.Button(instructions_window, text="Continue", command=continue_to_main_app)
btn_continue.pack(pady=10)

parameters = ["D", "S", "C", "O", "V", "Ve"]
parameter_names = [
    "Decision Making Authority (WD)", 
    "Scope of Influence (WS)", 
    "Community Engagement (WC)", 
    "Operational Independence (WO)", 
    "Voting Power (WV)", 
    "Veto Power (WVe)"
]

# Dictionary to store initial values
initial_values = {}
# Dictionary to store previous valid values
previous_values = {}

# Configure column sizes
for i in range(8):
    app.grid_columnconfigure(i, weight=1, minsize=150)

# Labels for weights
tk.Label(app, text="Weights", font=('Helvetica', 10, 'bold')).grid(row=0, column=0, padx=5, pady=5)
for i, parameter in enumerate(parameter_names):
    tk.Label(app, text=parameter, wraplength=140).grid(row=0, column=i+1, padx=5, pady=5)
tk.Label(app, text="Value Tracking Field", wraplength=140).grid(row=0, column=7, padx=5, pady=5)

# Entries for weights with default values
entry_WD = tk.Entry(app, width=20, validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))
entry_WD.insert(0, "35")
entry_WD.grid(row=1, column=1, padx=5, pady=5)
entry_WD.bind("<KeyRelease>", mark_field_changed)
entry_WD.bind("<FocusOut>", reset_field_value)
initial_values[entry_WD] = "35"
previous_values[entry_WD] = "35"

entry_WS = tk.Entry(app, width=20, validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))
entry_WS.insert(0, "25")
entry_WS.grid(row=1, column=2, padx=5, pady=5)
entry_WS.bind("<KeyRelease>", mark_field_changed)
entry_WS.bind("<FocusOut>", reset_field_value)
initial_values[entry_WS] = "25"
previous_values[entry_WS] = "25"

entry_WC = tk.Entry(app, width=20, validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))
entry_WC.insert(0, "10")
entry_WC.grid(row=1, column=3, padx=5, pady=5)
entry_WC.bind("<KeyRelease>", mark_field_changed)
entry_WC.bind("<FocusOut>", reset_field_value)
initial_values[entry_WC] = "15"
previous_values[entry_WC] = "15"

entry_WO = tk.Entry(app, width=20, validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))
entry_WO.insert(0, "10")
entry_WO.grid(row=1, column=4, padx=5, pady=5)
entry_WO.bind("<KeyRelease>", mark_field_changed)
entry_WO.bind("<FocusOut>", reset_field_value)
initial_values[entry_WO] = "10"
previous_values[entry_WO] = "10"

entry_WV = tk.Entry(app, width=20, validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))
entry_WV.insert(0, "10")
entry_WV.grid(row=1, column=5, padx=5, pady=5)
entry_WV.bind("<KeyRelease>", mark_field_changed)
entry_WV.bind("<FocusOut>", reset_field_value)
initial_values[entry_WV] = "10"
previous_values[entry_WV] = "10"

entry_WVe = tk.Entry(app, width=20, validate="key", validatecommand=(app.register(validate_weight_entry), '%P'))
entry_WVe.insert(0, "10")
entry_WVe.grid(row=1, column=6, padx=5, pady=5)
entry_WVe.bind("<KeyRelease>", mark_field_changed)
entry_WVe.bind("<FocusOut>", reset_field_value)
initial_values[entry_WVe] = "5"
previous_values[entry_WVe] = "5"

entry_value_tracking = tk.Entry(app, width=20, state='readonly')
entry_value_tracking.grid(row=1, column=7, padx=5, pady=5)
update_value_tracking_field()

# Council labels and entries with default values
councils = [
    "Token House", 
    "Citizens' House", 
    "Grants Council", 
    "Grants Council M&M", 
    "Security Council",
    "Code of Conduct Council", 
    "Developer Advisory Board"
]
entries = {}

default_scores = {
    "Token House": [4, 5, 4, 4, 5, 4],
    "Citizens' House": [5, 5, 5, 5, 4, 5],
    "Grants Council": [2.5, 2, 1.5, 1, 0, 0],
    "Grants Council M&M": [0.5, 0.5, 0.5, 0.5, 0, 0],
    "Security Council": [1, 2, 0, 1, 0, 0],
    "Code of Conduct Council": [0.5, 1, 0.5, 1, 0, 0],
    "Developer Advisory Board": [0, 0.5, 0, 1, 0, 1]
}

for i, council in enumerate(councils):
    tk.Label(app, text=council, font=('Helvetica', 10, 'bold')).grid(row=i+2, column=0, padx=5, pady=5)
    entries[council] = {}
    for j, parameter in enumerate(parameters):
        validate_command = app.register(validate_score_entry)
        
        # Use StringVar to hold the value
        var = tk.StringVar()
        var.set(str(default_scores[council][j]))
        
        entry = tk.Entry(app, width=20, validate="key", validatecommand=(validate_command, '%P'), textvariable=var)
        entry.grid(row=i+2, column=j+1, padx=5, pady=5)
        entry.bind("<KeyRelease>", mark_field_changed)
        entry.bind("<FocusOut>", reset_field_value)
        
        entries[council][parameter] = entry
        initial_values[entry] = str(default_scores[council][j])

# Button to calculate
btn_calculate = tk.Button(app, text="Calculate Weighted Scores and Percentages", command=calculate_weighted_scores_and_percentages)
btn_calculate.grid(row=len(councils)+2, column=0, columnspan=len(parameters)+1, pady=10)

# Set the size of the main app window
app.geometry(f"{window_width}x{window_height}")

app.mainloop()
