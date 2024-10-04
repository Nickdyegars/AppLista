import { SafeAreaView, Image, Text, View } from 'react-native';
import * as C from './style';
import imgBack from './../../../assets/back-Button.svg';
import { HomeScreenNavigationProp } from '../../../utils/types';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>();


    const handleNavigation = () => {

        navigation.navigate('Home')

    }

    return (
        <C.Container  >
            <C.BackButton onPress={handleNavigation}>
                <Image
                    source={require("../../../../assets/backButton.png")}
                    style={{ width: 36, height: 36 }}
                    resizeMode="cover"
                    
                />
            </C.BackButton>

            <C.Title>
                Editar Tarefa
            </C.Title>
        </C.Container>
    )
}