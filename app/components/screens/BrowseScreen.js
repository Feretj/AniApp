import React from 'react';
import { Text, StatusBar, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { ThemeContext } from 'styled-components/native';
import { GET_BROWSE } from '../../queries';
import Media from '../Media';
import {
  SectionHeaderText,
  SectionList,
  ItemSeparator,
  SectionHeader,
  MainView,
  MainViewCenter,
} from './BrowseScreen.style';

const BrowseScreen = () => {
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
  if (loading) {
    return (
      <MainViewCenter>
        <ThemeContext.Consumer>
          {(theme) => <ActivityIndicator color={theme.color.text.blue} size={40} />}
        </ThemeContext.Consumer>
      </MainViewCenter>
    );
  }
  if (error) return <Text>Error :(</Text>;
  console.log(data);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainView>
        <SectionList
          renderItem={({ item }) => <Media item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <SectionHeader>
              <SectionHeaderText>{title}</SectionHeaderText>
            </SectionHeader>
          )}
          sections={[
            { title: 'Popular This Season', data: data.Popular_This_Season.media },
            {
              title: 'Highly Anticipated Next Season',
              data: data.Highly_Anticipated_Next_Season.media,
            },
            { title: 'Highest Rated All Time', data: data.Highest_Rated_All_Time.media },
            { title: 'All Time Popular', data: data.All_Time_Popular.media },
          ]}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={ItemSeparator}
        />
      </MainView>
    </>
  );
};

BrowseScreen.navigationOptions = {
  header: null,
};

export default BrowseScreen;
