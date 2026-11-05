from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Function to calculate weighted scores and percentages
def calculate_weighted_scores_and_percentages(weights, scores):
    try:
        # Get weights from user inputs
        WP = {
            "WD": float(weights.get('WD', 1)),
            "WS": float(weights.get('WS', 1)),
            "WC": float(weights.get('WC', 1)),
            "WO": float(weights.get('WO', 1)),
            "WV": float(weights.get('WV', 1)),
            "WVe": float(weights.get('WVe', 1))
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
            council_scores = [
                float(scores.get(f'{council}_D', 0)),
                float(scores.get(f'{council}_S', 0)),
                float(scores.get(f'{council}_C', 0)),
                float(scores.get(f'{council}_O', 0)),
                float(scores.get(f'{council}_V', 0)),
                float(scores.get(f'{council}_Ve', 0))
            ]
            weighted_score = (
                    council_scores[0] * (WP["WD"] / 100) +
                    council_scores[1] * (WP["WS"] / 100) +
                    council_scores[2] * (WP["WC"] / 100) +
                    council_scores[3] * (WP["WO"] / 100) +
                    council_scores[4] * (WP["WV"] / 100) +
                    council_scores[5] * (WP["WVe"] / 100)
            )
            weighted_scores[council] = weighted_score
            total_weighted_scores += weighted_score

        results = {}
        for council, score in weighted_scores.items():
            percentage = (score / total_weighted_scores) * 100
            results[council] = f"{percentage:.2f}%"

        return results

    except ValueError:
        return {"error": "Invalid input. Please enter valid numbers for weights and scores."}

# Route for index page
@app.route('/')
def index():
    return render_template('index.html')

# Route for handling form submission
@app.route('/calculate', methods=['POST'])
def calculate():
    weights = {
        'WD': request.form.get('WD'),
        'WS': request.form.get('WS'),
        'WC': request.form.get('WC'),
        'WO': request.form.get('WO'),
        'WV': request.form.get('WV'),
        'WVe': request.form.get('WVe'),
    }

    scores = {}
    for council in [
        'Token House',
        'Citizens` House',
        'Grants Council',
        'Security Council',
        'Code of Conduct Council',
        'Developer Advisory Board',
        'Anticapture Commission'
    ]:
        scores[f'{council}_D'] = request.form.get(f'{council}_D', 0)
        scores[f'{council}_S'] = request.form.get(f'{council}_S', 0)
        scores[f'{council}_C'] = request.form.get(f'{council}_C', 0)
        scores[f'{council}_O'] = request.form.get(f'{council}_O', 0)
        scores[f'{council}_V'] = request.form.get(f'{council}_V', 0)
        scores[f'{council}_Ve'] = request.form.get(f'{council}_Ve', 0)

    results = calculate_weighted_scores_and_percentages(weights, scores)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)

