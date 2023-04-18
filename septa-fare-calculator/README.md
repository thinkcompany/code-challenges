# Whit Minson SEPTA Fare Calculator Widget Submission

## Technologies
- React
    - `npx create-react-app` command
    - I understand this is deprecated but I wanted to have a very simple react app for the purposes of this challenge.
- Fetch/AJAX
- HTML
- CSS

## To Set-up and Run Locally
1. `cd react-app`
2. `npm i`
3. `npm start`

## Planning
### Brainstorming
![Whiteboarding SEPTA Fare Info](img/septa-fare-brainstorming.png)
- I wanted to look through the provided resources of SEPTA's site and parse through the `fares.json` to make sure I understood how the widget should perform.
> This whiteboarding would not usually be client/team-facing and below I have cleaned up the information that would be more appropriate to share.

| Price Factors             | Choices                           |
|---------------------------|-----------------------------------|
| Station where trip starts | *always going to be city center            |
| Station where trip ends   | `CCP/1`, `Zone 2`, `Zone 3`, `Zone 4`, `NJ` |
|Day/Time of the Week       | `anytime`, `weekday`, `evening_weekend` |
| Payment Method            | `advance`, `onboard`                  |

### Widget Planning
![Widget Planning Notes](img/septa-widget-planning.png)

### Component Planning
- `<CalculatorWidget />`
    - Can be used for different calculations beside the Rail fare, like their Pass program, Airport line fares, or Share Ride Fares. 
    - `<CalculatorHeader />`
        - Displays logo and title
    - `<RailForm />`
        - Includes the form, selects, radio button, and input field. 
        - controlled inputs with state variables.
        - ended up refactoring and making a separate component for the inputs and just passed down the appropriate information
            - `<RailInput />`
    - `<FareResult />`
        - "Your fare will cost" 
        - calculation made after querying for the right fare times the number of rides.

## Implementation
- Utilized React `useEffect` and `useState`
    - to async-ly fetch the data
    - to dynamically update the total fare cost as the user changes selections with controlled inputs.
- Utilized conditional rendering to show warnings and extra information under appropriate form fields
    - when certain fields were selected
    - when user inputs decimal points
    - when user has anytime bundle selected
        - extra information displayed
        - removes "Onboard" radio button
        - multiples of 10 warning

## Future Refactoring Thoughts
-  Some of the conditional rendering could be cleaned up to make it flow better
    - like including the warnings within the same info key as the json data.
    - or using the actual keys as the values instead of the displayed value to reduce the size of the ternaries and similar statements.
- More testing needs to be done to make the design more responsive and check how it fairs on smaller devices.
    - media queries would be a good addition if different views would be better
- Would like the limit what the user can type instead of just warning them on the number input.
    - either give selection of multiples of 10 instead of allowing them to type
    - add in more customization to the `onChange` to remove users ability to type decimal points.
    - I attempted to add a `step` attribute so the arrow keys would go up in multiples of 10 but it did not work
        - if you're on 3 it will just go up to 13 and so on.
        - I also  didn't want to manually shift the number to 10 when they selected Anytime just in case they didn't want to lose the number they were working with.
- The querying through the JSON data would be better in a separate file
    - Preferred to have more specific fetches to grab the right data
    - Would be more appropriate on a larger scale, though. 

## Resources
- SEPTA logo (larger size and favicon) from Wikipedia