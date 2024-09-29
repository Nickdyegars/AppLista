import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const ContainerRetangle = styled.View<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border: 2px solid #5F5F5F;
  padding: 6px;
  margin: 10px;
  border-radius: 5px;
`;

export const CardTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

