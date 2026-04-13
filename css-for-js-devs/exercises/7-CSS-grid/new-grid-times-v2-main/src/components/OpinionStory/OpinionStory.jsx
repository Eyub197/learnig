import React from 'react';
import styled from 'styled-components';

const OpinionStory = ({ id, title, author, avatar }) => {
  return (
    <a href={`/story/${id}`}>
      <Wrapper>
        <Avatar alt="" src={avatar} />
        <div>
          <AuthorName>{author}</AuthorName>
          <ArticleTitle>{title}</ArticleTitle>
        </div>
      </Wrapper>
    </a>
  );
};

const Wrapper = styled.article`
  color: var(--color-gray-900);
  container-type: inline-size;
`;

const Avatar = styled.img`
  display: block;
  float: right;
  width: 48px;
  height: 48px;
  margin-inline-start: 16px;
  object-fit: cover;
  border-radius: 50%;

  @container (max-width: 240px) {
    float: revert;
    margin-inline-start: revert;
  }

  /* @media ${props => props.theme.QUERIES.tabletOnly} {
   float: revert;
   margin-inline-start: revert;
  } */

`;

const AuthorName = styled.p`
  font-size: 1.125rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  margin-bottom: 4px;
`;

const ArticleTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
`;

export default OpinionStory;
