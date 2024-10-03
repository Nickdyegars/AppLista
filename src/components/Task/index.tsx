import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { taskContent } from "../../utils/types";
import * as C from "./style";

interface handleTask{
  taskData: taskContent
  deleteTask: (id: string) => void
  changeStatus: (id: string, newStatus: boolean) => void
}

export function Task(Props: handleTask) {
  const [date, setDate] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (Props.taskData.date) {
      const parsedDate = new Date(Props.taskData.date); // Converte a data
      if (!isNaN(parsedDate.getTime())) {
        setDate(formatDate(parsedDate)); // Formata e define a data
      } else {
        console.error('Data inválida');
      }
    }
  }, [Props.taskData.date]);

  const deleteTask = () => {
    Props.deleteTask(Props.taskData.id);
  }

  const changeStatus = () =>{

    const newStatus = Props.taskData.status ? false : true;

    Props.changeStatus(Props.taskData.id, newStatus);
  }
  return (
    <C.Container>
      <C.ContainerCheck onPress={changeStatus} width={70} color={Props.taskData.status ? "#21D233" : "#FA9216"}>
        {
          Props.taskData.status &&
          <MaterialCommunityIcons name="checkbox-outline" size={24} color="black" /> ||
          <AntDesign name="minussquareo" size={24} color="black" />
        }

      </C.ContainerCheck>
      <C.CenterContainer>
        <C.Title >{Props.taskData.title}</C.Title>
        <C.Date >{date}</C.Date>
      </C.CenterContainer>

      <C.ContainerCheck onPress={deleteTask} width={50} color={"#FA3E16"}>
        <Feather name="trash" size={24} color="black" />
      </C.ContainerCheck>
    </C.Container>
  );
}