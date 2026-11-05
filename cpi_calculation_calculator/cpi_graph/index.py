from dash import dcc, html
import dash
import pandas as pd
import plotly.express as px
from flask import Flask

# Load the HHI and CPI results from the CSV file
results_df = pd.read_csv("output_hhi_cpi.csv")

# Ensure the 'date' column is in datetime format
results_df['date'] = pd.to_datetime(results_df['date'], format='%Y-%m-%d')

# Compute 7-day moving average
results_df['7_day_MA'] = results_df['CPI'].rolling(window=7).mean()

# Initialize Flask server
server = Flask(__name__)

# Initialize Dash app with the Flask server
app = dash.Dash(__name__, server=server)

app.layout = html.Div([
    dcc.Dropdown(
        id='cpi-dropdown',
        options=[
            {'label': 'Daily CPI for Optimism', 'value': 'daily'},
            {'label': '7-Day Moving Average CPI for Optimism', 'value': '7-day'}
        ],
        value='daily'  # Default value
    ),
    dcc.Graph(id='cpi-graph')
])

@app.callback(
    dash.dependencies.Output('cpi-graph', 'figure'),
    [dash.dependencies.Input('cpi-dropdown', 'value')]
)
def update_graph(selected_option):
    if selected_option == 'daily':
        fig = px.line(results_df, x='date', y='CPI', 
                      title='CPI Over Time for Optimism (Daily)', 
                      labels={'CPI': 'Concentration of Power Index (CPI)', 'date': 'Date'})
        
    elif selected_option == '7-day':
        fig = px.line(results_df, x='date', y='7_day_MA', 
                      title='7-Day Moving Average of CPI for Optimism', 
                      labels={'7_day_MA': '7-Day Moving Average of CPI', 'date': 'Date'})
    
    # Customize the layout and hover template
    fig.update_layout(
        xaxis_title='Date',
        yaxis_title='Value',
        hovermode='x unified'
    )

    fig.update_traces(
        hovertemplate="<b>Date:</b> %{x}<br><b>Value:</b> %{y}<extra></extra>"
    )

    return fig

if __name__ == '__main__':
    app.run_server(debug=True)
