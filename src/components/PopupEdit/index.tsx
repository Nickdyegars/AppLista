import { View, Text, TouchableOpacity } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";
import * as C from './style';
import { taskContent } from "../../utils/types";


interface types {
    taskData: taskContent
    closeModal: () => void
}

export const PopupEdit = (Props: types) => {

    const [date, setDate] = useState<string | null>(null);

    const handleCloseModal = () => {
        Props.closeModal();
    }

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


    return (
        <C.Container>
            <C.Header>
                <C.Title>{Props.taskData.title}</C.Title>
                <C.ContainerEsc onPress={handleCloseModal}>
                    <FontAwesome name="close" size={24} color="white" />
                </C.ContainerEsc>
            </C.Header>

            <C.InputBox>
                <C.TextInp>Descrição:</C.TextInp>
                <C.Input
                    height={140}
                    textAlignVertical="top"
                    onChange={() => Props.taskData.descricao}
                    value={Props.taskData.descricao}
                    multiline
                    numberOfLines={4}
                    editable={false}
                    scrollEnabled={true} // Habilita o scroll
                />
            </C.InputBox>

            <C.InputBox>
                <C.TextInp>Data:</C.TextInp>
                <C.Input
                    height={50}
                    textAlignVertical="center"
                    value={date}
                    multiline
                    numberOfLines={4}
                    editable={false}
                />
            </C.InputBox>

            <C.EditTask >
                <MaterialCommunityIcons name="square-edit-outline" size={45} color="#FA9216" />
            </C.EditTask>

        </C.Container>
    )

}

