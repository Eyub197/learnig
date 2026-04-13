import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

import { QUERIES, WEIGHTS } from '../../constants';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';


const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Dialog.Root  open={isOpen} onOpenChange={onDismiss}>
      <Dialog.Portal>
        <Overlay/>
        <Content>
          <InnerWrapper>
            <CloseButton onClick={onDismiss}>
              <Icon id="close" />
              <VisuallyHidden>Dismiss menu</VisuallyHidden>
            </CloseButton>
            <VisuallyHidden>
              <Dialog.Title>Mobile navigation</Dialog.Title>
              <Dialog.Description>Mobile navigation</Dialog.Description>
            </VisuallyHidden>
            <Filler />
            <Nav>
              <NavLink href="/sale">Sale</NavLink>
              <NavLink href="/new">New&nbsp;Releases</NavLink>
              <NavLink href="/men">Men</NavLink>
              <NavLink href="/women">Women</NavLink>
              <NavLink href="/kids">Kids</NavLink>
              <NavLink href="/collections">Collections</NavLink>
            </Nav>
            <Footer>
              <SubLink href="/terms">Terms and Conditions</SubLink>
              <SubLink href="/privacy">Privacy Policy</SubLink>
              <SubLink href="/contact">Contact Us</SubLink>
            </Footer>
          </InnerWrapper>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; } 
`

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0%); }
`

const Overlay = styled(Dialog.Overlay)`
  display: block;
  position: fixed;
  inset: 0;
  background: var(--color-backdrop);
  animation: ${fadeIn} 500ms; 
`;

const Content = styled(Dialog.Content)`
--overfill: 16px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: white;
  display: flex;
  flex-direction: column;
  width: calc(300px + var(--overfill));
  margin-right: calc(var(--overfill) * -1);
  height: 100%;
  padding: 24px 32px;
  box-shadow: -8px 0 16px rgba(0, 0, 0, 0.2);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${slideIn} 500ms both cubic-bezier(0, 0.6, 0.32, 1.06);
    animation-delay: 200ms
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: ${fadeIn} 600ms both;
  animation-delay: 400ms;
`

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: var(--overfill);
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
`;

export default MobileMenu;
