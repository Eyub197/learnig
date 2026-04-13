import styled from 'styled-components';

const Breadcrumbs = ({children}) => {
  return (
    <nav aria-label="Breadcrumb">
      <Wrapper>
      {children}
      </Wrapper>
    </nav>
  );
}


const Wrapper = styled.ul `
  margin: 0;
  padding: 0;
  list-style-type: none;
`

const Crumb = ({isCurrentPage, href, children}) => {
  return (
      <CrumbItem>
        <CrumbLink            
          href={href}
          aria-current={isCurrentPage ? 'page' : undefined}
          >{children}
      </CrumbLink>
    </CrumbItem>
  );
}

const CrumbItem = styled.li `
  cursor: pointer;
  display: inline;

  &:not(:first-of-type){
    margin-left: 12px;
  
  &::before {
    display: inline-block;
    content: "";
    margin-right: 12px;
    transform: rotate(15deeg);  
    transform: rotate(15deg);
    border-right: 0.1em solid currentcolor;
    height: 0.8em;

  }
}
`

const CrumbLink = styled.a `
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: revert;
  }

`

const App = () => (
  <Breadcrumbs>
    <Crumb href="/">Home</Crumb>
    <Crumb href="/living">Living Room</Crumb>
    <Crumb isCurrentPage={true} href="/living/couch">Couches</Crumb>
    <Crumb href="/living/couch/sectional">
      Sectionals
    </Crumb>
  </Breadcrumbs>
);

export default App;