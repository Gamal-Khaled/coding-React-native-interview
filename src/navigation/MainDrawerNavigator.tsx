import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import theme from '../theme/theme';
import TempScreen from '../screens/TempScreen';
import NavigationRoutes from './NavigationRoutes';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

export type MainDrawerParamList = {
  [NavigationRoutes.HomeScreen]: { screens: string[] };
  [NavigationRoutes.MoviesScreen]: { screens: string[] };
};

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: theme.font,
          drawerStyle: styles.drawerStyle,
          drawerLabelStyle: styles.drawerLabel,
        }}>
        <Drawer.Screen
          name={NavigationRoutes.HomeScreen}
          component={HomeScreen}
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.background,
    shadowColor: theme.border,
  },
  headerTitle: {
    color: theme.font,
  },
  drawerStyle: {
    backgroundColor: theme.background,
  },
  drawerLabel: {
    color: theme.font,
  },
});

export default MainDrawerNavigator;
