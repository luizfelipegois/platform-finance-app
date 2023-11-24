import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  flex: 1;
  padding: 0 10px;
`;

export const CapitalContainer = styled.View`
  margin: 50px 0px;
  align-items: center;
`;

export const Capital = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-size: ${({ theme }) => theme.SIZES.TITLE};
  font-weight: 600;
`;

export const PercentageText = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DetailsContainer = styled.View`
  background-color: ${({theme}) => theme.COLORS.CARDS};
  border-radius: 5px;
  padding: 15px;
  margin-top: 50px;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-size: ${({ theme }) => theme.SIZES.SUBTITLE};
`;

export const ListContainer = styled.View`
  margin-top: 25px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.SECUNDARY};
  font-size: ${({ theme }) => theme.SIZES.TEXT};
`;

export const Value = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-size: 16px;
  margin-top: 10px;
`;

export const Table = styled.View`
  margin-top: 50px;
  margin-bottom: 100px;
`;

export const Columns = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.CARDS};
  border-radius: 5px;
  padding: 10px;
`;

export const Column = styled.Text`
  color: ${({ theme }) => theme.COLORS.SECUNDARY};
  font-size: ${({ theme }) => theme.SIZES.TEXT};
  font-weight: 600;
  width: 25%;
  text-align: center;
`;

export const Rows = styled.View`
  padding: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const RowText = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  width: 25%;
  text-align: center;
`;
