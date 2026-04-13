import styled from 'styled-components';

function Calendar() {
  return (
    <Wrapper>
      {DAYS.map(day => (
        <Day key={day}>
          {day}
        </Day>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  width: min-content; 
  /* width: max-content; this works to, this was his solution*/
  margin-inline: auto;
  padding-inline: 16px;
  padding-block: 16px;
  border: 3px solid;
`;

const Day = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center; 
  height: 2rem;
  border: 2px solid;
  border-radius: 4px;
`;

const DAYS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];

export default Calendar;