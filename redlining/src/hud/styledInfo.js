import React from 'react';
import styled, { css } from 'styled-components';

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
    transition: width 1.5s ease-in-out;
    -webkit-font-smoothing: antialiased;
    outline: none;
    opacity: 0.65;
`;


export const ChartContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 30px 10px 5px 20px #777;
    transition: width 1.5s ease-in-out;
    -webkit-font-smoothing: antialiased;
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


export const chartStyle = {
    background: 'white',
    borderRadius: 3,
    opacity: 0,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    fontFamily: 'ff-clan-web-pro, "Helvetica Neue", Helvetica, sans-serif !important',
    fontSize: '12px',
    lineHeight: 1.833,
    height: 210,
    padding: '10px',
    position: 'absolute',
    left: 20,
    top: 20,
    width: 500,
    zIndex: 100
};

export const tooltipStyle = {
    position: 'absolute',
    padding: '4px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    maxWidth: '300px',
    fontSize: '10px',
    zIndex: 9,
    pointerEvents: 'none'
};