import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import { YellowBox } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import Home from './components/screens/Home';
import Search from './components/screens/Search';
import Browse from './components/screens/Browse';
import theme from './theme.json';

YellowBox.ignoreWarnings(['Remote debugger']);

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
});

const iconNames = {
  Home: 'home',
  Search: 'search',
  Browse: 'list',
};

const TabNavigator = createBottomTabNavigator({
  Browse,
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
});

const AppContainer = createAppContainer(TabNavigator);
const App = () => <ThemeProvider theme={theme}><ApolloProvider client={client}><AppContainer /></ApolloProvider></ThemeProvider>;
export default App;
