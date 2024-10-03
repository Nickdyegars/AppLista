import { TextInput, Text, View, TouchableOpacity, Button } from 'react-native';
import * as C from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskContent } from '../../../utils/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HomeScreenNavigationProp } from '../../../utils/types';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const Content = () => {


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

    const generateRandomId = (length = 5) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        return result;
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setShowDate(true);
        setDate(currentDate);
    };

    const getData = async (): Promise<taskContent[]> => {
        try {
            const taskData = await AsyncStorage.getItem("task");

            const taskItemsData = taskData ? JSON.parse(taskData) : [];

            return taskItemsData;
        } catch {
            console.log("Erro ao recuperar dados")
        }

    }


    const handleNavigation = () => {

        navigation.navigate('Home')

    }

    const storeData = async () => {


        if (titleTask !== "" && descricao !== "" && showDate) {

            try {
                const allTasks = await getData();

                let id = generateRandomId();
                let verifyId;

                do {
                    verifyId = false;
                    for (let i in allTasks) {
                        if (allTasks[i].id == id) {
                            verifyId = true;
                        }
                    }
                } while (verifyId)

                const value: taskContent = {
                    id: id,
                    title: titleTask,
                    descricao: descricao,
                    date: date,
                    status: false
                };



                allTasks.push(value);
                await AsyncStorage.setItem('task', JSON.stringify(allTasks));
                console.log("success")

                handleNavigation();

            } catch (e) {
                console.log("erro")

                setValid(true);
            } finally {
                setTitleTask("")
                setDescricao("")
                setShowDate(false)
                setShowInfo(false)
            }
        } else {
            setShowInfo(true)
        }
    };


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
                <Text style={[{ color: "#fff" }, {fontWeight: 'bold'}]}>NÃO FOI POSSIVEL ENVIAR, TENTE NOVAMENTE</Text>
            }

            {
                showInfo &&
                <Text style={[{ color: "#F00" }, {fontSize: 18}, {fontWeight: 'bold'}]}>PREENCHA TODOS OS CAMPOS</Text>
            }


            <C.ButtonTask onPress={() => storeData()}>
                <Text style={[{ color: "#fff" }, { fontSize: 19 }]}>Criar Tarefa</Text>

            </C.ButtonTask>







        </C.Container>
    )
}