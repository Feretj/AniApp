import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
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
    <View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>{data.media.title.english}</Text>
      </ScrollView>
    </View>
  );
};

MediaScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
});

export default MediaScreen;
