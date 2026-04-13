import React from 'react';
import styled from 'styled-components';

import { MARKET_DATA, SPORTS_STORIES } from '../../data';

import MarketCard from '../MarketCard';
import SectionTitle from '../SectionTitle';
import MiniStory from '../MiniStory';

const SpecialtyStoryGrid = () => {
  return (
    <Wrapper>
      <MarketsSection>
        <SectionTitle
          cornerLink={{
            href: '/markets',
            content: 'Visit Markets data »',
          }}
        >
          Markets
        </SectionTitle>
        <MarketCards>
          {MARKET_DATA.map((data) => (
            <MarketCard key={data.tickerSymbol} {...data} />
          ))}
        </MarketCards>
      </MarketsSection>
      <SportsSection>
        <SectionTitle
          cornerLink={{
            href: '/sports',
            content: 'Visit Sports page »',
          }}
        >
          Sports
        </SectionTitle>
        <SportsStories>
          {SPORTS_STORIES.map((data) => (
            <SportsStoryWrapper key={data.id}>
              <MiniStory {...data} />
            </SportsStoryWrapper>
          ))}
        </SportsStories>
      </SportsSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 48px;

  @media ${props => props.theme.QUERIES.tabletAndUp} {
    /* grid-template-columns: minmax(0, auto); */
    /* Both works */
    grid-template-columns: 100%;
    gap: 64px;
  }

  @media ${props => props.theme.QUERIES.laptopAndUp} {
    grid-template-columns: 1fr minmax(0, 1fr);
    gap: 0px;
  }
`;

const MarketsSection = styled.section`
  @media ${props => props.theme.QUERIES.laptopAndUp} {
    border-right: 1px solid var(--color-gray-300);
    padding-inline-end: 16px;
    margin-inline-end: 16px;
  }
`;

const MarketCards = styled.div`
  ${props => props.theme.Utils.mostUsedGridSnippet}
`;

const SportsSection = styled.section`
  `;

const SportsStories = styled.div`
  ${props => props.theme.Utils.mostUsedGridSnippet}

  @media ${props => props.theme.QUERIES.tabletAndUp} {
    display: flex;
    grid-template-columns: revert;
    overflow: auto;
  }
`;

const SportsStoryWrapper = styled.div`
  min-width: 220px;
`

export default SpecialtyStoryGrid;
