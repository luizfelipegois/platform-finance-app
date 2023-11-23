import React, { useContext } from "react";
import { Center, NativeBaseProvider, Skeleton, Switch, VStack } from "native-base";
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { Context } from '../../context';
import { Username, Email, UserContainerInformation, List, ListItem, Text } from './Styled';
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { signOut, user, loading } = useContext(Context);
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
      icon: 'phone',
      text: 'Alterar Phone',
      onPress: () => navigation.navigate("Alterar Phone")
    },
    {
      id: 6,
      icon: 'log-out',
      text: 'Encerrar Sessão',
      onPress: signOut
    }
  ]

  return (
    <NativeBaseProvider>
      <Center bg={THEME.COLORS.BACKGROUND} flex={1} alignItems="center" justifyContent="start">
        {
          loading ? (
            <Center w="100%">
              <VStack w="80%" space={3} overflow="hidden" rounded="md" marginTop="50px">
                <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
                <Skeleton m="auto" w="50%" h="5" startColor={THEME.COLORS.CARDS} />
              </VStack>
            </Center>
          ) : (
            <UserContainerInformation>
              <Username>{user.name}</Username>
              <Email>{user.email}</Email>
            </UserContainerInformation>
          )
        }
        <List>
          {
            datas.map(({id, icon, text, onPress}) => (
              <ListItem key={id} onPress={onPress}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Feather name={icon} size={22} color={id === 6 ? THEME.COLORS.ALERT : "#f2f2f2"} />
                  <Text style={{color: id === 6 ? THEME.COLORS.ALERT : "#f2f2f2"}}>{text}</Text>
                </View>
                {
                  id === 1 && <Switch size="sm" />
                }
                {
                  (id !== 6 && id !== 1) && <Feather name="chevron-right" size={22} color="white"/>
                }
              </ListItem>
            ))
          }
        </List>
      </Center>
    </NativeBaseProvider>
  )
}