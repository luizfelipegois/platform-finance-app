import styled from 'styled-components/native';

export const Content = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.SIZES.TITLE};
  font-weight: ${({ theme }) => theme.WEIGHT.BOLD};
`;
