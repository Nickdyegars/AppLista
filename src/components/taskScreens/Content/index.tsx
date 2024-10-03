import { TextInput, Text, View, TouchableOpacity, Button } from 'react-native';
import * as C from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskContent } from '../../../utils/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

export const Content = () => {


    const [teste, setTeste] = useState(false);

    const [titleTask, setTitleTask] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");

    const [date, setDate] = useState<any>(new Date());
    const [show, setShow] = useState(false);
    const [showDate, setShowDate] = useState(false);

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
   
    const storeData = async () => {

        
        if (titleTask !== "" && descricao !== "" && showDate) {

            const value: taskContent = {
                title: titleTask,
                descricao: descricao,
                date: date
            };
            try {
                await AsyncStorage.setItem('task', JSON.stringify(value));

            } catch (e) {
                // saving error
                
            setTeste(true);
            }finally{
                setTitleTask("")
                setDescricao("")
                setShowDate(false)
            }
        }
    };

    return (
        <C.Container>
            
            <C.InputBox>
                <C.TextInp>Titulo da Tarefa:</C.TextInp>
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
                teste &&
                <Text style={[{color: "#fff"}]}>NÃO FOI POSSIVEL ENVIAR, TENTE NOVAMENTE</Text>
            }
            

            <C.ButtonTask onPress={() => storeData()}>
                <Text style={[{ color: "#fff" }, { fontSize: 19 }]}>Criar Tarefa</Text>

            </C.ButtonTask>


            




        </C.Container>
    )
}