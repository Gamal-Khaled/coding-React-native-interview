import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import theme from '../theme/theme';
import NavigationRoutes from './NavigationRoutes';
import { HomeScreen, SearchMoviesScreen } from '../screens';

export type MainDrawerParamList = {
  [NavigationRoutes.HomeScreen]: undefined;
  [NavigationRoutes.SearchMoviesScreen]: undefined;
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
          options={{ title: 'Home' }}
        />
        <Drawer.Screen
          name={NavigationRoutes.SearchMoviesScreen}
          component={SearchMoviesScreen}
          options={{ title: 'Search Movies' }}
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
