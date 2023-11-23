import styled from 'styled-components/native';

export const UserContainerInformation = styled.View`
  align-items: center;
  margin-top: 50px;
`;

export const Username = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-size: ${({ theme }) => theme.SIZES.SUBTITLE};
  font-weight: 600;
`;

export const Email = styled.Text`
  color: ${({ theme }) => theme.COLORS.SECUNDARY};
  font-size: ${({ theme }) => theme.SIZES.TEXT};
  margin: 5px;
`;

export const List = styled.View`
  margin-top: 50px;
  width: 100%;
`;

export const ListItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  flex-direction: row;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  font-size: ${({ theme }) => theme.SIZES.TEXT};
  font-weight: 600;
  margin-left: 10px;
`;
