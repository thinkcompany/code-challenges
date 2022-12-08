import React from 'react'
// import PropTypes from 'prop-types'
// import SubHeading from './SubHeading'
import SubHeading from "./SubHeading";
import SubInfoText from "./SubInfoText";
import Text from './Text';

const Section = ({ inputType, subheading, subtext, text }) => {
  const renderInputType = () => {
    switch (true) {
      case inputType === "radio":
        return "Radio";
      case inputType === "dropdown":
        return "Dropdown";
      case inputType === "number":
        return "Number";
      default: return null;
    }
  };

  return (
    <div>
      <SubHeading subheading={subheading} />
      {renderInputType()}
      <SubInfoText subtext={subtext} />
      <Text text={text}/>
    </div>
  )
}

Section.propTypes = {}

export default Section