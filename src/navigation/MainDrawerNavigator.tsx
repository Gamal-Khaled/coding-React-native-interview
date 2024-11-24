import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import TempScreen from '../screens/TempScreen';
import NavigationRoutes from './NavigationRoutes';

export type MainDrawerParamList = {
  [NavigationRoutes.HomeScreen]: { screens: string[] };
  [NavigationRoutes.MoviesScreen]: { screens: string[] };
};

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name={NavigationRoutes.HomeScreen}
          component={TempScreen}
          initialParams={{ screens: [NavigationRoutes.MoviesScreen] }}
        />
        <Drawer.Screen
          name={NavigationRoutes.MoviesScreen}
          component={TempScreen}
          initialParams={{ screens: [NavigationRoutes.HomeScreen] }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainDrawerNavigator;
