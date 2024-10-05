import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 8px;
  border-radius: 4px;
  overflow: hidden;
  width: 95%;
  
`;
export const CenterContainer = styled.TouchableOpacity`
  background-color: #fff;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 150px;
  height: 100%;
`;

type Props ={
  width: number
  color: string
}

export const ContainerCheck = styled.TouchableOpacity<Props>`
  background-color: ${Props => Props.color};
  height: 70px;
  width: ${Props => Props.width}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: #1e1e1e;
  font-size: 16px;
  font-weight: 500;
`;

export const Date = styled.Text`
  color: #1e1e1e;
  font-size: 15px;
  font-weight: 500;
`;