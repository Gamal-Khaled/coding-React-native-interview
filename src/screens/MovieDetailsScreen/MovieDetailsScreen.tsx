import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import theme from '../../theme/theme';
import { Text } from '../../components';
import { spacing } from '../../types/spacing';
import { imageSizeLarge } from '../../constants/apis';
import { RootStackParamList } from '../../navigation/RootStackNavigator';
import NavigationRoutes from '../../navigation/NavigationRoutes';

type ScreenRoute = RouteProp<
  RootStackParamList,
  NavigationRoutes.MovieDetailsScreen
>;

const MovieDetailsScreen = () => {
  const { params } = useRoute<ScreenRoute>();
  const { movie } = params;

  const { goBack } = useNavigation();

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={goBack} style={styles.backButtonContainer}>
        <FastImage
          source={require('../../../assets/icons/left-arrow.png')}
          style={styles.backButton}
          tintColor={theme.font}
        />
      </TouchableOpacity>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.mainData}>
          <FastImage
            source={{
              uri:
                process.env.IMAGE_BASE_URL + imageSizeLarge + movie.poster_path,
            }}
            style={styles.poster}
          />
          <Text style={styles.movieTitle}>{movie.title ?? movie.name}</Text>
          <Text style={styles.vote}>{movie.vote_average * 10}%</Text>
        </View>

        <Text style={styles.title}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 100,
  },
  backButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing.base,
    marginBottom: 0,
  },
  backButton: {
    height: 20,
    width: 15,
  },
  mainData: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  poster: {
    height: 300,
    width: 230,
    borderRadius: spacing.base,
    marginVertical: spacing.base,
  },
  movieTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: spacing.base,
  },
  vote: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: spacing.small,
  },
  overview: {
    marginBottom: spacing.base,
  },
  credit: {
    alignItems: 'center',
    marginRight: spacing.base,
  },
});

export default MovieDetailsScreen;
