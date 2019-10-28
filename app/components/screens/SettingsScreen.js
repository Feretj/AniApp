import React from 'react';
import { ScrollView, Text, Picker } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_SETTINGS } from '../../queries';

const SettingsScreen = () => {
  const { data, client } = useQuery(GET_SETTINGS);
  return (
    <ScrollView>
      <Text>Title Language</Text>
      <Picker
        selectedValue={data.settings.titleLang}
        onValueChange={(value) => {
          client.writeData({ data: { settings: { __typename: 'Settings', titleLang: value } } });
        }}
      >
        <Picker.Item label="English (Attack on Titan)" value="english" />
        <Picker.Item label="Romaji (Shingeki no Kyojin)" value="romaji" />
        <Picker.Item label="Native (進撃の巨人)" value="native" />
      </Picker>
    </ScrollView>
  );
};

export default SettingsScreen;
