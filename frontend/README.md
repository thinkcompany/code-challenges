# SEPTA Rail Fare Calculator Challenge

## Hello! Thank you so much for giving me the opportunity to take this coding assessment.
## I would like to briefly walkthrough my solution to this challenge.

### Tech stack
* React (I would employ Next.js on the entire website, but SEO is not necessary for a widget.)
* React Router and Context API
* Module CSS (Eliminates class name collisions and improves performance.)

### Resources I consulted
* [Think Company Development Standards](https://standards.thinkcompany.dev/)
* [SEPTA Fares](http://www.septa.org/fares/ticket/index.html)
* [SEPTA Logo (SVG)](https://commons.wikimedia.org/wiki/File:SEPTA.svg)
* [CSS Global reset](https://meyerweb.com/eric/tools/css/reset/)

### Wireframe
* I quickly made a gameplan for styling with Adobe XD
<img width="1680" alt="Screen Shot 2022-08-20 at 7 01 49 PM" src="https://user-images.githubusercontent.com/89368363/185768843-74b4cd77-f627-4f55-9bbd-75f1dfec5b9c.png">

### Research
* Checked the SEPTA website 
* Called SEPTA to double check information

### Modularity
* I structed modules by pairing a component with a module CSS file to make CSS manageable
* I employed React as a frotned library to quickly create components
* I aimed to create small components
* I employed React Context API to manage light and dark mode
* I also employed a language switch to change English to Spanish and vice versa

### JSON strings
* To switch languages, I removed the majority of titles, labels and support text from JSX files
* I made switching languages more modular and parsible to the human eye
* This file setup allows for increased developer experience
* If CSS-in-JS libraries are employed, JSON makes passing CSS props highly efficient

### Managing state
* I managed components with the useState hook
* I managed side effects with the useEffect hook
* I incorporated functional programming to make functions more DRY

### Error handling
* I accounted for various user paths and made sure to catch errors
* I added asterisks at the beginning of message to signal that there was an error without relying just on the color red
* I made sure to add a green color for messages that will not throw an error but are useful information to a user

### Preparing for backend
* Double checked data before preparing a JSON string for the backend
* Backend API calls with be an asynchronous function 
* State variables will be converted to an object and passed as a JSON string via an HTTP request 
* The backend developer will be able to parse data easily and the keys match the original JSON file for zones and fares

## Thank you!
