import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.BLACK_LIGHT};
  color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 10px;
  padding: 10px 0px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  text-align: center;
  font-size: 12px;
`;