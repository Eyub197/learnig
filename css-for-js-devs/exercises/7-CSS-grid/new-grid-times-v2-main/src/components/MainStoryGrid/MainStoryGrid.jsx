import React from 'react';
import styled from 'styled-components';

import {
  MAIN_STORY,
  OPINION_STORIES,
  SECONDARY_STORIES,
} from '../../data';

import SectionTitle from '../SectionTitle';
import MainStory from '../MainStory';
import SecondaryStory from '../SecondaryStory';
import OpinionStory from '../OpinionStory';
import Advertisement from '../Advertisement';

const MainStoryGrid = () => {
  return (
    <Wrapper>
      <MainStorySection>
        <MainStory {...MAIN_STORY} />
      </MainStorySection>

      <SecondaryStorySection>
        <StoryList>
          {SECONDARY_STORIES.map((story, index) => (
            <VerticalStoryWrapper key={story.id}>
              <SecondaryStory key={story.id} {...story} />
            </VerticalStoryWrapper>
          ))}
        </StoryList>
      </SecondaryStorySection>

      <OpinionSection>
        <SectionTitle>Opinion</SectionTitle>
        <OpinionStoryList>
          {OPINION_STORIES.map((story, index) => (
            <OpinionStoryWrapper key={story.id}>
              <OpinionStory {...story} />
            </OpinionStoryWrapper>
          ))}
        </OpinionStoryList>
      </OpinionSection>

      <AdvertisementSection>
        <Advertisement />
      </AdvertisementSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'main-story'
    'secondary-stories'
    'opinion-stories'
    'advertisement';
  gap: 48px;
  margin-bottom: 48px;

  @media ${props => props.theme.QUERIES.tabletAndUp} {
    grid-template-columns: 2fr 1fr;
    grid-template-areas: 
      "main-story secondary-stories"
      "advertisement advertisement"
      "opinion-stories opinion-stories";
    gap: 48px 0px;
  }


  @media ${props => props.theme.QUERIES.laptopAndUp} {
    grid-template-columns: 5fr 4fr 3fr;
    grid-template-areas: 
      "main-story secondary-stories opinion-stories"
      "main-story advertisement advertisement";
    gap: 0px;
}`;

const MainStorySection = styled.section`
  grid-area: main-story;

  @media ${props => props.theme.QUERIES.tabletAndUp} {
    margin-inline-end: 16px;
    padding-inline-end: 16px;
    border-right: 1px solid var(--color-gray-300);
  }
`;

const SecondaryStorySection = styled.section`
  grid-area: secondary-stories;

  @media ${props => props.theme.QUERIES.laptopAndUp} {
    margin-inline-end: 16px;
    padding-inline-end: 16px;
    border-right: 1px solid var(--color-gray-300);
  }
`;

const StoryList = styled.div`
  display: flex;
  flex-direction: column;
  container-type: inline-size;
`;

const OpinionStoryList = styled(StoryList)`
  @media ${props => props.theme.QUERIES.tabletOnly} {
    flex-direction: row;
    gap: 32px;
}
`

const VerticalStoryWrapper = styled.div`
  &:not(:last-of-type) {
    padding-block-end: 16px;
    margin-block-end: 16px;
    border-bottom: 1px solid var(--color-gray-300);
  }
`

const OpinionStoryWrapper = styled(VerticalStoryWrapper)`
  @media ${props => props.theme.QUERIES.tabletOnly} {
    flex: 1;

    &:not(:last-of-type) {
      padding-block-end: revert;
      margin-block-end: revert;
      border: revert;
    }
  }`

const OpinionSection = styled.section`
  grid-area: opinion-stories;

  @media ${props => props.theme.QUERIES.laptopAndUp} {
    margin-block-start: -8px;
  }
`

const AdvertisementSection = styled.section`
  grid-area: advertisement;

  @media ${props => props.theme.QUERIES.laptopAndUp} {
  margin-block-start: 16px;	
  padding-block-start: 16px ;
  border-top: 1px solid var(--color-gray-300);
}
`;


export default MainStoryGrid;
