import styled from 'styled-components/native';

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.SIZES.SUBTITLE};
  font-weight: 500;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY};
  font-size: ${({ theme }) => theme.SIZES.TEXT};
  font-weight: 500;
`;

export const ListItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 60px;
  width: 100%;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BLACK_LIGHT};
  padding: 0 10px;
`;
