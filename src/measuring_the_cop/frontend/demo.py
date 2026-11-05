# import tkinter as tk
# from tkinter import Toplevel

# def calculate_weighted_scores_and_percentages():
#     try:
#         # Get weights from user inputs
#         WP = {
#             "WD": float(entry_WD.get() or 1),
#             "WS": float(entry_WS.get() or 1),
#             "WC": float(entry_WC.get() or 1),
#             "WO": float(entry_WO.get() or 1),
#             "WV": float(entry_WV.get() or 1),
#             "WVe": float(entry_WVe.get() or 1)
#         }
        
#         councils = {
#             "Token House": [],
#             "Citizens' House": [],
#             "Grants Council": [],
#             "Security Council": [],
#             "Code of Conduct Council": [],
#             "Developer Advisory Board": [],
#             "Anticapture Commission": []
#         }
        
#         total_weighted_scores = 0
#         weighted_scores = {}
        
#         for council in councils:
#             scores = [
#                 float(entries[council]["D"].get() or 0),
#                 float(entries[council]["S"].get() or 0),
#                 float(entries[council]["C"].get() or 0),
#                 float(entries[council]["O"].get() or 0),
#                 float(entries[council]["V"].get() or 0),
#                 float(entries[council]["Ve"].get() or 0)
#             ]
#             weighted_score = (
#                 scores[0] * (WP["WD"] / 100) +
#                 scores[1] * (WP["WS"] / 100) +
#                 scores[2] * (WP["WC"] / 100) +
#                 scores[3] * (WP["WO"] / 100) +
#                 scores[4] * (WP["WV"] / 100) +
#                 scores[5] * (WP["WVe"] / 100)
#             )
#             weighted_scores[council] = weighted_score
#             total_weighted_scores += weighted_score
        
#         results = ""
#         for council, score in weighted_scores.items():
#             percentage = (score / total_weighted_scores) * 100
#             results += f"{council}: ({percentage:.3f}%)\n"
        
#         display_results(results)
#     except ValueError:
#         display_results("Invalid input. Please enter valid numbers for weights and scores.", error=True)

# def display_results(results, error=False):
#     result_window = Toplevel(app)
#     result_window.title("Results")
#     result_window.geometry("400x300")

#     result_label = tk.Label(result_window, text=results, font=('Helvetica', 12), justify=tk.LEFT, padx=10, pady=10)
#     result_label.pack(expand=True, fill='both')

#     if error:
#         result_label.config(fg="red")

# app = tk.Tk()
# app.title("Council Share Calculator")

# parameters = ["D", "S", "C", "O", "V", "Ve"]
# parameter_names = [
#     "Decision Making Authority (WD)", 
#     "Scope of Influence (WS)", 
#     "Community Engagement (WC)", 
#     "Operational Independence (WO)", 
#     "Voting Power (WV)", 
#     "Veto Power (WVe)"
# ]

# # Configure column sizes
# for i in range(7):
#     app.grid_columnconfigure(i, weight=1, minsize=150)

# # Labels for weights
# tk.Label(app, text="Weights", font=('Helvetica', 10, 'bold')).grid(row=0, column=0, padx=5, pady=5)
# for i, parameter in enumerate(parameter_names):
#     tk.Label(app, text=parameter, wraplength=140).grid(row=0, column=i+1, padx=5, pady=5)

# # Entries for weights
# entry_WD = tk.Entry(app, width=20)
# entry_WD.grid(row=1, column=1, padx=5, pady=5)
# entry_WS = tk.Entry(app, width=20)
# entry_WS.grid(row=1, column=2, padx=5, pady=5)
# entry_WC = tk.Entry(app, width=20)
# entry_WC.grid(row=1, column=3, padx=5, pady=5)
# entry_WO = tk.Entry(app, width=20)
# entry_WO.grid(row=1, column=4, padx=5, pady=5)
# entry_WV = tk.Entry(app, width=20)
# entry_WV.grid(row=1, column=5, padx=5, pady=5)
# entry_WVe = tk.Entry(app, width=20)
# entry_WVe.grid(row=1, column=6, padx=5, pady=5)

# # Council labels and entries
# councils = [
#     "Token House", 
#     "Citizens' House", 
#     "Grants Council", 
#     "Security Council", 
#     "Code of Conduct Council", 
#     "Developer Advisory Board", 
#     "Anticapture Commission"
# ]
# entries = {}

# for i, council in enumerate(councils):
#     tk.Label(app, text=council, font=('Helvetica', 10, 'bold')).grid(row=i+2, column=0, padx=5, pady=5)
#     entries[council] = {}
#     for j, parameter in enumerate(parameters):
#         entry = tk.Entry(app, width=20)
#         entry.grid(row=i+2, column=j+1, padx=5, pady=5)
#         entries[council][parameter] = entry

# tk.Button(app, text="Calculate", command=calculate_weighted_scores_and_percentages).grid(row=len(councils)+2, columnspan=7, pady=10)

# app.mainloop()

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
            "Security Council": [],
            "Code of Conduct Council": [],
            "Developer Advisory Board": [],
            "Anticapture Commission": []
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
            results += f"{council}: ({percentage:.3f}%)\n"
        
        display_results(results)
    except ValueError:
        display_results("Invalid input. Please enter valid numbers for weights and scores.", error=True)

def display_results(results, error=False):
    result_window = Toplevel(app)
    result_window.title("Results")
    result_window.geometry("400x300")

    result_label = tk.Label(result_window, text=results, font=('Helvetica', 12), justify=tk.LEFT, padx=10, pady=10)
    result_label.pack(expand=True, fill='both')

    if error:
        result_label.config(fg="red")

def mark_field_changed(event):
    widget = event.widget
    current_value = widget.get()
    initial_value = initial_values[widget]
    if current_value != initial_value:
        widget.config(bg='lightgreen')
    else:
        widget.config(bg='white')

def validate_entry(value):
    if value.isdigit() and 0 <= int(value) <= 5:
        return True
    elif value == "":
        return True
    else:
        messagebox.showwarning("Invalid Input", "Sorry, you can enter value only from 0 to 5.")
        return False

def reset_field_value(event):
    widget = event.widget
    if widget.get() == "":
        widget.delete(0, tk.END)
        widget.insert(0, initial_values[widget])
        widget.config(bg='white')

app = tk.Tk()
app.title("Council Share Calculator")

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

# Configure column sizes
for i in range(7):
    app.grid_columnconfigure(i, weight=1, minsize=150)

# Labels for weights
tk.Label(app, text="Weights", font=('Helvetica', 10, 'bold')).grid(row=0, column=0, padx=5, pady=5)
for i, parameter in enumerate(parameter_names):
    tk.Label(app, text=parameter, wraplength=140).grid(row=0, column=i+1, padx=5, pady=5)

# Entries for weights with default values
entry_WD = tk.Entry(app, width=20)
entry_WD.insert(0, "1")
entry_WD.grid(row=1, column=1, padx=5, pady=5)
entry_WD.bind("<KeyRelease>", mark_field_changed)
entry_WD.bind("<FocusOut>", reset_field_value)
initial_values[entry_WD] = "1"

entry_WS = tk.Entry(app, width=20)
entry_WS.insert(0, "1")
entry_WS.grid(row=1, column=2, padx=5, pady=5)
entry_WS.bind("<KeyRelease>", mark_field_changed)
entry_WS.bind("<FocusOut>", reset_field_value)
initial_values[entry_WS] = "1"

entry_WC = tk.Entry(app, width=20)
entry_WC.insert(0, "1")
entry_WC.grid(row=1, column=3, padx=5, pady=5)
entry_WC.bind("<KeyRelease>", mark_field_changed)
entry_WC.bind("<FocusOut>", reset_field_value)
initial_values[entry_WC] = "1"

entry_WO = tk.Entry(app, width=20)
entry_WO.insert(0, "1")
entry_WO.grid(row=1, column=4, padx=5, pady=5)
entry_WO.bind("<KeyRelease>", mark_field_changed)
entry_WO.bind("<FocusOut>", reset_field_value)
initial_values[entry_WO] = "1"

entry_WV = tk.Entry(app, width=20)
entry_WV.insert(0, "1")
entry_WV.grid(row=1, column=5, padx=5, pady=5)
entry_WV.bind("<KeyRelease>", mark_field_changed)
entry_WV.bind("<FocusOut>", reset_field_value)
initial_values[entry_WV] = "1"

entry_WVe = tk.Entry(app, width=20)
entry_WVe.insert(0, "1")
entry_WVe.grid(row=1, column=6, padx=5, pady=5)
entry_WVe.bind("<KeyRelease>", mark_field_changed)
entry_WVe.bind("<FocusOut>", reset_field_value)
initial_values[entry_WVe] = "1"

# Council labels and entries with default values
councils = [
    "Token House", 
    "Citizens' House", 
    "Grants Council", 
    "Security Council", 
    "Code of Conduct Council", 
    "Developer Advisory Board", 
    "Anticapture Commission"
]
entries = {}

default_scores = {
    "Token House": [1, 1, 1, 1, 1, 1],
    "Citizens' House": [1, 1, 1, 1, 1, 1],
    "Grants Council": [1, 1, 1, 1, 1, 1],
    "Security Council": [1, 1, 1, 1, 1, 1],
    "Code of Conduct Council": [1, 1, 1, 1, 1, 1],
    "Developer Advisory Board": [1, 1, 1, 1, 1, 1],
    "Anticapture Commission": [1, 1, 1, 1, 1, 1]
}

vcmd = (app.register(validate_entry), '%P')

for i, council in enumerate(councils):
    tk.Label(app, text=council, font=('Helvetica', 10, 'bold')).grid(row=i+2, column=0, padx=5, pady=5)
    entries[council] = {}
    for j, parameter in enumerate(parameters):
        entry = tk.Entry(app, width=20, validate="key", validatecommand=vcmd)
        entry.insert(0, str(default_scores[council][j]))
        entry.grid(row=i+2, column=j+1, padx=5, pady=5)
        entry.bind("<KeyRelease>", mark_field_changed)
        entry.bind("<FocusOut>", reset_field_value)
        entries[council][parameter] = entry
        initial_values[entry] = str(default_scores[council][j])

tk.Button(app, text="Calculate", command=calculate_weighted_scores_and_percentages).grid(row=len(councils)+2, columnspan=7, pady=10)

app.mainloop()




