Project Recap and Future Improvements
=======

Hi, my name is Adam Tang. I'm grateful for this opportunity to contribute to
this code challenge project. It was challenging and enjoyable. I tried to
address the following requirements:
- Responsiveness -- through HTML and CSS. I added an alternate set of CSS
  for a smaller screen size (max-width: 500px). I tested the layout in
  multiple browsers (Firefox, Chrome, Safari) and multiple resolutions
  (iPhone SE, iPhone X, Android) through the Chrome DevTool.
- Consideration for backend integration -- I used consistent variable names
  according to `fares.json`.
- Consideration for `anytime` category -- I did not leave that as a choice
  in the dropdown for the type of fare. In the calculation of the total, I
  applied the discount available through the special 10-trip fare without
  noticing the user on screen. One thing I might add in the future is to
  have a helper text notifying the user that savings have been applied
  when applicable.
- Test-driven development -- I tested the App throughout the implementations
  of each feature. While I was familiar with running tests, this was my
  first exercise to extensively write my own test files. It was challenging.
  One remaining challenge is to write a test to calculate the total with
  different combinations of inputs. Because I used `react-select` to
  implement both of my dropdown inputs, it was rather difficult to query
  the input and the nodes in order to manipulate the inputs in my test.
  With more time, I might be able to reach out for help with writing tests
  that work with `react-select`. The reason I chose `react-select` was
  the ease-of-use with regard to data. I could have used plain `<select>`
  elements and would have been able to write tests that could manipulate
  the inputs and test the calculations.

All in all, I am grateful to have this experience of contributing to this
project. I learned a lot during the process. I look forward to hearing back
about the next steps.

-Adam Tang
