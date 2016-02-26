# SEPTA Rail Fare Calculator Challenge

Hi!
This is my solution to the SEPTA Rail Fare Calculator Challenge.

I like to give a post-mortem after challenges so I can explain design choices, talk about difficulties and discuss changes and improvements I would like to make.

# Introduction

This application has been implemented using the [VueJS](http://blog.evanyou.me/2015/10/25/vuejs-re-introduction/) framework.
The application is dynamic and pulls all information from the `fares.json` file.
As a result, there is no hard coded information and if any changes need to be made to the fares, then they can be made directly to the `fares.json` file.

All in all, the implementation took ~50 minutes (not including this write up).

Due to the nature of AJAX and cross domain requests, you need to run a simple HTTP server.
Provided you are on a \*nix or OSX box, you can simply do the following:

    cd ~/code-challenges/septa-fare-calculator/
    python -M SimpleHTTPServer

This makes a simple HTTP server available on [127.0.0.1:8000](http://127.0.0.1:8000).

Alternatively, since was built using the [vue-cli](https://github.com/vuejs/vue-cli) scaffolding, you can run `npm run dev`.
Make sure to `npm install` first though!
This will boot a server on [127.0.0.1:8080](http://127.0.0.1:8080), with the added advantage of hotreloading whilst developing.

# Design Choices

I chose to use VueJS as the Framework for my solution.
VueJS is a new JavaScript framework which has begun gaining traction.
The main advantage it has over a framework like AngularJS, is simplicity.
Tools like vue-cli, also make it easy to develop apps that function right out ogf the box.

Really, the most important thing for this project was to have two-way binding to make sure that the fare updates in real-time.

For a more complete understanding of VueJs, I would recommend checking out the [documents](http://vuejs.org/guide/).
However as far as evaluating the project, the main file of interest is `src/App.vue`.
This file contains HTML, JavaScript and SASS all in one.
Packaging HTML, JS and SASS all into one file helps when designing larger projects, as we can split the project into self contained 'components'.

I chose to use the FlexBox from the CSS3 specification.
Although I am aware there is no support for < IE9 (against specification), I hope I can justify this choice as follows:

1. Faster design and development given the time constraint.
2. I wanted demonstrate my knowledge of the latest CSS3 specification.

# Difficulties

The largest difficulty I faced, relates to the special cases on the input.
Specifically, when you select 'anytime' then the 'where will you purchase the fair options' change.
Similarly if you select 'anythime', then the my understanding is that you can you can only purchase rides in multiples of ten.

Implemtation of these special cases was easy enough.
The difficulty arises when a user inputs 'onboard purchase' then changes to riding from 'anywhere', such that the 'onboard purchase' is no longer available.

The second difficulty was handling the data format from the `fares.json` file, this was more of a logistical issue of how to query this data.
This was solved by using the [underscore.js](http://underscorejs.org/) library.

# Changes and Improvements

The first thing I want to note, is my lack of comments in the code.
This is partially due to the relatively simple nature of this application and partly due to VueJS handling most of the complexities.
I would love to hear feedback as to how correct I am on this though...

Secondly, alot of the text displayed in options and text is read straight from the `fares.json` file.
One solution would be to add a `display` field to the `fares.json` file, but this would require restructuring a lot of data.
Perhaps a more modular solution is to add a `lang_en.json` file, or something of the sort.
This would allow the option for localization as well.

    {
      "translations": {
        "anytime": "Anytime",
        "weekday": "Weekdays",
        "evening_weekend": "Evenings or Weekends"
      }
    }

One other issue I have is that the anytime option doesn't seem to have any information regarding the fact that it seems to package 10 rides.
This may however be an issue with my understanding.

# Conclusion

I had fun completing the challenge and I hope you enjoy my solution!
As is often the case, this solution is not perfect and ignores some issues.

I would be happy to answer any questions about my design choices as well as just general questions!

