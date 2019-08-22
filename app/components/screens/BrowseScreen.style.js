import styled from 'styled-components/native';

export const MainView = styled.SafeAreaView`
    background-color: ${(p) => p.theme.color.background};
    height: 100%;
`;
export const MainViewCenter = styled(MainView)`
    flex: 1;
    justify-content: center;
`;
export const SectionList = styled.SectionList`
    padding: 0px 10px;
`;
export const SectionHeaderText = styled.Text`
    color: ${(p) => p.theme.color.text.main};
    font-size: 20px;
`;
export const SectionHeader = styled.View`
    padding: 10px 0px;
`;
export const ItemSeparator = styled.View`
    height: 10px;
`;
