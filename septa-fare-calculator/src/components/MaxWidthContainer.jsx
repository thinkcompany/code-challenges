import React from "react";
import styled from "styled-components";

const MaxWidthSection = styled.div`
  margin: 100px 100px;
`;

const MaxWidthContainer = ({ children }) => {
  return <MaxWidthSection>{children}</MaxWidthSection>;
};

export default MaxWidthContainer;
