import { TextInput, Text, View, TouchableOpacity, Button } from 'react-native';
import * as C from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditTaskScreenRouteProp, taskContent } from '../../../utils/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HomeScreenNavigationProp } from '../../../utils/types';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export const Content = () => {


    const route = useRoute<EditTaskScreenRouteProp>();
    const [idTask, setIdTask] = useState<string>("");

    const [valid, setValid] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const [titleTask, setTitleTask] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");

    const [date, setDate] = useState<any>(new Date());
    const [show, setShow] = useState(false);
    const [showDate, setShowDate] = useState(false);

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Lembre-se que os meses começam em 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setShowDate(true);
        setDate(currentDate);
    };




    const handleNavigation = () => {

        navigation.navigate('Home')

    }

    const storeData = async () => {


        if (titleTask !== "" && descricao !== "" && showDate) {


            try {
                console.log(idTask)
                const taskData = await AsyncStorage.getItem("task");
                let taskItemsData = taskData ? JSON.parse(taskData) : [];

                let value: taskContent;

                for(let i in taskItemsData){
                    if(taskItemsData[i].id === idTask){
                        value = {
                            id: idTask,
                            title: titleTask,
                            descricao: descricao,
                            date: date,
                            status:  taskItemsData[i].status
                        } 
                        taskItemsData.splice(i, 1);
                    }
                }

                taskItemsData.push(value);
                await AsyncStorage.setItem('task', JSON.stringify(taskItemsData));
                console.log("success")

                handleNavigation();

            } catch (e) {
                console.log(e)

                setValid(true);
            } finally {
                
            }
        } else {
            setShowInfo(true)
        }
    };

    useEffect(() => {

        const getData = async (): Promise<taskContent[]> => {

            try {
                setIdTask(route.params?.id);

                const taskData = await AsyncStorage.getItem("task");
                const taskItemsData = taskData ? JSON.parse(taskData) : [];

                for (let i in taskItemsData) {
                    if (taskItemsData[i].id === route.params?.id) {
                        setTitleTask(taskItemsData[i].title);
                        setDescricao(taskItemsData[i].descricao);
                        setDate(new Date(taskItemsData[i].date));
                        setShowDate(true)
                    }
                }


                return taskItemsData;
            } catch (e) {
                console.log(e)
            }

        }

        getData();

    }, [])


    return (
        <C.Container>

            <C.InputBox>
                <C.TextInp >Titulo da Tarefa:</C.TextInp>
                <C.Input
                    height={56}
                    onChangeText={t => setTitleTask(t)}
                    value={titleTask}
                />
            </C.InputBox>



            <C.InputBox>
                <C.TextInp>Descrição:</C.TextInp>
                <C.Input
                    height={170}
                    onChangeText={t => setDescricao(t)}
                    textAlignVertical="top"
                    value={descricao}
                    multiline
                    numberOfLines={4}
                />
            </C.InputBox>



            <View style={[{ "marginBottom": 15 }]}>

                <C.TextInp>Data</C.TextInp>
                <C.InputDate onPress={() => setShow(true)}>
                    {show && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    <Text style={[{ color: "#fff" }, { fontSize: 16 }]}>{showDate ? formatDate(date) : 'Selecione a Data'}</Text>
                </C.InputDate >
            </View>
            {
                valid &&
                <Text style={[{ color: "#fff" }, { fontWeight: 'bold' }]}>NÃO FOI POSSIVEL ENVIAR, TENTE NOVAMENTE</Text>
            }

            {
                showInfo &&
                <Text style={[{ color: "#F00" }, { fontSize: 18 }, { fontWeight: 'bold' }]}>PREENCHA TODOS OS CAMPOS</Text>
            }


            <C.ButtonTask onPress={storeData}>
                <Text style={[{ color: "#fff" }, { fontSize: 19 }]}>Editar Tarefa</Text>

            </C.ButtonTask>







        </C.Container>
    )
}