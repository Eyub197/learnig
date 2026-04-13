import styled from 'styled-components';

function NavLink({ href, children }) {
  return (
    <NavLinkAnchor href={href}>
      {children}
      <Revealed aria-hidden={true}>
        {children}
      </Revealed>
    </NavLinkAnchor>
  );
}

const NavLinkAnchor = styled.a`
  position: relative;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  font-size: 1.25rem;
`;

const Revealed = styled.span`
  color: hsl(333deg 100% 50%);
  position: absolute;
  top: 0;
  left: 0;
  filter: drop-shadow(0px 0px 4px white);
  clip-path: polygon(
    0% 100%,
    100% 100%,
    100% 100%,
    0% 100%
  );
  transition: clip-path 1000ms;

  ${NavLinkAnchor}:hover & {
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      0% 100%
    );
    transition: clip-path 300ms;
  }
`;


const App = () => (
  <header>
    <a class="logo" href="/">
      Logo
    </a>
    <nav>
      <ul>
        <li>
          <NavLink href="/">
            One
          </NavLink>
        </li>
        <li>
          <NavLink href="/">
            Two
          </NavLink>
        </li>
        <li>
          <NavLink href="/">
            Three
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default App;