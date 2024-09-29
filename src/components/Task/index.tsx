import React from "react";
import { Feather } from "@expo/vector-icons";
import { TaskProps } from "../../utils/types";
import { Container, ContainerCheck, Title } from "./style";

export function Task({ title, description, status, data, label }: TaskProps) {
  return (
    <Container>
      <ContainerCheck>
        <Feather name="plus-square" size={24} color="white"/>
      </ContainerCheck>
      <Title>{title}</Title>
      {/* <Title>{title}</Title>
      <Description>{description}</Description>
      <Data>{data}</Data>
      <Label color={label.color}>{label.title}</Label> */}
    </Container>
  );
}