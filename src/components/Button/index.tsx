import styled from "styled-components";

export const Button = styled.button`
  display: block;
  margin-top: 1.5rem;
  margin-left: auto;
  padding: 1rem 2.25rem;
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  border: none;
  border-radius: 0.75rem;
  background: #bbb;

  :hover {
    cursor: pointer;
  }

  :focus,
  :hover {
    outline: none;
    box-shadow: 0 0.125rem 0.25rem rgba(252, 168, 47, 0.4);
    background: #f9a826;
  }
`;
