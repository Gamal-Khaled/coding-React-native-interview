import React from 'react';
import { View, Text } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { MainDrawerParamList } from '../navigation/MainDrawerNavigator';
import NavigationRoutes from '../navigation/NavigationRoutes';

export default () => {
  const { navigate } =
    useNavigation<DrawerNavigationProp<MainDrawerParamList>>();
  const { params } =
    useRoute<RouteProp<MainDrawerParamList, NavigationRoutes.HomeScreen>>();

  const navigateToScreen = (screen: string) => () => navigate(screen);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {params.screens.map(screen => (
        <Text
          key={screen}
          testID="navigationOption"
          onPress={navigateToScreen(screen)}
          style={{ marginBottom: 16, textAlign: 'center' }}>
          Go To {screen}
        </Text>
      ))}
    </View>
  );
};
