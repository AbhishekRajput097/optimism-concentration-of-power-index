# Optimism Data

## Overview
This dataset contains information about delegates and their influence within various councils and committees in the Optimism ecosystem, as of 20th July. The data includes delegates' voting power, their membership status across different governing bodies, and their influence in specific rounds and seasons.

## Columns Description

- **delegate**: The address of the delegate.
- **voting_power**: The voting power of the delegate in the Token House.
- **th_vp**: Delegate influence in the Token House as a percentage.
- **ch_member_r4 (Citizen House Member Round 4)**: Indicates if the delegate is a member of the Citizen House in Round 4. A value of 1 signifies membership; otherwise, the delegate is not a member.
- **gc_member_s5 (Grant Council Member Season 5)**: Indicates if the delegate is a member of the Grant Council in Season 5. A value of 1 signifies membership; otherwise, the delegate is not a member.
- **gc_member_mm_s5 (Grant Council Member Milestones & Metrics Season 5)**: Indicates if the delegate is a member of the Grant Council (Milestones & Metrics) in Season 5. A value of 1 signifies membership; otherwise, the delegate is not a member.
- **sc_member_s5 (Security Council Member Season 5)**: Indicates if the delegate is a member of the Security Council in Season 5. A value of 1 signifies membership; otherwise, the delegate is not a member.
- **coc_member_s5 (Code of Conduct Council Member Season 5)**: Indicates if the delegate is a member of the Code of Conduct Council in Season 5. A value of 1 signifies membership; otherwise, the delegate is not a member.
- **dab_member_s5 (Developer Advisory Board Member Season 5)**: Indicates if the delegate is a member of the Developer Advisory Board in Season 5. A value of 1 signifies membership; otherwise, the delegate is not a member.
- **influence_r4_s5 (Influence in RPGF Round 4 and Season 5)**: The influence of the delegate in RPGF Round 4 and Season 5.
- **influence (Influence according to latest data)**: The influence of the delegate according to the current data.

## Notes

- As of now, for the Token House, we have data as of 20th July.
- For the Citizen House, we have data from Round 4.
- For other councils and committees, we have data from Season 5.

# Other Datasets

In addition to the Optimism data, we also have datasets for Uniswap, Compound, and Aave. Below is the description of the columns in these datasets:

## Columns Description

- **delegate**: The address of the delegate.
- **voting_power**: The voting power of the delegate in the respective DAO.
- **th_vp**: Delegate influence in the Token House as a percentage.
- **influence**: The influence of the delegate in the respective DAO.
