import React from 'react';
import styled from 'styled-components';
import { Menu, Search, User } from 'react-feather';


import MaxWidthWrapper from '../MaxWidthWrapper';
import Logo from '../Logo';
import Button from '../Button';

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
        <ButtonWrapper>
          <Button>subscribe</Button>
          <DesktopLink>Already a subscriber?</DesktopLink>
        </ButtonWrapper>
      </MainHeader>
    </header>
  );
};

const SuperHeader = styled.div`
  padding: 16px 0;
  background: var(--color-gray-900);
  color: white;

  @media ${props => props.theme.QUERIES.laptopAndUp} {
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

    @media ${props => props.theme.QUERIES.laptopAndUp} {
      color: black;
    }
  }
`;

const DesktopActionGroup = styled(ActionGroup)`
  display: none;

  @media ${props => props.theme.QUERIES.laptopAndUp} {
    display: flex;
  }
`

const MainHeader = styled(MaxWidthWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 48px;

  @media ${props => props.theme.QUERIES.tabletAndUp} {
    margin-block: 48px 72px;
  }

  @media ${props => props.theme.QUERIES.laptopAndUp} {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    justify-content: revert;
    margin-block-start: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: none;

  @media ${props => props.theme.QUERIES.laptopAndUp} {
    display: revert;
    position: relative;
    justify-self: end;
}
`
const DesktopLink = styled.a`
  position: absolute;
  width: 100%;
  text-align: center;
  margin-block-start: 8px ;
  font-size: 0.875rem;
  font-style: italic;
  color: var(--color-gray-900);
  text-decoration: underline;
`


export default Header;
