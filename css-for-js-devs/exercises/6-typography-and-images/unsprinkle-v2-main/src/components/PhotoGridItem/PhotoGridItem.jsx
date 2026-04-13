import React from 'react';
import styled from 'styled-components';

const PhotoGridItem = ({ id, src, alt, tags }) => {
  return (
    // here just add the same way you did for the hero and shit but just with the srcSet use the replace shit 
    <article>
      <Anchor href={`/photos/${id}`}>
      <picture>
      <source 
        type="image/avif"
        srcSet={`
          ${src.replace('.jpg', '.avif')} 1x,
          ${src.replace('.jpg', '@2x.avif')} 2x,
          ${src.replace('.jpg', '@3x.avif')} 3x,
          `}
      />
       <source 
        type="image/jpg"
        srcSet={`
          ${src} 1x, 
          ${src.replace('.jpg', '@2x.jpg"')} 2x,
          ${src.replace('.jpg', '@3x.jpg"')} 3x,
          `}
      />
        <Image src={src} />
      </picture>
      </Anchor>
      <Tags>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
    </article>
  );
};

const Anchor = styled.a`
  text-decoration: none;
  color: inherit;
  outline-offset: 4px;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 300px;
  border-radius: 2px;
  margin-bottom: 8px;
  object-fit: cover;
`;

const Tags = styled.ul`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-block: 4px;
  padding-inline: 0;

`;

const Tag = styled.li`
  display: inline;
  padding-block: 4px;
  padding-inline: 8px;
  background: var(--color-gray-300);
  font-size: 0.875rem;
  font-weight: 475;
  color: var(--color-gray-800);

  &:not(:last-of-type) {
    margin-right: 4px;
  }
`;

export default PhotoGridItem;
