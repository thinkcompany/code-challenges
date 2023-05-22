# James Perper Coding Challenge Submission
## Tech Stacks
- React
- Typescript
- CSS

## Resources
[Think Company Development Standards](https://standards.thinkcompany.dev/)
## Time spent
4 hours

## Workflow
- Fetch fares data from `https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json`
- Display Form data based on fares data.
- Calculate the fare cost based on selected form data.

## Project Structure
### `components` includes common components that are used globally and septa specific components
### `containers` includes main container; SeptaFareCalculator
### `helpers` includes helper functions like api fetching
### `hooks` includes custom hooks
### `styles` includes global styles
### `utils` includes common utility functions



## Implementation
I analyzed the requirements and made the basic project structure like components, hooks, helpers
Then defined the types that will be used in the project and added custom fetch hook.
Then I started working on building each component from header, footer and body of the container. While making the components, I added common components like select dropdown and radio button. I styled each component bascially and finally put all those components into the main container.

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependency modules.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Things to improve
If I have some more time, I will
- Add some unit testing for each util function and component.
- Improve responsiveness for mobile and desktop.

