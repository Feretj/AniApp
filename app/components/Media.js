import React from 'react';
import {
  MediaConteiner, Cover, Title, Studio, CoverInfo,
} from './Media.style';


const Media = ({ coverImage, title, studio }) => (
  <MediaConteiner>
    <Cover source={{ uri: coverImage }}>
      <CoverInfo>
        <Title>{title}</Title>
        <Studio>{studio}</Studio>
      </CoverInfo>
    </Cover>
  </MediaConteiner>
);

export default Media;
