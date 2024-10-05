import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { CardNumber } from '../../components/CardNumber';
import { InputAddTask } from '../../components/EditText';
import React, { useEffect, useState } from 'react';
import { Task } from '../../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskContent } from '../../utils/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NewTaskScreenNavigationProp } from '../../utils/types';
import { PopupEdit } from '../../components/PopupEdit';
import { useCallback } from 'react';

export function Home() {

  const [taskData, setTaskData] = useState<taskContent[]>([]);
  const [originalTaskData, setOriginalTaskData] = useState<taskContent[]>(null);  // Tarefas originais
  const [amountTask, setAmountTask] = useState<number>(0);
  const [openTask, setOpenTask] = useState<number>(0);
  const [closedTask, setClosedTask] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [taskEdit, setTaskEdit] = useState<taskContent>(null);
  const [searchText, setSearchText] = useState<string>("");
  const navigation = useNavigation<NewTaskScreenNavigationProp>();

  const { height, width } = Dimensions.get('window');

  // Função para buscar as tarefas
  const getData = async (): Promise<taskContent[]> => {
    try {
      const taskData = await AsyncStorage.getItem("task");
      
      const taskItemsData = taskData ? JSON.parse(taskData) : [];

      return taskItemsData;
    } catch {
      console.log("Erro ao recuperar dados");
    }
  };

  const countOpenTasks = () => {
    let totalTasks = taskData.length;
    let totalTasksOpen = taskData.filter((task) => task.status === false).length;
    let totalTasksCompleted = taskData.filter((task) => task.status === true).length;

    setClosedTask(totalTasksCompleted);
    setOpenTask(totalTasksOpen);
    setAmountTask(totalTasks);
  }

  useEffect(() => {
    countOpenTasks();
  })

  // UseFocusEffect para garantir que os dados sejam buscados ao focar a tela
  useFocusEffect(
    useCallback(() => {
      const fetchTaskData = async () => {
        const tasks = await getData();
        setAmountTask(tasks.length);
        setTaskData(tasks);
        setOriginalTaskData(tasks);
      };

      fetchTaskData();
    }, [])
  );

  const handleDeleteTask = async (id: string) => {
    const taskData = await AsyncStorage.getItem("task");
    const taskItemsData = taskData ? JSON.parse(taskData) : [];
    const taskWithOutDeleted = taskItemsData.filter(task => task.id !== id);

    await AsyncStorage.setItem('task', JSON.stringify(taskWithOutDeleted));

    // countOpenTasks();

    setTaskData(taskWithOutDeleted);
    //caso deletou itens filtrados
    setOriginalTaskData(taskWithOutDeleted);
  }

  const handleChageStatus = async (id: string, newStatus: boolean) => {
    const taskData = await AsyncStorage.getItem("task");
    const taskItemsData = taskData ? JSON.parse(taskData) : [];
    const tasks = taskItemsData.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    )

    await AsyncStorage.setItem('task', JSON.stringify(tasks));

    setTaskData(tasks);
  }

  const handleNavigation = () => {
    navigation.navigate('NewTask');
  }

  const handleSearch = (text: string) => {
    setSearchText(text);
  
    
    if (text.trim() === "") {
      setTaskData(originalTaskData);
      return;
    }

    const filteredTasks = originalTaskData.filter(task =>
      task.title.toLowerCase().includes(text.toLowerCase())
    );

    const remainingTasks = originalTaskData.filter(
      task => !task.title.toLowerCase().includes(text.toLowerCase())
    );

    //console.log(filteredTasks);
    //console.log(remainingTasks);

    setTaskData([...filteredTasks, ...remainingTasks]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTaskEdit(null);
  }

  const handleShowModal = async (id: string) => {
    const taskData = await AsyncStorage.getItem("task");
    const taskItemsData = taskData ? JSON.parse(taskData) : [];

    for (let i in taskItemsData) {
      if (taskItemsData[i].id === id) {
        setTaskEdit(taskItemsData[i]);
      }
    }

    setShowModal(true);
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
    addButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: 5
    },
    containerPopUp: {
      position: "absolute",
      height: height,
      width: width,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 2,
      alignItems: "center",
      justifyContent: "center",
    }
  });

  return (
    <View style={styles.container}>
      {showModal &&
        <View style={styles.containerPopUp}>
          <PopupEdit taskData={taskEdit} closeModal={handleCloseModal} />
        </View>
      }

      <InputAddTask onChangeText={handleSearch} value={searchText} />
      <View style={{ flexDirection: 'row', gap: 16, marginTop: 18 }}>
        <CardNumber title={'Cadastradas'} num={amountTask} color={'#1E1E1E'} />
        <CardNumber title={'Em aberto'} num={openTask} color={'#FA9216'} />
        <CardNumber title={'Finalizadas'} num={closedTask} color={'#11ad8b'} />
      </View>

      {  taskData &&
        taskData.map((item, key) => (
          <Task
            key={key}
            taskData={item}
            deleteTask={handleDeleteTask}
            changeStatus={handleChageStatus}
            showModalTask={handleShowModal}
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
