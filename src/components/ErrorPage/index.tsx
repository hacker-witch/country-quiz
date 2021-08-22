import styled from "styled-components";
import { Page } from "../Page";

interface ErrorPageProps {
  error: string;
}

export const ErrorPage = ({ error }: ErrorPageProps) => (
  <Page>
    <Error>{error}</Error>
  </Page>
);

const Error = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ef4444;
`;
