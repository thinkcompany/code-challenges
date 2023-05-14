import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";

const TooltipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 20px;
  background-color: lightgreen;
  border-radius: 6px;
  margin-bottom: 12px;
  position: relative;
`;

const CloseButton = styled(MdOutlineClose)`
  position: absolute;
  right: 30px;
  top: 0px;
  transform: translate(50%, 50%);
  width: 24px;
  height: 24px;
  background-color: #fff;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const Notification = styled.p``;

const Tooltip = () => {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const handleTooltip = (e) => {
    if (e.keyCode === 32 || e.keyCode === 13) setTooltipVisible(false);
  };

  if (!tooltipVisible) return;
  return (
    <TooltipContainer id="saleClose">
      <CloseButton
        // onClick={handleTooltip}
        onKeyDown={(e) => handleTooltip(e)}
        role="button"
        aria-describedby="saleClose"
        tabIndex={1}
      >
        X
      </CloseButton>
      <Notification aria-describedby="saleClose">
        Buy anytime tickets in bundles of 10&apos;s and SAVE MORE!
      </Notification>
    </TooltipContainer>
  );
};

export default Tooltip;
