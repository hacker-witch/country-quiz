import styled from "styled-components";

export const Button = styled.button`
  display: block;
  padding: 1rem 2.25rem;
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  border: none;
  border-radius: 0.75rem;
  background: #f9a826;
  box-shadow: 0 0.125rem 0.25rem rgba(252, 168, 47, 0.4);

  :focus,
  :hover {
    background: #e89715;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 0.25rem rgba(249, 168, 38, 0.4);
  }
`;
