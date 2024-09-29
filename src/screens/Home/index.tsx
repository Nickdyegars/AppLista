import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { CardNumber } from '../../components/CardNumber';
import { InputAddTask } from '../../components/EditText';
import { ButtonFilter } from '../../components/ButtonFilter';
import { Feather } from "@expo/vector-icons";
import React, { useContext, useState } from 'react';
import TaskContext from '../../context/TaskContext';
import { Task } from '../../components/Task';

export function Home() {
  
  function handleAddTask() {
    
  }

  function setTaskText() {
    
  }

  function handleFiter(){

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
      <ButtonFilter onPress={handleFiter}/>
      <Task id={0} title={'teste'} description={'teste'} status={true} data={new Date()} label={{ id: 0, title: '', color: '' }} />
      <Task id={0} title={'teste'} description={'teste'} status={true} data={new Date()} label={{ id: 0, title: '', color: '' }} />
      <Task id={0} title={'teste'} description={'teste'} status={true} data={new Date()} label={{ id: 0, title: '', color: '' }} />
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