import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  flex: 1;
`;

export const SubTitle = styled.Text`
  font-size: ${({ theme }) => theme.SIZES.SUBTITLE};
  font-weight: 600;
  width: 60%;
  color: #f2f2f2;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-size: ${({ theme }) => theme.SIZES.TEXT};
  font-weight: 500;
`;
