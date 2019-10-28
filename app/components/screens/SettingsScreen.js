import React from 'react';
import { ScrollView, Text, Picker, Linking, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_SETTINGS } from '../../queries';

const oauthUrl = 'https://anilist.co/api/v2/oauth/authorize?client_id=2757&response_type=token';

const SettingsScreen = () => {
  const { data, client } = useQuery(GET_SETTINGS);
  React.useEffect(() => {
    const urlListener = (url) => {
      console.log(url);
    };
    Linking.addEventListener('url', urlListener);
    return () => {
      Linking.removeEventListener('url', urlListener);
    };
  }, []);
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
      <Button
        onPress={() => {
          Linking.openURL(oauthUrl);
        }}
        title="Login with Anilist"
      />
    </ScrollView>
  );
};

export default SettingsScreen;
