import React from 'react'
import { Container, Image, Title, Button, Text } from './Styled';
import { Feather } from '@expo/vector-icons';
import { Linking } from 'react-native';

export default function CardNews({image, title, url}) {
  return (
    <Container>
       <Image
        source={{
          url: `${image}`,
        }}
      />
      <Title>{title}</Title>
      <Button
        onPress={() => {
          Linking.openURL(url);
        }}
      >
        <Text>Ler mais</Text>
        <Feather name="chevron-right" size={22} color="#57B8FF"/>
      </Button>
    </Container>
  )
}
