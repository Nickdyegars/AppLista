import { Header } from '../../components/taskScreens/Header';
import { Content } from '../../components/taskScreens/Content';
import { StyleSheet, Text, View } from 'react-native';


export const NewTask = () => {


    return(
        <View style={[{backgroundColor: "#333"}, {height:"100%"}, {paddingTop: 30}]}>
            <Header/>
            <Content/>
        </View>
    )
}