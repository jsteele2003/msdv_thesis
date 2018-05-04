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
    box-shadow: 10px 5px 5px black;
    transition: width 0.75s ease-in-out;
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fcfff4', endColorstr='#b3bead',GradientType=0 );
    -webkit-font-smoothing: antialiased;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    line-height: 2;
    color: #6b6b76;
    text-transform: uppercase;
    outline: none;
    filter: alpha(opacity=75);
    opacity: 0.75;
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

