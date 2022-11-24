# Septa Fare Calculator - Jonathan Bui
## Time Spent
In total I spent close to 2 hours on this with roughly half my time spent on developing the view and the other half on integrating `fares.json` and implementing calculation logic
## Technologies Used
 - creat-react-app
 - styled-components
## Setup
 1. Run `npm install`
 2. Run `npm run start`
 3. Navigate to `localhost:3000` to view Septa Fare Calculator
 ## Room For Improvement
 - Further generalize components
     - An example is `RadioButtonGroup.jsx` which has logic specific to handling when a user selects their trip type as 'anytime'. This can be refactored so the logic is in the parent and `RadioButtonGroup.jsx` can become a general component that can be shared in other applications
 - Create `styled-components` themes to store commonly used variables such as color
 - Move static text to a config file. This can be useful for internationalization
 - Create a custom hook for fetching fare data
    - This can further generalize that application since it makes it easier to swap out what api is being used
 - Transform `Fares.json` so that it's structure is more compatible with the design spec
 - Add `prop-types` to ensure components use the correct data type and pass the right data
 - Minor clean up around updating things such as favicon, updating title, removing unused files, etc.
 


