import { TextInput, Text, View, TouchableOpacity, Button } from 'react-native';
import * as C from './style';
import imgBack from './../../../assets/back-Button.svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

export const Content = () => {

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

    return (
        <C.Container>

            <C.InputBox>
                <C.TextInp>Titulo da Tarefa:</C.TextInp>
                <C.Input
                    height={56}
                    onChangeText={t => setTitleTask(t)}
                />
            </C.InputBox>

            <C.InputBox>
                <C.TextInp>Descrição:</C.TextInp>
                <C.Input
                    height={170}
                    onChangeText={t => setDescricao(t)}
                    textAlignVertical="top"
                />
            </C.InputBox>

            <View style={[{"marginBottom": 15}]}>

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
                    <Text style={[{color: "#fff"}, {fontSize: 16}]}>{showDate ? formatDate(date) : 'Selecione a Data'}</Text>
                </C.InputDate >
            </View>

            <C.ButtonTask>
                <Text style={[{color: "#fff"}, {fontSize: 19}]}>Criar Tarefa</Text>
            </C.ButtonTask>


        </C.Container>
    )
}