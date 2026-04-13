import React from "react";
import styled from "styled-components";
import { Menu, Search, User } from "react-feather";

import { QUERIES } from "../../constants";

import MaxWidthWrapper from "../MaxWidthWrapper";
import Logo from "../Logo";
import Button from "../Button";

const Header = () => {
  return (
    <header>
      <SuperHeader>
        <Row>
          <ActionGroup>
            <button>
              <Search size={24} />
            </button>
            <button>
              <Menu size={24} />
            </button>
          </ActionGroup>
          <ActionGroup>
            <button>
              <User size={24} />
            </button>
          </ActionGroup>
        </Row>
      </SuperHeader>
      <MainHeader>
        <DesktopActionGroup>
          <button>
            <Search size={24} />
          </button>
          <button>
            <Menu size={24} />
          </button>
        </DesktopActionGroup>
        <Logo />
        <SubscribeWrapper>
          <Button>Subscribe</Button>
          <SubLink href="/">Already subscribed?</SubLink>
        </SubscribeWrapper>
      </MainHeader>
    </header>
  );
};

const SuperHeader = styled.div`
  padding: 16px 0;
  background: var(--color-gray-900);
  color: white;

  @media${(props) => props.theme.queries.laptopAndUp} {
    display: none;
  }
`;

const Row = styled(MaxWidthWrapper)`
  display: flex;
  justify-content: space-between;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 24px;

  /*
    FIX: Remove the inline spacing that comes with
    react-feather icons.
  */
  svg {
    display: block;
  }
`;
const DesktopActionGroup = styled(ActionGroup)`
  display: none;

  @media${(props) => props.theme.queries.laptopAndUp} {
    display: flex;
  }
`;

const MainHeader = styled(MaxWidthWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 48px;

  @media${(props) => props.theme.queries.tabletAndUp} {
    margin-top: 48px;
    margin-bottom: 72px;
  }

  @media${(props) => props.theme.queries.laptopAndUp} {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    justify-contetn: revert;
    margin-top: 16px;
    margin-bottom: 72px;
  }
`;

const SubscribeWrapper = styled.div`
  display: none;

  @media${(props) => props.theme.queries.laptopAndUp} {
    display: revert;
    justify-self: end;
    position: relative;
  }
`;

const SubLink = styled.a`
  position: absolute;
  width: 100%;
  text-align: center;
  color: var(--color-gray-900);
  fonst-style: italic;
  font-size: ${14 / 16}rem;
  text-decoration: underline;
  margin-top: 8px;
`;

export default Header;
