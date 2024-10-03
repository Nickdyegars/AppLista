import styled from "styled-components/native";


export const Container = styled.View`
  padding: 0 10px;
  margin-top: 30px;
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
  background-color: #5F5F5F; 
  justify-content: flex-start;
  align-items: start;
  padding: 10px;
  color: #fff;
  font-size: 16px;

`

export const InputDate = styled.TouchableOpacity`

  border: solid .5px #C1B7B7;
  height: 56px;
  border-radius: 20px;
  background-color: #5F5F5F; 
  justify-content: center;
  align-items: start;
  padding: 10px;
`

export const ButtonTask = styled.TouchableOpacity`
  margin-top: 20px;
  justify-content:center;
  align-items: center;
  height: 60px;
  background-color: #3E16FA;
  border-radius: 40px;

`