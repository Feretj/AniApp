import styled from 'styled-components/native';

export const MediaConteiner = styled.View`
    border-radius: 5px;
    flex-direction: row;
    height: 200px;
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(49,54,68,.09);
    elevation: 2;
`;

export const Cover = styled.ImageBackground`
    height: 200px;
    width: 130px;
    justify-content: flex-end;
`;

export const Title = styled.Text`
    color: ${(p) => p.theme.color.text.bright};
`;

export const Studio = styled.Text`
    color: ${(p) => p.theme.color.text.blue};
`;

export const CoverInfo = styled.View`
    background-color: ${(p) => p.theme.color.overlay};
    padding: 10px;
`;

export const Info = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.color.foreground.main};
`;

export const InfoTime = styled.View`
    align-items: center;
    background-color: ${(p) => p.theme.color.foreground.blueDark};
    padding: 5px;
`;

export const Extra = styled.View`
    flex-direction: row;
    justify-content: space-around;
    background-color: ${(p) => p.theme.color.background};
    padding: 5px;
`;

export const ExtraText = styled.Text`
    color: ${(p) => p.theme.color.text.light};
    text-align: center;
`;

export const InfoTimeText = styled.Text`
    color: ${(p) => p.theme.color.blue};
`;

export const DescriptionText = styled.Text`
    color: ${(p) => p.theme.color.text.light};
`;

export const Description = styled.ScrollView`
    padding: 10px;
`;
