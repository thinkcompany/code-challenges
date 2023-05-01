import React from "react";

const Section = ({ prompt, children }) => (
  <fieldset className="App-section">
    <label lang="en">{prompt}</label>
    {children}
  </fieldset>
);

export default Section;
