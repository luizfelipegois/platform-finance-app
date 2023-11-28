import React, { useEffect, useState } from "react";
import { Container } from "./Styled";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { ScrollView, useWindowDimensions } from "react-native";
import { getNews } from '../../services/news';
import THEME from '../../theme';
import CardNews from "../../components/CardNews";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import { Center, NativeBaseProvider, Skeleton, VStack } from "native-base";

export default function News() {
  const layout = useWindowDimensions();
  const [investmentsNews, setInvestmentsNews] = useState([]);
  const [technologyNews, setTechnologyNews] = useState([]);
  const [economyNews, setEconomyNews] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'investiments', title: 'Investimentos' },
    { key: 'technology', title: 'Tecnologia' },
    { key: 'economy', title: 'Economia' },
  ]);

  const investimentsRoute = () => (
    <Container>
      {
        investmentsNews.length !== 0 ? (
          <ScrollView>
            {
              investmentsNews.filter(({title}) => title !== "[Removed]")
                .map(({title, urlToImage, url}) => <CardNews key={uuidv4()} image={urlToImage} title={title} url={url}/>)
            }
          </ScrollView>
        ) : (
          <NativeBaseProvider>
            <Center w="100%">
              <VStack w="100%" space={3} overflow="hidden" rounded="md" marginTop="0px">
                <Skeleton h="250" startColor={THEME.COLORS.CARDS} />
                <Skeleton h="250" startColor={THEME.COLORS.CARDS} />
                <Skeleton h="250" startColor={THEME.COLORS.CARDS} />
              </VStack>
            </Center>
          </NativeBaseProvider>
        )
      }
    </Container>
  );
  
  const technologyRoute = () => (
    <Container>
      <ScrollView>
      {
        technologyNews.length !== 0 ? (
          <ScrollView>
            {
              technologyNews.filter(({title}) => title !== "[Removed]")
                .map(({title, urlToImage, url}) => <CardNews key={uuidv4()} image={urlToImage} title={title} url={url}/>)
            }
          </ScrollView>
        ) : (
          <NativeBaseProvider>
            <Center w="100%">
              <VStack w="100%" space={3} overflow="hidden" rounded="md" marginTop="0px">
                <Skeleton h="250" startColor={THEME.COLORS.CARDS} />
                <Skeleton h="250" startColor={THEME.COLORS.CARDS} />
                <Skeleton h="250" startColor={THEME.COLORS.CARDS} />
              </VStack>
            </Center>
          </NativeBaseProvider>
        )
      }
      </ScrollView>
    </Container>
  );

  const economyRoute = () => (
    <Container>
     <ScrollView>
     {
        economyNews.length !== 0 ? (
          <ScrollView>
            {
              economyNews.filter(({title}) => title !== "[Removed]")
                .map(({title, urlToImage, url}) => <CardNews key={uuidv4()} image={urlToImage} title={title} url={url}/>)
            }
          </ScrollView>
        ) : (
          <NativeBaseProvider>
            <Center w="100%">
              <VStack w="100%" space={3} overflow="hidden" rounded="md" marginTop="0px">
                <Skeleton h="250" startColor={THEME.COLORS.CARDS} />
                <Skeleton h="250" startColor={THEME.COLORS.CARDS} />
                <Skeleton h="250" startColor={THEME.COLORS.CARDS} />
              </VStack>
            </Center>
          </NativeBaseProvider>
        )
      }
      </ScrollView>
    </Container>
  );

  const renderScene = SceneMap({
    investiments: investimentsRoute,
    technology: technologyRoute,
    economy: economyRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: THEME.COLORS.SECUNDARY }}
      style={{ backgroundColor: THEME.COLORS.BACKGROUND }}
      labelStyle={{color: THEME.COLORS.TEXT, fontSize: 12}}
    />
  );

  async function getNewsData() {
    const responseInvestiments = await getNews("investimentos", 30);
    const responseTechnology = await getNews("empresas de tecnologia", 30);
    const responseEconomy = await getNews("economia global", 30);

    if (responseInvestiments) {
      setInvestmentsNews(responseInvestiments);
    }

    if (responseTechnology) {
      setTechnologyNews(responseTechnology);
    }

    if (responseEconomy) {
      setEconomyNews(responseEconomy);
    }
  }

  useEffect(() => {
    getNewsData();
  }, [])

  return (
    // <TabView
    //   navigationState={{ index, routes }}
    //   renderScene={renderScene}
    //   onIndexChange={setIndex}
    //   initialLayout={{ width: layout.width }}
    //   renderTabBar={renderTabBar}
    // />
    <Container></Container>
  )
}