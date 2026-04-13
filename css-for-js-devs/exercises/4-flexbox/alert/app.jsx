import styled from 'styled-components';
import { Check } from 'react-feather';

function Alert({ children }) {
  return (
    <Wrapper>
      <IconWrapper>
        <Check />
      </IconWrapper>
      <Heading>{children}</Heading>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 20px hsl(0deg 0% 0% / 0.35);
  border-radius: 4px;
  padding: 8px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: forestgreen;
  color: white;
  border-radius: 50%;
  margin-right: 8px;
  align-self: flex-start;
`;

const Heading = styled.div`
  flex-grow: 1;
`;

const App = () => (
  <Alert>
    Thanks for participating in our survey!
  </Alert>
);

export default App;