# Notes on Code Challenge

This project should be easy to understand if you have a working knowledge of AngularJS.

I just wanted to note that I did restructure the JSON file a bit.

Instead of having an array with multiple `"weekday"` or `"evening_weekend"` entries, (which would require a search to find the data for Onboard or Advance purchases), I made the `"onboard_purchase"` and `"advance_purchase"` objects properties of the `"weekday"`, `"evening_weekend"`, and `"anytime"` objects, so that all of their data "belongs" to them.

Enjoyed the exercise!

`/kimberlythegeek`