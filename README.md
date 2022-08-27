# code-challenges

## Setup
To setup the project, run `npm install` then run `npm run start:dev` within your terminal and load the app from the localhost link within your browser. 

## Functionality
Based on the user's choice, the total will be calculated and displayed at the bottom automatically. Any changes of choice, whether it be different zone or different type, will simultaneously be reflected through the total price at the bottom.

## Extra Notes
My main focus within this project was ensuring that the functionality worked before styling it. I implemented React and represented the json data within the state as follows: 

```javascript

weekday: {
                advance: [],
                onboard: []
          },
          
evening_weekend: {
                        advance: [],
                        onboard: []
                  },
                  
anytime: {
                advance: [],
                onboard: [0, 0, 0, 0, 0]
         },
 ```
 
 where each price was stored in its corresponding array with its index being which zone they belonged to (a price at Zone 2 would be in index 1 of the array).
 
 Some bugs I encountered were that once `Anytime` was clicked and then `Onboard`, the price would remain $0.00 even after clicking out of `Onboard` until the page is refreshed.
 Also, since I made the radio input checked for the `Station Kiosk` option, user's would constantly have to click `Onboard` when making changes to the calculations.
 
 Some features I would focus on if given more time would be to change the button options to an actual dropdown menu like the example. I set the buttons up in preparation to include a dropdown, so I would just build upon those.
 I would also implement a `Reset` option to clear all user entries.
