import React from 'react';
import {
  SafeAreaView,
  SectionList,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_BROWSE } from '../../queries';
import Media from '../Media';

const Home = () => {
  const { loading, error, data } = useQuery(GET_BROWSE, {
    variables: {
      nextSeason: 'FALL',
      nextYear: 2019,
      thisSeason: 'SUMMER',
      thisYear: 2019,
      thisYearLike: '2019%',
      type: 'ANIME',
    },
  });
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error :(</Text>;
  console.log(data);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SectionList
          renderItem={({ item }) => <Media coverImage={item.coverImage.large} title={item.title.userPreferred} studio={item.studios.edges[0].node.name} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text>{title}</Text>
          )}
          sections={[
            { title: 'Popular This Season', data: data.Popular_This_Season.media },
            { title: 'Highly Anticipated Next Season', data: data.Highly_Anticipated_Next_Season.media },
            { title: 'Highest Rated All Time', data: data.Highest_Rated_All_Time.media },
            { title: 'All Time Popular', data: data.All_Time_Popular.media },
          ]}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
