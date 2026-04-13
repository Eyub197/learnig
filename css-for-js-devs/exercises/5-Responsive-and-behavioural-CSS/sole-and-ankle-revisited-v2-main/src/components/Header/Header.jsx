import React from 'react';
import styled from 'styled-components';

import { WEIGHTS } from '../../constants';
import Logo from '../Logo';
import SuperHeader from '../SuperHeader';
import MobileMenu from '../MobileMenu';
import Icon from '../Icon';
import UnstyledButton from '../UnstyledButton';
import VisuallyHidden from '../VisuallyHidden';

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <DesktopNav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </DesktopNav>

        <MobileNav>
          <ShoppingBagButton>
            <Icon id={'shopping-bag'}/>
            <VisuallyHidden>Open cart</VisuallyHidden>
          </ShoppingBagButton>
          <UnstyledButton>
            <Icon id={"search"}/>
            <VisuallyHidden>Search</VisuallyHidden>  
          </UnstyledButton>
          <UnstyledButton onClick={() => setShowMobileMenu(true)}>
            <Icon id={"menu"}/>
            <VisuallyHidden>Open menu</VisuallyHidden>  
          </UnstyledButton>
        </MobileNav>

        <Filler />
      </MainHeader>

      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
      />
    </header>
  );
};

const MainHeader = styled.div`
  display: flex;
  align-items: baseline;
  padding: 18px 32px;
  border-bottom: 1px solid var(--color-gray-300);
  overflow: auto;

  @media ${props => props.theme.QUERIES.tabletAndSmaller} {
    justify-content: space-between;
    align-items: center;
    border-top: 4px solid var(--color-gray-900);
    justify-content: space-between;
  }

  @media ${props => props.theme.QUERIES.phoneAndSmaller} {
    padding-inline: 16px;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: clamp(1rem,9.24dvw - 4.5rem, 3.5rem);
  margin: 0px 48px;


  @media ${props => props.theme.QUERIES.tabletAndSmaller} {
    display: none;
  }
  `;

const MobileNav = styled.nav`
  display: none;

  @media ${props => props.theme.QUERIES.tabletAndSmaller} {
    display: flex;
    gap: 32px;
  }

  @media ${props => props.theme.QUERIES.phoneAndSmaller} {
    gap: 16px;
  }
`;

const ShoppingBagButton = styled(UnstyledButton)`
  transform: translateX(-2px);
`;

const Filler = styled.div`
  flex: 1;

  @media ${props => props.theme.QUERIES.tabletAndSmaller} {
    display: none;
  }
`

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: var(--secondary-color);
  }
`;


const LogoWrapper = styled.div`
  flex: 1;
  @media ${props => props.theme.QUERIES.tabletAndSmaller} {
    flex: revert;
  }
`;

export default Header;
