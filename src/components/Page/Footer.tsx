import styled from "styled-components";

export const Footer = () => (
  <Wrapper>
    created by <Username>hacker-witch</Username> - devChallenges.io
  </Wrapper>
);

const Wrapper = styled.footer`
  margin-top: auto;
  padding: 1.8125rem 0;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #f2f2f2;
`;

const Username = styled.span`
  font-weight: 700;
  text-decoration: underline;
`;
