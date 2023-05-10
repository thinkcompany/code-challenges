## Developer Notes
Hello and thank you for the oppurtunity to take this challenge! I look forward to discussing it!
I limited myself to 2.5 hours, so I have a small list of improvements I would make.

1.) I used the fastest method to start react, using the quick-start tool vite. I did not do any cleanup from that, so that would be a priority. For example, my main component is still called App.jsx. That should be better named to FareCalulator.
2.) There are no tests. There should definetly be AT LEAST basic tests for functionallity. Namely checking that the fare caclulation is correct, and for any errors if values are unexpected.
3.) I used a fairly simple method to go through the array and create the options. This could be much more robust, and for longer arrays, more efficient. For example I filter the entire array every time any element in the form changes. That's fine for 5 entries, but would be inefficient for bigger arrays. 
4.) This component could be made to handle any type of data thrown at it, but currently makes some assumptions of the data passed to it.
5.) More components broken out instead of placing them in the parent.
6.) Small usibility things, like making it responsive, disabling fields, providing more explination.
7.) I chose to use normal SCSS/CSS, but I would consider styled-components.
8.) Design wise I tried to match the image exactly, but it is very tall and it would be nice to see it all on one screen.
9.) Browser compatibility, I mostly used Chrome and did not look further.

# SEPTA Rail Fare Calculator Challenge

Hello, hopeful Think Company development team member! 

Thank you for taking time to help us assess your front-end development skills. Part of the work we frequently are tasked with is combining complex business data with our design team's fresh new interfaces. Our development team makes these come to life with semantic, accessible HTML, CSS, and JavaScript. All of our philosophies are documented in [our development standards](https://standards.thinkcompany.dev/).

Your challenge is to create an interactive widget for calculating SEPTA Regional Rail fare prices. (In case you're not familiar with Philadelphia's preeminent mass transit agency, here are all the railroads in map form.)

![SEPTA Zone Map](img/zone-map.jpg) 

When you take regional rail in and out of the city, the fare price is affected by where you purchase the ticket, when you ride, and how far you travel. You can learn more about the details on [SEPTA's website](http://www.septa.org/fares/ticket/index.html) -- or trust that we've correctly compiled this information into this [JSON file](fares.json). We'd like you to make this information easier to understand by making an interactive fare purchase widget, illustrated in the screenshot below.

![Widget mockup](img/widget.png)

## Instructions
* Visit our [careers page](https://www.thinkcompany.com/careers/) and apply for one of our open positions so we have your contact information along with your pull request.
* Develop the HTML and CSS for the widget seen in the screenshot above. Feel free to make this responsive, and keep accessibility in mind: screen readers should handle the form, helper text, and any other important content well.
* Assume that your code would be handed off to a back-end developer for integration. It could end up on a page with other content and widgets, so keep this in mind when you are making decisions about naming conventions.
* Write JavaScript to request [fares.json](fares.json) via AJAX and populate the widget with live data. End users should be able to see the fare total update when they use the widget controls. Think hard about the data format before starting - what does "anytime" mean, and what's the most elegant way to let users know about special pricing for items like 10-trip tickets?
* We plan on looking at the balance of your HTML, CSS, and JS, but we'd rather see a partially-styled working prototype than a pixel-perfect widget that isn't doing fare calculations. Try to balance your time appropriately!
* It should go without saying - please comment your code to state any assumptions or decisions you're making during this assignment -- or just to say hi. :-)

## Requirements
* *Browser Support*: Microsoft Edge, Google Chrome, Firefox, Safari for iOS, and Chrome for Android.
* *Libraries & Frameworks*: You are welcome to bring in JavaScript libraries (like jQuery) or frameworks (like Angular, React or Polymer). You may also author your JS with vanilla DOM methods, as long as they are compatible with the browser requirements. Please don't include an entire CSS framework like Bootstrap -- we want to see your HTML and CSS, not theirs.
* *Standards*: Your solution should be valid, semantic, accessible, and performant. To get an idea of what how we're doing things, please feel free to review [our development standards](https://standards.thinkcompany.dev/).
* *Time*: We don't expect you to overexert yourself to deliver a perfectly finished product, but want to allow you take the time you think you need to show your stuff. We recommend spending about an hour, but let us know how much time you spend if you decide to take more time.
* *Submission*: Fork this repository and make a pull request for us to review your code. If you're not familiar with git or Github, you can download this repo and send us a ZIP file when you're done.

## Resources
* [Think Company Development Standards](https://standards.thinkcompany.dev/)
* [SEPTA Fares](http://www.septa.org/fares/ticket/index.html)
* [SEPTA Logo (SVG)](https://commons.wikimedia.org/wiki/File:SEPTA.svg)


