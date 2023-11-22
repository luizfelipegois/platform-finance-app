import React, { useContext, useState } from "react";
import { Container } from "./Styled";
import { RefreshControl, ScrollView } from "react-native";
import { Context } from '../../context';

export default function Home() {
  const { loading, getUserData } = useContext(Context);

  return (
    <Container>
     <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => getUserData()} tintColor="#f2f2f2" colors="#f2f2f2" />
      }
     >

     </ScrollView>
    </Container>
  )
}