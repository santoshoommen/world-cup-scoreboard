#World Cup Scorecard Library

A simple React library for displaying live World Cup scores. Built with TypeScript, TDD, and SOLID principles.

## Features (In Progress)

*   Start new matches.
*   Update scores for ongoing matches.
*   Finish matches.
*   Display a summary of matches ordered by total score and recency.

## Development
This library consists of the folloing components
ScoreBoard  - Includes two tabs "Admin Panel" and "Scoreboard"
AdminPanel -  This tab contains the AdminPanel component that allos you to start, update score and finish matches
    You can start a match by adding Home and Away teams
    You can update the score by selecting a match from the drop down
    You can finish a match by selecting a match from the drop down
Scoreboard - This tab consists of MatchList and MatchSummary components. You can view a list of current running matches and their summary ordered by total score


## Installation
Clone the rerpository and run:
yarn install
yarn start - the app should start on port 3000

