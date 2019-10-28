import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import { withNavigation } from 'react-navigation';
import { useQuery } from '@apollo/react-hooks';
import {
  MediaConteiner,
  Cover,
  Title,
  Studio,
  CoverInfo,
  DescriptionText,
  Description,
  Info,
  InfoTime,
  InfoTimeText,
  Extra,
  ExtraText,
} from './Media.style';
import { GET_SETTINGS } from '../queries';

const Media = ({ item, navigation }) => {
  const { data } = useQuery(GET_SETTINGS);
  const timeUntilAiring = item.nextAiringEpisode && moment.duration(item.nextAiringEpisode.timeUntilAiring, 'seconds');
  return (
    <MediaConteiner
      onPress={() => navigation.navigate('Media', { title: item.title[data.settings.titleLang], id: item.id })}
    >
      <Cover source={{ uri: item.coverImage.large }}>
        <CoverInfo>
          <Title>{item.title[data.settings.titleLang]}</Title>
          <Studio>{item.studios.edges[0].node.name}</Studio>
        </CoverInfo>
      </Cover>
      <Info>
        <InfoTime>
          <InfoTimeText>
            {timeUntilAiring
              ? `Ep ${
                item.nextAiringEpisode.episode
              } - ${timeUntilAiring.days()}d ${timeUntilAiring.hours()}h ${timeUntilAiring.minutes()}m`
              : `${item.season} ${item.startDate.year}`}
          </InfoTimeText>
        </InfoTime>
        <Extra>
          <ExtraText>{item.format}</ExtraText>
          {item.averageScore && <ExtraText>{item.averageScore}</ExtraText>}
        </Extra>
        <Description>
          <TouchableWithoutFeedback>
            <HTMLView
              value={item.description}
              TextComponent={({ children }) => <DescriptionText>{children}</DescriptionText>}
            />
          </TouchableWithoutFeedback>
        </Description>
        <Extra>
          <ExtraText>{item.genres.join(', ')}</ExtraText>
        </Extra>
      </Info>
    </MediaConteiner>
  );
};

export default withNavigation(Media);
