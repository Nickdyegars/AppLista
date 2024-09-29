import {Container, CardTitle, ContainerRetangle} from './styles';
import React, { useState } from 'react';
type Props = {
  onPress: () => void;
  // onChangeFilter: (text: string) => void;
  // value: string;
}

export function ButtonFilter({onPress}: Props) {

  const [cardColors, setCardColors] = useState(['#00000080', '#00000080', '#00000080']); // Cores iniciais em hexadecimal
  const cardNames = ['Etiquetas', 'Lista', 'Calendário']; // Nomes dos cards

  const changeColor = (index) => {
    setCardColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = newColors[index] === '#00000080' ? '#FA9216' : '#00000080'; // Alterna entre as cores
      return newColors;
    });
  };
  return (
    <Container>
      {cardNames.map((name, index) => (
        <ContainerRetangle key={index} bgColor={cardColors[index]} onTouchStart={() => changeColor(index)}>
          <CardTitle>{name}</CardTitle>
        </ContainerRetangle>
      ))}
    </Container>
    // <Container>
    //   <CardTitle>{title}</CardTitle>
    //   <CardValue style={color ? {color: color}: {}}>{num}</CardValue>
    // </Container>
  );
}