import { styled } from 'styled-components';

export const StyledImg = styled.img`
  width: 250px;
  height: 60px;
  padding: 2px;
  @media (max-width: 768px) {
    width: 180px;
    height: 60px;
  }
  @media (max-width: 480px) {
    width: 150px;
    height: 60px;
  }
`;
