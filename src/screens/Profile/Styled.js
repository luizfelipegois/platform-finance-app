import styled from 'styled-components/native';

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-size: ${({ theme }) => theme.SIZES.SUBTITLE};
  font-weight: 600;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.SECUNDARY};
  font-size: ${({ theme }) => theme.SIZES.TEXT};
`;

export const ListItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 60px;
  width: 100%;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.CARDS};
  padding: 0 10px;
`;
