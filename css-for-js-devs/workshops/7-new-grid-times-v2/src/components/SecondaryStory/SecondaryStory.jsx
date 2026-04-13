import React from "react";
import styled from "styled-components";

const SecondaryStory = ({ id, title, image, location, abstract }) => {
  return (
    <ArticleWrapper href={`/story/${id}`}>
      <Wrapper>
        <Image alt={image.alt} src={image.src} />
        <Heading>{title}</Heading>
        <Abstract>{abstract}</Abstract>
      </Wrapper>
    </ArticleWrapper>
  );
};

const ArticleWrapper = styled.div`
  container-type: inline-size;
  container-name: inner;
  width: 100%;
`;

const Wrapper = styled.article`
  display: grid;
  grid-template-areas:
    "image"
    "heading"
    "abstract";
  grid-template-columns: 1fr;
  gap: 4px 16px;
  color: var(--color-gra y-900);

  @container inner (min-width: 325px) {
    display: grid;
    grid-template-areas:
      "image heading"
      "image abstract";
    grid-template-columns: 120px 1fr;
  }
`;

const Image = styled.img`
  grid-area: image;
  display: block;
  width: 100%;
  height: 120px;
  border-radius: 4px;
  object-fit: cover;
`;

const Heading = styled.h2`
  grid-area: heading;
  font-size: 1.125rem;
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
  /* Optical alignment */
  margin-top: -2px;
`;

const Abstract = styled.p`
  grid-area: abstract;
  font-size: 1rem;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /*Line clamping the p*/
  overflow: hidden;

  /*So it donsent strech and it is not shown in smaller devacies more text*/
  align-self: start;
`;

export default SecondaryStory;
