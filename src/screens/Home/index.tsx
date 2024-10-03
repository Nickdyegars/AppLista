import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { CardNumber } from '../../components/CardNumber';
import { InputAddTask } from '../../components/EditText';
import { ButtonFilter } from '../../components/ButtonFilter';
import { Feather } from "@expo/vector-icons";
import React, {useEffect, useState } from 'react';
import { Task } from '../../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskContent } from '../../utils/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NewTaskScreenNavigationProp } from '../../utils/types';

export function Home() {

  const [taskData, setTaskData] = useState<taskContent[]>(null);
  const [amountTask, setAmountTask] = useState<number>(0);
  const [openTask, setOpenTask] = useState<number>(0);
  const [closedTask, setClosedTask] = useState<number>(0);
  const navigation = useNavigation<NewTaskScreenNavigationProp>();

  useEffect(() => {
    const getData = async (): Promise<taskContent[]> => {
      try {
        const taskData = await AsyncStorage.getItem("task");

        const taskItemsData = taskData ? JSON.parse(taskData) : [];
        setAmountTask(taskItemsData.length)

        let closed: number = 0;
        let open: number = 0;

        for( let i in taskItemsData){
          if(taskItemsData[i].status){
            open += 1;
          }else{
            closed += 1;
          }

          setClosedTask(closed);
          setOpenTask(open)

        }

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

  const handleNavigation = () =>{

    navigation.navigate('NewTask')

  }

  const handleAddTask = () =>{

  }

  const setTaskText = () =>{
    
  }
  const handleFiter = () =>{
    
  }
return (
  <View style={styles.container}>
    <InputAddTask onPress={handleAddTask} onChangeText={setTaskText} value={''} />
    <Feather style={{ alignSelf: 'flex-end' }} name="plus-square" size={24} color="white" />
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <CardNumber
        title={'Cadastradas'}
        num={amountTask} color={'#1E1E1E'} />
      <CardNumber
        title={'Em aberto'}
        num={openTask} color={'#FA9216'}
      />
      <CardNumber
        title={'Finalizadas'}
        num={closedTask} color={'#11ad8b'}
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

    <TouchableOpacity onPress={handleNavigation} style={styles.addButton}>
      <Ionicons name="add-circle" size={60} color="#FA9216" />
    </TouchableOpacity>

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
  addButton:{
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 5
  }
});