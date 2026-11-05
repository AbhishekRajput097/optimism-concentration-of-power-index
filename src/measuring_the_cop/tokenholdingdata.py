import requests
import csv
import json
import os
import time
import pandas as pd

# GraphQL endpoint URL
graphql_url = 'https://api.tally.xyz/query'

# GraphQL query to fetch token balance
graphql_query_balance = """
query FetchTokenBalance($input: TokenBalancesInput!) {
    tokenBalances(input: $input) {
        token {
            supply
        }
        balance
    }
}
"""

# Function to fetch token balance
def fetch_token_balance(api_url, query, variables, headers):
    response = requests.post(api_url, json={'query': query, 'variables': variables}, headers=headers)
    
    if response.status_code == 200:
        # Parse JSON data
        api_data = response.json()
        return api_data.get("data", {}).get("tokenBalances", [])
    elif response.status_code == 429:
        print("Rate limit exceeded. Waiting before retrying...")
        time.sleep(40)  # Wait for 20 seconds before retrying
        return fetch_token_balance(api_url, query, variables, headers)
    else:
        print(f"API request failed with status code {response.status_code}")
        return None

# Main function to fetch token balances for each delegate and update the CSV
def fetch_all_token_balances_and_update_csv(csv_file, output_file):
    headers = {
        "Api-key": os.environ["TALLY_API_KEY"]
    }
    
    # Read the CSV file to get the list of addresses
    df = pd.read_csv(csv_file)
    addresses = df['account.address'].unique()
    
    # Open the output CSV file in write mode
    with open(output_file, 'a', newline='') as csvfile:
        fieldnames = ['account.address', 'token_supply', 'balance']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        # Write the header only once
        writer.writeheader()
        
        # Initialize a counter
        counter = 0
        
        # Iterate through each address and fetch the token balance
        for address in addresses[152692 : ]:
            variables = {
                "input": {
                    "address": address,
                    "governorID": "eip155:10:0xcDF27F107725988f2261Ce2256bDfCdE8B382B10",
                    "organizationID": "2206072049871356990"
                }
            }
            balance_data = fetch_token_balance(graphql_url, graphql_query_balance, variables, headers)
            
            if balance_data:
                for token in balance_data:
                    # Prepare the data row
                    row = {
                        'account.address': address,
                        'token_supply': token.get("token", {}).get("supply"),
                        'balance': token.get("balance")
                    }
                    # Write the row to the CSV file
                    writer.writerow(row)
            
            # Increment the counter
            counter += 1
            
            # Print progress
            print(f"Fetched token balances for {counter} delegates")
            
            # Add a delay to avoid hitting rate limits
            time.sleep(0.2)
    
    print(f"Token balances successfully updated in {output_file}")

# Fetch token balances for all delegates and update the CSV
fetch_all_token_balances_and_update_csv(r"../../data/measuring_the_cop/delegates_optimism.csv", r"../../data/measuring_the_cop/op_delegates.csv")