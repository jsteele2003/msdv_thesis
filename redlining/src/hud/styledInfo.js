import React from 'react';
import styled, { css } from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export const ControlContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    box-shadow: 30px 10px 5px 20px #777;
    transition: width 1s ease-in-out;
    -webkit-font-smoothing: antialiased;
    line-height: 2;
    outline: none;
    opacity: 0.65;
`;


export const dummySentences = [
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    'Donec hendrerit tempor tellus.',
    'Donec pretium posuere tellus.',
    'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.',
    'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    'Nulla posuere.',
    'Donec vitae dolor.',
    'Nullam tristique diam non turpis.',
    'Cras placerat accumsan nulla.',
    'Nullam rutrum.',
    'Nam vestibulum accumsan nisl.'
];

export const jacquesQuote = "Those free men who are shop keepers earn a moderate living but never expand their businesses beyond a certain point.\n" +
    "The simple reason is that... the whites, who have the money, are not willing to lend to a Negro the capital\n" +
    "necessary for a big commercial establishment.";

