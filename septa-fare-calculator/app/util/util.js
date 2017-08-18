export const fetchData = () => (
  $.ajax({
    method: 'GET',
    url: 'https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json'
  })
);
