import React from 'react';
import styled from 'styled-components';

import { QUERIES, WEIGHTS } from '../../constants';
import Logo from '../Logo';
import Icon from '../Icon';
import UnstyledButton from '../UnstyledButton';
import SuperHeader from '../SuperHeader';
import MobileMenu from '../MobileMenu';
import VisuallyHidden from '../VisuallyHidden';
import NavLink from '../NavLink';


const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  // in each navLink you can add bold span and have a variable which will set which one is shown
  // or add on hover effect to each navLink

  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <DesktopNav>
          <NavLink href="/sale">
          Sale
            {/* <NormalLink>Sale</NormalLink>
            <BoldLink>Sale</BoldLink> */}
          </NavLink>
          <NavLink href="/new">
          New&nbsp;Release
            {/* <NormalLink>New&nbsp;Release</NormalLink>
            <BoldLink>New&nbsp;Release  </BoldLink> */}
          </NavLink>
          <NavLink href="/men">
          Men
            {/* <NormalLink>Men</NormalLink>
            <BoldLink>Men</BoldLink> */}
          </NavLink>
          <NavLink href="/women">
          Women
            {/* <NormalLink>Women</NormalLink>
            <BoldLink>Women</BoldLink> */}
          </NavLink>
          <NavLink href="/kids">
          Kids
            {/* <NormalLink>Kids</NormalLink>
            <BoldLink>Kids</BoldLink> */}
          </NavLink>
          <NavLink href="/collections">
          Collections
            {/* <NormalLink>Collections</NormalLink>
            <BoldLink>Collections</BoldLink> */}
          </NavLink>
        </DesktopNav>
        <MobileActions>
          <ShoppingBagButton>
            <Icon id="shopping-bag" />
            <VisuallyHidden>Open cart</VisuallyHidden>
          </ShoppingBagButton>
          <UnstyledButton>
            <Icon id="search" />
            <VisuallyHidden>Search</VisuallyHidden>
          </UnstyledButton>
          <UnstyledButton onClick={() => setShowMobileMenu(true)}>
            <Icon id="menu" />
            <VisuallyHidden>Open menu</VisuallyHidden>
          </UnstyledButton>
        </MobileActions>
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

  @media ${QUERIES.tabletAndSmaller} {
    justify-content: space-between;
    align-items: center;
    border-top: 4px solid var(--color-gray-900);
  }

  @media ${QUERIES.phoneAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: clamp(1rem, 9.2vw - 4.5rem, 3.5rem);
  margin: 0px 48px;
  overflow: clip;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const MobileActions = styled.div`
  display: none;

  
  
  @media ${QUERIES.tabletAndSmaller} {
    gap: 32px;
    display: flex;
  }

  @media ${QUERIES.phoneAndSmaller} {
    gap: 16px;
  }
`;

const LogoWrapper = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    flex: revert;
  }
`;

const ShoppingBagButton = styled(UnstyledButton)`
  transform: translateX(-2px);
`;

const Filler = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

// const BoldLink = styled.span`
//   position: absolute;
//   display: inline-block;
//   opacity: 0;
//   top: 20px;
//   left: 0px;
//   transition: 200ms transform, 200ms opacity ease-in-out;

// `

// const NormalLink = styled.span`
//   display: inline-block;
//   transition: 200ms transform ease-in-out;
// `


// const NavLink = styled.a`
//   position: relative;
//   font-size: 1.125rem;
//   text-transform: uppercase;
//   text-decoration: none;
//   color: var(--color-gray-900);
//   font-weight: ${WEIGHTS.medium};
//   transform: translateY(0px);
  
//   &:first-of-type {
//     color: var(--color-secondary);
//   }
  
//   &:hover ${NormalLink} {
//     font-weight: ${WEIGHTS.bold};
//   }

//   @media (prefers-reduced-motion: no-preference) {
//     &:hover ${BoldLink} {
//       transform: translateY(-20px);
//       font-weight: ${WEIGHTS.bold};
//       opacity: 1;
//     }
  
//     &:hover ${NormalLink} {
//       font-weight: revert;
//       transform: translateY(-100%);
//     }
    
//   }

 
// `;




export default Header;
