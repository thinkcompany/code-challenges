import styled from "styled-components";

const NavContainer = styled.header`
  width: 100%;
  background-color: #595959;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 15px;
`;

const SeptaLogo = styled.img`
  width: 55px;
  height: 40px;
  margin-right: 25px;
`;

const SeptaTitle = styled.h1`
  color: white;
  font-size: 32px;
`;

const Nav = () => {
  return (
    <NavContainer>
      <SeptaLogo
        width={60}
        height={50}
        src="/static/septaLogo.png"
        alt="setpta logo"
        tabIndex={1}
      />
      <SeptaTitle tabIndex={2}>Regional Rail Fares</SeptaTitle>
    </NavContainer>
  );
};

export default Nav;
