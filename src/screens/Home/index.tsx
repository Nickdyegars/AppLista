import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { CardNumber } from '../../components/CardNumber';
import { InputAddTask } from '../../components/EditText';
import { ButtonFilter } from '../../components/ButtonFilter';
import { Feather } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from 'react';
import TaskContext from '../../context/TaskContext';
import { Task } from '../../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskContent } from '../../utils/types';

export function Home() {

  const [taskData, setTaskData] = useState<taskContent[]>(null);

  function handleAddTask() {

  }

  function setTaskText() {

  }

  function handleFiter() {

  }

  

  useEffect(() => {
    const getData = async (): Promise<taskContent[]> => {
      try {
        const taskData = await AsyncStorage.getItem("task");

        const taskItemsData = taskData ? JSON.parse(taskData) : [];

        return taskItemsData;
      } catch {
        console.log("Erro ao recuperar dados")
      }
    }

    const fetchTaskData = async () =>{
      setTaskData(await getData());
    }

    fetchTaskData();

    
  },[taskData]);

 
  const handleDeleteTask = async (id: string) => {
   
      const taskData = await AsyncStorage.getItem("task");
      const taskItemsData = taskData ? JSON.parse(taskData) : [];
      const taskWithOutDeleted = taskItemsData.filter(task => task.id !== id);

      await AsyncStorage.setItem('task', JSON.stringify(taskWithOutDeleted));

      setTaskData(taskWithOutDeleted);
  

    
  }

  const handleChageStatus = async (id: string, newStatus: boolean) =>{

    const taskData = await AsyncStorage.getItem("task");
    const taskItemsData = taskData ? JSON.parse(taskData) : [];
    const tasks = taskItemsData.map(task =>
      task.id === id ? {...task, status: newStatus} : task
    )

    
    await AsyncStorage.setItem('task', JSON.stringify(tasks));

    setTaskData(tasks);

  }

return (
  <View style={styles.container}>
    <InputAddTask onPress={handleAddTask} onChangeText={setTaskText} value={''} />
    <Feather style={{ alignSelf: 'flex-end' }} name="plus-square" size={24} color="white" />
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <CardNumber
        title={'Cadastradas'}
        num={1} color={'#1E1E1E'} />
      <CardNumber
        title={'Em aberto'}
        num={2} color={'#FA9216'}
      />
      <CardNumber
        title={'Finalizadas'}
        num={2} color={'#11ad8b'}
      />
    </View>
    <ButtonFilter onPress={handleFiter} />

    {taskData &&
      taskData.map((item) =>(
        <Task
          taskData={item}
          deleteTask={handleDeleteTask}
          changeStatus={handleChageStatus}
        />
      ))
    }

    <StatusBar style="auto" />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: 64,
    gap: 16,
  },
});