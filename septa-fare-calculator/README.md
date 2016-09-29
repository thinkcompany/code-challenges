# SEPTA Rail Fare Calculator Challenge

## Steps
1. Initial setup for React. Install node modules. Create standard `package.json`, and `webpack.config.js` to exclude node modules, include `.jsx` syntax, and accept es2015 syntax.
2. Divide into some simple components, Calculator and Options. Rendering everything in the entry file for now, for simplicity. Pass data to the Calculator as props. The data will load in `componentDidMount()`, using jQuery, since Fetch API doesn't work on older browsers. `this.state.options` will be set with `handleUserInput()`. The data and options should be stored in initial state, with default values.
