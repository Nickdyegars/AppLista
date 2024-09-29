import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 8px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const ContainerCheck = styled.TouchableOpacity`
  background-color: #FA9216;
  height: 70px;
  width: 70px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const Title = styled.Text`
  color: #1e1e1e;
  font-size: 16px;
  font-weight: 500;
`;