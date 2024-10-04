import styled from "styled-components/native";

export const Container = styled.View`
    width: 90%;
    height: 550px;
    background-color: #5F5F5F;
    padding-right: 15px;
    padding-left: 15px;
    border-radius: 10px;

`

export const InputBox = styled.View` 
margin-bottom: 20px;
`

export const TextInp = styled.Text` 

  color: #fff;
  font-size: 18px;
  padding-left: 15px;

`
type Props = {
    height: number
}
export const Input = styled.TextInput<Props>`

  border: solid .5px #C1B7B7;
  height: ${(Props) => Props.height}px;
  border-radius: 20px;
  background-color: #A9A9A9; 
  justify-content: flex-start;
  align-items: start;
  padding: 10px;
  color: #fff;
  font-size: 16px;

`

export const Header = styled.View` 
  flex-direction: row;
  margin-bottom: 70px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`

export const ContainerEsc = styled.TouchableOpacity` 
  position: absolute;
  right: 0;
  margin-right: 5px;
`

export const Title = styled.Text` 
  color: #ffffff;
  font-size: 21px;
  font-weight: bold;
`

export const EditTask = styled.TouchableOpacity`
    position: absolute;
      bottom: 0;
      right: 0;
      margin: 15px;


`