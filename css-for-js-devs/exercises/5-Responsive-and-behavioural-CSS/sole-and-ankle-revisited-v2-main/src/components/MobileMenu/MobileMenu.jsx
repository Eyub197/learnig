import React from 'react';
import styled from 'styled-components';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';
import * as Dialog from "@radix-ui/react-dialog";

const MobileMenu = ({ isOpen, onDismiss }) => {

  return (
    <Dialog.Root open={isOpen} onOpenChange={onDismiss}>
      <Dialog.Portal>
      
      <Overlay/>

      <Content>
        <CloseButton onClick={onDismiss}>
          <Icon id={'close'}/>
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>

        <VisuallyHidden>
          <Dialog.Title>Mobile Navigation</Dialog.Title>
          <Dialog.Description>Mobile Navigation</Dialog.Description>        
        </VisuallyHidden>

        <Filler/>

        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/woman">Woman</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>

        <Footer>
          <FooterLink href="/terms">Terms and Conditions</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/contact">Contact Us</FooterLink>
        </Footer>

      </Content> 

      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: hsl(220deg 3% 20% / 0.8);
`

const Content = styled(Dialog.Content)`
  position: fixed;
  inset: 0 0 0 auto;
  ${props => props.theme.Utils.flexColumn}
  background-color: white;
  width: 300px;
  height: 100%;
  padding-block: 24px;
  padding-inline: 32px;
`


const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
`
const Filler = styled.div`
  flex: 1;
`

const Nav = styled.nav`
  ${props => props.theme.Utils.flexColumn};
  gap: 16px;
`

const NavLink = styled.a `
  font-size: 1.125rem;
  font-weight: ${props => props.theme.WEIGHTS.medium};
  text-transform: uppercase;
  text-decoration: none;
 color: var(--gray-color-900); 
  
  &:first-of-type {
    color:hsl(240deg 60% 63%);
  }
`

const Footer = styled.footer`
  flex: 1;
  ${props => props.theme.Utils.flexColumn};
  justify-content: flex-end;
  gap: 14px;
`

const FooterLink = styled.a `
  font-size: 0.875rem;
  color: var(--gray-color-700);
  text-decoration: none;
  font-weight: ${props => props.theme.WEIGHTS.medium};
`

export default MobileMenu;
