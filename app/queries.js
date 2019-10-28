import gql from 'graphql-tag';

const fragments = {
  media: gql`
    fragment media on Media {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large: extraLarge
        color
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      description
      type
      format
      status
      genres
      isAdult
      averageScore
      popularity
      mediaListEntry {
        status
      }
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
          }
        }
      }
    }
  `,
};

export const GET_GENRES_AND_TAGS = gql`
  query genresAndTags {
    genres: GenreCollection
    tags: MediaTagCollection {
      name
      description
      category
      isAdult
    }
  }
`;

export const GET_BROWSE = gql`
  query getBrowse($thisSeason: MediaSeason, $thisYear: Int, $nextSeason: MediaSeason, $nextYear: Int) {
    Popular_This_Season: Page(page: 1, perPage: 4) {
      media(
        season: $thisSeason
        seasonYear: $thisYear
        status: RELEASING
        sort: POPULARITY_DESC
        type: ANIME
        isAdult: false
      ) {
        ...media
      }
    }
    Highly_Anticipated_Next_Season: Page(page: 1, perPage: 4) {
      media(season: $nextSeason, seasonYear: $nextYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    Highest_Rated_All_Time: Page(page: 1, perPage: 4) {
      media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    All_Time_Popular: Page(page: 1, perPage: 4) {
      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
  }

  ${fragments.media}
`;

export const GET_MEDIA = gql`
  query getMedia($id: Int) {
    media: Media(id: $id) {
      ...media
    }
  }

  ${fragments.media}
`;

export const GET_SETTINGS = gql`
  {
    settings @client {
      titleLang
    }
  }
`;
