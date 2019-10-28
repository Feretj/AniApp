import gql from 'graphql-tag';

export const typeDefs = gql`
  type Settings {
    titleLang: String
  }

  extend type Query {
    settings: Settings
  }
`;

export const resolvers = {};
