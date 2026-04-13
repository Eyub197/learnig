import React from "react";
import styled from "styled-components";
import { WEIGHTS } from "../../constants";

function NavLink({ children, ...delagated }) {
  return (
    <Wrapper {...delagated}>
      <NavItem>{children}</NavItem>
      <HiddenSpan aria-hidden={true}>{children}</HiddenSpan>
    </Wrapper>
  );
}

const Wrapper = styled.a`
  position: relative;
  display: block;
  display: inline-block;
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: ${WEIGHTS.medium};
  color: black;
  overflow: hidden;

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const NavItem = styled.span`
  display: block;
  transition: transform 500ms;

  ${Wrapper}:hover & {
    transform: translateY(-100%);
    transition: transform 250ms;
  }
`;

const HiddenSpan = styled.span`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  font-weight: ${WEIGHTS.bold};
  transition: transform 500ms;
  transform: translateY(100%);

  ${Wrapper}:hover & {
    transition: transform 250ms;
    transform: translateY(0%);
  }
`;

export default NavLink;
