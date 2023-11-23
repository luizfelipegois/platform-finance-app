import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 30px;
`;

export const Image = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 200px;
`;

export const Title = styled.Text`
  margin-top: 20px;
  font-size: 22px;
  font-weight: 600;
  color: #f2f2f2;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  color: #57B8FF;
  font-size: ${({theme}) => theme.SIZES.TEXT};
  margin-right: 5px;
  font-weight: 600;
`;

