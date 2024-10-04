import { Header } from '../../components/EditTask/Header';
import { Content } from '../../components/EditTask/Content';
import { View } from 'react-native';


export const EditTask = () => {


    return(
        <View style={[{backgroundColor: "#333"}, {height:"100%"}, {paddingTop: 30}]}>
            <Header/>
            <Content/>
        </View>
    )
}