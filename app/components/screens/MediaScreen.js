import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_MEDIA } from '../../queries';

const MediaScreen = ({ route }) => {
  const { loading, error, data } = useQuery(GET_MEDIA, {
    variables: {
      id: route.params.id,
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

export default MediaScreen;
