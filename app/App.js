import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { YellowBox } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ThemeProvider } from 'styled-components/native';
import BrowseScreen from './components/screens/BrowseScreen';
import MediaScreen from './components/screens/MediaScreen';
import theme from './theme.json';

YellowBox.ignoreWarnings(['Remote debugger']);

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
});

const iconNames = {
  Browse: 'list',
};

const BrowseStack = createStackNavigator({
  Browse: BrowseScreen,
  Media: MediaScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Browse: BrowseStack,
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
const App = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  </ThemeProvider>
);
export default App;
