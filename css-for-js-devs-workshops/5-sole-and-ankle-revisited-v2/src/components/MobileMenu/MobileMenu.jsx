import React from "react";
import styled from "styled-components";

import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";
import * as Dialog from "@radix-ui/react-dialog";
import { WEIGHTS } from "../../constants";

const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onDismiss}>
      <Dialog.Portal>
        <Overlay />

        <Contents>
          <Close>
            <CloseButton>
              <VisuallyHidden>Dismiss menu</VisuallyHidden>
              <Icon id="close" />
            </CloseButton>
          </Close>
          <VisuallyHidden>
            <Dialog.Title>Mobile navigation</Dialog.Title>
            <Dialog.Description>Mobile navigation</Dialog.Description>
          </VisuallyHidden>
          <Fill />
          <Nav>
            <NavLink href="/sale">Sale</NavLink>
            <NavLink href="/new">New&nbsp;Releases</NavLink>
            <NavLink href="/men">Men</NavLink>
            <NavLink href="/women">Women</NavLink>
            <NavLink href="/kids">Kids</NavLink>
            <NavLink href="/collections">Collections</NavLink>
          </Nav>
          <Footer>
            <FooterLink href="/terms">Terms and Conditions</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </Footer>
        </Contents>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background-color: var(--overlay-color);
`;

const Contents = styled(Dialog.Content)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
  border: 1px p;
`;

const Fill = styled.div`
  flex: 1;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavLink = styled.a`
  font-size: ${18 / 16}rem;
  text-decoration: none;
  color: var(--gray-900);
  text-transform: uppercase;
  font-weight: ${WEIGHTS.normal};
  &:first-of-type {
    color: var(--secondary);
  }
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0px;
  padding: 16px;
`;

const Close = styled(Dialog.Close)`
  background: none;
  border: none;
`;

const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const FooterLink = styled.a`
  font-size: ${14 / 16}rem;
  text-decoration: none;
  color: var(--gray-700);
`;

export default MobileMenu;
