import {Text, View } from 'react-native';
import * as C from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskContent } from '../../../utils/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HomeScreenNavigationProp } from '../../../utils/types';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    titleTask: Yup.string()
        .required('Título é obrigatório')
        .max(16, 'Título deve ter no máximo 16 caracteres'),
    descricao: Yup.string()
        .required('Descrição é obrigatória'),
    date: Yup.date()
        .required('Data é obrigatória')
        .nullable()
});

export const Content = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
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

    const onChange = (event, selectedDate, setFieldValue) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || date;
            setShow(false);
            setFieldValue('date', currentDate);
        } else {
            setShow(false);
        }
    };

    const getData = async (): Promise<taskContent[]> => {
        try {
            const taskData = await AsyncStorage.getItem("task");
            return taskData ? JSON.parse(taskData) : [];
        } catch {
            console.log("Erro ao recuperar dados");
        }
    };

    const handleNavigation = () => {
        navigation.navigate('Home');
    };

    const storeData = async (values) => {
        const { titleTask, descricao, date } = values;
        try {
            const allTasks = await getData();
            let id = generateRandomId();
            let verifyId;

            do {
                verifyId = false;
                for (let i in allTasks) {
                    if (allTasks[i].id === id) {
                        verifyId = true;
                    }
                }
            } while (verifyId);

            const value: taskContent = {
                id: id,
                title: titleTask.charAt(0).toUpperCase() + titleTask.slice(1).toLowerCase(),
                descricao: descricao,
                date: date,
                status: false,
            };

            allTasks.push(value);
            await AsyncStorage.setItem('task', JSON.stringify(allTasks));
            console.log("success");
            handleNavigation();
        } catch (e) {
            console.log("erro" + " " + e);
        }
    };

    return (
        <KeyboardAwareScrollView>
            <C.Container>
                <Formik
                    initialValues={{ titleTask: '', descricao: '', date: date }}
                    onSubmit={(values) => storeData(values)}                    
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
                        <>
                            <C.InputBox>
                                <C.TextInp>Titulo da Tarefa</C.TextInp>
                                <C.Input
                                    height={56}
                                    onChangeText={handleChange('titleTask')}
                                    onBlur={handleBlur('titleTask')}
                                    value={values.titleTask}
                                />
                                {errors.titleTask && typeof errors.titleTask === 'string' && (
                                    <Text style={{ color: 'red' }}>{errors.titleTask}</Text>
                                )}
                            </C.InputBox>

                            <C.InputBox>
                                <C.TextInp>Descrição</C.TextInp>
                                <C.Input
                                    height={170}
                                    onChangeText={handleChange('descricao')}
                                    onBlur={handleBlur('descricao')}
                                    value={values.descricao}
                                    textAlignVertical="top"
                                    multiline
                                    numberOfLines={4}
                                />
                                {errors.descricao && typeof errors.descricao === 'string' && (
                                    <Text style={{ color: 'red' }}>{errors.descricao}</Text>
                                )}
                            </C.InputBox>

                            <View style={{ marginBottom: 15 }}>
                                <C.TextInp>Data</C.TextInp>
                                <C.InputDate onPress={() => setShow(true)}>
                                    {show && (
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            display="default"
                                            onChange={(event, selectedDate) => onChange(event, selectedDate, setFieldValue)}
                                        />
                                    )}
                                    <Text style={{ color: "#fff", fontSize: 16 }}>
                                        {values.date ? formatDate(values.date) : 'Selecione a Data'}
                                    </Text>
                                </C.InputDate>
                                {errors.date && typeof errors.date === 'string' && (
                                    <Text style={{ color: 'red' }}>{errors.date}</Text>
                                )}
                            </View>

                            <C.ButtonTask  onPress={() => handleSubmit()}>
                                <Text style={{ color: "#fff", fontSize: 19 }}>Criar Tarefa</Text>
                            </C.ButtonTask>
                        </>
                    )}
                </Formik>
            </C.Container>
        </KeyboardAwareScrollView>
    );
};
