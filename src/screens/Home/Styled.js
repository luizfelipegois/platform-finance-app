import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BLACK};
  flex: 1;
  padding: 0 10px;
`;

export const Section = styled.View`
  margin: 50px 0px;
  align-items: flex-start;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.SIZES.TITLE};
  font-weight: 500;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.SIZES.SUBTITLE};
  font-weight: 500;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.SIZES.TEXT};
  font-weight: 400;
`;

export const Column = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.SIZES.TEXT};
  font-weight: 500;
  width: 25%;
  text-align: center;
`;

export const RowText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  width: 25%;
  text-align: center;
  font-size: 12px;
`;
