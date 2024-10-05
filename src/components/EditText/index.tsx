import { Feather } from "@expo/vector-icons";
import { InputContainer, Input, IconSearch } from "./styles";
import React from "react";

type Props = {
  onChangeText: (text: string) => void;
  value: string;
}

export function InputAddTask({ onChangeText, value }: Props) {
  return (
    <InputContainer>
      <IconSearch>
        <Feather name="search" size={24} color="white" />
      </IconSearch>
      <Input
        placeholder="Adicionar tarefa"
        placeholderTextColor="white"
        keyboardType="default"
        value={value}
        onChangeText={onChangeText} />
    </InputContainer>
  )
}