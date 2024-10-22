import React from 'react';

// Generate an array [start, start + 1, ..., end] inclusively
const genArray = (start, end) =>
  Array.from(Array(end - start + 1).keys()).map(v => v + start);

const IMAGES = {
  accessory: genArray(1, 15).map(n =>
    `${process.env.PUBLIC_URL}/assets/CoffeeCard/top_${n}.png`),
  body: genArray(1, 15).map(n =>
    `${process.env.PUBLIC_URL}/assets/CoffeeCard/body_${n}.png`),
  eyes: genArray(1, 15).map(n =>
    `${process.env.PUBLIC_URL}/assets/CoffeeCard/bottom_${n}.png`),
  mouth: genArray(1, 10).map(n =>
    `${process.env.PUBLIC_URL}/assets/CoffeeCard/ear_${n}.png`),
  fur: genArray(1, 20).map(n =>
    `${process.env.PUBLIC_URL}/assets/CoffeeCard/other_${n}.png`)
};

const dnaToAttributes = dna => {
  const attribute = (index, type) => IMAGES[type][dna[index] % IMAGES[type].length];

  return {
    top: attribute(0, 'top'),
    body: attribute(1, 'body'),
    bottom: attribute(2, 'bottom'),
    ear: attribute(3, 'ear'),
    other: attribute(4, 'other')
  };
};

const CoffeeCardComponents = props => {
  const outerStyle = { height: '110px', position: 'relative', width: '50%' };
  const innerStyle = { height: '100px', position: 'absolute', top: '3%', left: '50%' };
  const { dna } = props;

  if (!dna) return null;

  const coffee = dnaToAttributes(dna);
  return <div style={outerStyle}>
    <img alt='top' src={coffee.top} style={innerStyle} />
    <img alt='body' src={coffee.body} style={innerStyle} />
    <img alt='bottom' src={coffee.bottom} style={innerStyle} />
    <img alt='ear' src={coffee.ear} style={innerStyle} />
    <img alt='other' src={coffee.other} style={innerStyle} />
  </div>;
};

export default CoffeeCardComponents;