import React from 'react';
import {
  ScrollView, View, Text, StatusBar, ActivityIndicator,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_MEDIA } from '../../queries';

const MediaScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_MEDIA, {
    variables: {
      id: navigation.getParam('id'),
    },
  });
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error :(</Text>;

  console.log(data);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>{data.media.title.userPreferred}</Text>
        </ScrollView>
      </View>
    </>
  );
};

MediaScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
});

export default MediaScreen;
