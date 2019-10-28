import { ApolloProvider } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import { ActivityIndicator, YellowBox } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ThemeProvider } from 'styled-components/native';
import BrowseScreen from './components/screens/BrowseScreen';
import MediaScreen from './components/screens/MediaScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import { resolvers, typeDefs } from './resolvers';
import theme from './theme.json';

YellowBox.ignoreWarnings(['Remote debugger']);

const iconNames = {
  Browse: 'list',
  Settings: 'settings',
};

const BrowseStack = createStackNavigator({
  Browse: BrowseScreen,
  Media: MediaScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Browse: BrowseStack,
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        return <Icon name={`ios-${iconNames[routeName]}`} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: theme.color.text.blue,
      inactiveTintColor: theme.color.text.main,
    },
  },
);

const AppContainer = createAppContainer(TabNavigator);
const App = () => {
  const [client, setClient] = React.useState(null);
  React.useEffect(() => {
    const cache = new InMemoryCache();
    const link = ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
          });
        }
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new HttpLink({
        uri: 'https://graphql.anilist.co',
      }),
    ]);

    cache.writeData({
      data: {
        settings: {
          __typename: 'Settings',
          titleLang: 'english',
        },
      },
    });

    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => {
      setClient(
        new ApolloClient({
          link,
          cache,
          typeDefs,
          resolvers,
        }),
      );
    });
  }, []);

  if (!client) {
    return <ActivityIndicator color={theme.color.text.blue} size={40} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    </ThemeProvider>
  );
};
export default App;
