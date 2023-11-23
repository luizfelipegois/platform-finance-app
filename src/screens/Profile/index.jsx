import React, { useContext } from "react";
import { Center, NativeBaseProvider, Switch } from "native-base";
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { Context } from '../../context';
import { Username, Email, UserContainerInformation, List, ListItem, Text } from './Styled';
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { signOut, user } = useContext(Context);
  const navigation = useNavigation();
  const datas = [
    {
      id: 1,
      icon: 'key',
      text: 'Desbloquear com senha'
    },
    {
      id: 2,
      icon: 'dollar-sign',
      text: 'Minhas Solicitações',
      onPress: () => navigation.navigate("Minhas Solicitações")
    },
    {
      id: 3,
      icon: 'at-sign',
      text: 'Alterar Email',
      onPress: () => navigation.navigate("Alterar Email")
    },
    {
      id: 4,
      icon: 'lock',
      text: 'Alterar Senha',
      onPress: () => navigation.navigate("Alterar Senha")
    },
    {
      id: 5,
      icon: 'log-out',
      text: 'Encerrar Sessão',
      onPress: signOut
    }
  ]

  return (
    <NativeBaseProvider>
      <Center bg={THEME.COLORS.BACKGROUND} flex={1} alignItems="center" justifyContent="start">
        <UserContainerInformation>
          <Username>{user.name}</Username>
          <Email>{user.email}</Email>
        </UserContainerInformation>
        <List>
          {
            datas.map(({id, icon, text, onPress}) => (
              <ListItem key={id} onPress={onPress}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Feather name={icon} size={22} color={id === 5 ? THEME.COLORS.ALERT : "#f2f2f2"} />
                  <Text style={{color: id === 5 ? THEME.COLORS.ALERT : "#f2f2f2"}}>{text}</Text>
                </View>
                {
                  id === 1 && <Switch size="sm" defaultIsChecked={true} />
                }
                {
                  (id !== 5 && id !== 1) && <Feather name="chevron-right" size={22} color="white"/>
                }
              </ListItem>
            ))
          }
        </List>
      </Center>
    </NativeBaseProvider>
  )
}