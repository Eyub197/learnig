import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const VARIANTS = {
  'on-sale': {
    "--backgroundColor" : `${COLORS.primary}`,
    "--content": '"sale"',
    "--textDecoration": "line-through",
  },

  'new-release': {
    "--backgroundColor" : `${COLORS.secondary}`,
    "--content": '"Just Released!"',
    
  },

  'default': {
    "--backgroundColor" : "none",
    "--content": "none",
  },
}



const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantStyle = VARIANTS[variant];
  
  const RenderPrice = variant === "on-sale" ? PriceSale : Price



  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper style={variantStyle}>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <RenderPrice price={price} style={variantStyle}>{formatPrice(price)}</RenderPrice>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`

`;

const ImageWrapper = styled.div`
  position: relative;

  &::after {
    content: var(--content);
    position: absolute;
    top: 10px;
    right: -10px;
    padding-block-start: 7px;
    padding-block-end: 9px;
    padding-inline-start: 11px;
    padding-inline-end: 9px;
    font-family: inherit;
    font-weight: 700;
    color: ${COLORS.white};
    background-color: var(--backgroundColor);
    border-radius: 2px;
  }

`;

const Image = styled.img`
  width: 100%;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
position: relative;
`;


const PriceSale = styled(Price)`

text-decoration: line-through;

&::after {
  content: '${p => formatPrice(p.price)}';
  position: absolute;
  top: 20px;
  right: 0px;
  color: ${COLORS.primary};
  font-weight: bold;
  text-decoration: none;
}

`

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
