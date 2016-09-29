# SEPTA Rail Fare Calculator Challenge

## Steps
1. Initial setup for React. Install node modules. Create standard `package.json`, and `webpack.config.js` to exclude node modules, include `.jsx` syntax, and accept es2015 syntax.
2. Divide into some simple components, Calculator and Options. Rendering everything in the entry file for now, for simplicity. Pass data to the Calculator as props. The data will load in `componentDidMount()`, using jQuery, since Fetch API doesn't work on older browsers. `this.state.options` will be set with `handleUserInput()`. The data and options should be stored in initial state, with default values.
3. Set up the initial functionality
  * Make a `determineCost()` function.
    * It should find the fares from the selected zone.
    * If the number of rides as `numRides` is less than 1 or not a number, the cost should be 0. It should also floor `numRides` to take care of any decimal input.
    * Iterate through each of the fares for the selected zone, making sure the ticket `type` and purchase location (`purchase`) match that of the state.
    * For onboard purchases, it should simply return `numRides * price`.
    * For advance & weekday purchases only, it should find the amount of tickets that can be purchased in packs of 10 as `numTenTix`, and then find `remainder` as the result of `numRides % 10`. Then it should take `numTenTix` and multiply it by the price of a 10-pack of tickets, added to the remainder times the normal price. Even if the tickets are purchased in advance, and are greater than 10, it should not perform this extra calculation for `evening_weekend` tickets, because it is still cheaper to purchase 10 evening/weekend tickets than a pack of 10 anytime tickets. The one exception is for the `NJ` zone, so we'll factor that in too.
    * I think that "anytime" tickets should available for purchase onboard, and they're also valid during the evening times (unlike what the JSON data suggests). So the only 2 possible states for `type` under `options` should be `weekday` and `evening_weekend`, since "anytime" tickets are as much as weekday tickets.
  * `Calculator` renders a header, a footer, and `Options` with the props of `this.state.options`), `info` from the JSON, and the `handleUserInput` function.
4. `Options` should render a form with two select menus, radio buttons, and a text input.
  * Since the options are minimal, and since I'm not passing all of the data as props to `Options`, I'll declare drop down options in the `render()` function.
  * `handleChange()` will call the props that sets the `options` state of `Calculator`, and will be called on a change from the form, grabbing the options through refs. Since `numRides` and `zone` are integers, first pass them to `parseInt`. If `type` is "anytime", it should change it to `weekday` first.
  * Since the radio options are mutually exclusive, whether or not they're checked will have to be set in state. But in order to set the state of `Calculator` as soon as a change on the radio buttons occurs, their value will also have to be stored separately from state, as a property of `Options`, since `this.setState()` is asynchronous.
  * On a change from the radio buttons, both that property and state will have to change in a `handleOptionChange()` function.
