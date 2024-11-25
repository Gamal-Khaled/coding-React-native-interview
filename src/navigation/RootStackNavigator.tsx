import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MainDrawerNavigator from './MainDrawerNavigator';
import NavigationRoutes from './NavigationRoutes';
import { MovieDetailsScreen } from '../screens';
import Movie from '../types/Movie';

export type RootStackParamList = {
  [NavigationRoutes.MainTabNavigator]: undefined;
  [NavigationRoutes.MovieDetailsScreen]: {
    movie: Movie;
  };
};

const Stack = createStackNavigator();

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={NavigationRoutes.MainTabNavigator}
          component={MainDrawerNavigator}
        />
        <Stack.Screen
          name={NavigationRoutes.MovieDetailsScreen}
          component={MovieDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
