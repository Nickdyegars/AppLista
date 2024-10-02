import { SafeAreaView, Image, Text, View } from 'react-native';
import * as C from './style';
import imgBack from './../../../assets/back-Button.svg';

export const Header = () => {



    return (
        <C.Container  >
            <C.BackButton>
                <Image
                    source={require("../../../../assets/backButton.png")}
                    style={{ width: 36, height: 36 }}
                    resizeMode="cover"
                />
            </C.BackButton>

            <C.Title>
                Adicionar Tarefa
            </C.Title>
        </C.Container>
    )
}