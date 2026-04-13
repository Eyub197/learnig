import React from "react";
import styled from "styled-components";

import { MAIN_STORY, OPINION_STORIES, SECONDARY_STORIES } from "../../data";

import SectionTitle from "../SectionTitle";
import MainStory from "../MainStory";
import SecondaryStory from "../SecondaryStory";
import OpinionStory from "../OpinionStory";
import Advertisement from "../Advertisement";

const MainStoryGrid = () => {
  return (
    <Wrapper>
      <MainStorySection>
        <MainStory {...MAIN_STORY} />
      </MainStorySection>

      <SecondaryStorySection>
        <StoryList>
          {SECONDARY_STORIES.map((story, index) => (
            <VerticaStoryWrapper key={story.id}>
              <SecondaryStory {...story} />
            </VerticaStoryWrapper>
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
    "main-story"
    "secondary-stories"
    "opinion-stories"
    "advertisement";
  gap: 48px;
  margin-bottom: 48px;

  @media ${(props) => props.theme.queries.tabletAndUp} {
    grid-template-areas:
      "main-story secondary-stories"
      "advertisement advertisement"
      "opinion-stories opinion-stories";
    grid-template-columns: 2fr 1fr;
    gap: 48px 0px;
  }

  @media ${(props) => props.theme.queries.laptopAndUp} {
    grid-template-areas:
      "main-story secondary-stories opinion-stories"
      "main-story advertisement advertisement";
    grid-template-columns: 5fr 4fr 3fr;
    gap: 0;
  }
`;

const MainStorySection = styled.section`
  grid-area: main-story;
  @media ${(props) => props.theme.queries.tabletAndUp} {
    padding-right: 16px;
    margin-right: 16px;
    border-right: 1px solid var(--color-gray-300);
  }
`;

const SecondaryStorySection = styled.section`
  grid-area: secondary-stories;
  padding: 16px;

  @media ${(props) => props.theme.queries.laptopAndUp} {
    padding-top: 0px;
    padding-left: 0px;
    padding-right: 16px;
    margin-right: 16px;
    border-right: 1px solid var(--color-gray-300);
  }
`;

const StoryList = styled.div`
  display: flex;
  flex-direction: column;
`;

const OpinionStoryList = styled(StoryList)`
  @media ${(props) => props.theme.queries.tabletOnly} {
    flex-direction: row;
    gap: 48px;
  }
`;

const OpinionSection = styled.section`
  grid-area: opinion-stories;

  @media ${(props) => props.theme.queries.laptopAndUp} {
    margin-top: -8px;
  }
`;

const VerticaStoryWrapper = styled.div`
  &:not(:last-of-type) {
    ${(props) => props.theme.utils.bottomBorderPadding}
  }
`;

const OpinionStoryWrapper = styled(VerticaStoryWrapper)`
  flex: 1;

  @media ${(props) => props.theme.queries.tabletOnly} {
    &:not(:last-of-type) {
      border-bottom: 0;
      padding-block-end: 0;
      margin-block-end: 0;
    }
  }
`;

const AdvertisementSection = styled.section`
  grid-area: advertisement;

  @media ${(props) => props.theme.queries.laptopAndUp} {
    padding-top: 16px;
    margin-top: 16px;
    border-top: 1px solid var(--color-gray-300);
  }
`;

export default MainStoryGrid;
