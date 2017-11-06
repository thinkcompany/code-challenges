## SEPTA Fare Calculator
by Brian Weiser

Did as much as I could in a little over an hour. Functionality over style - my thought was that there would be some pre-existing CSS which would handle font, form inputs, etc, so under the time constraints I chose not to prioritize that. Just threw in some margins for readability during my development.

I included jQuery library locally for simplicity in this exercise, though in practice I'm more inclined to use the CDN version

Tasks not quite finished:

-Retrieving helper text for options from "info" section of fares.json

-Debug for replacing price for 10 tickets with "anytime" fare; additional calculation in the case user was getting a number of tickets over 10

-Line 63: Replace "for" loop with another $.each

-General code cleanup- left some things in that don't need to be there for demonstration

-CSS: All of it, really

-HTML: remove line breaks (used as quick and dirty spacers)