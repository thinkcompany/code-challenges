const API_URL =
  'https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json';

export const getReginalRailsFares = () =>
  fetch(API_URL).then((response) => response.json());
