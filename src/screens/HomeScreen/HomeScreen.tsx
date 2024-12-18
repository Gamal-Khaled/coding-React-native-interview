import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import Movie from '../../types/Movie';
import theme from '../../theme/theme';
import { spacing } from '../../types/spacing';
import { MovieCard, Text } from '../../components';
import useTrendingQuery from '../../apis/useTrendingQuery';
import NavigationRoutes from '../../navigation/NavigationRoutes';
import { RootStackParamList } from '../../navigation/RootStackNavigator';

type ScreenNavigation = NavigationProp<
  RootStackParamList,
  NavigationRoutes.MainTabNavigator
>;

const HomeScreen = () => {
  const { navigate } = useNavigation<ScreenNavigation>();
  const { data, fetchNextPage, isLoading } = useTrendingQuery();

  const renderMovie = useCallback(
    ({ item }: ListRenderItemInfo<Movie>) => (
      <MovieCard
        movie={item}
        style={styles.movie}
        onPress={() =>
          navigate(NavigationRoutes.MovieDetailsScreen, { movie: item })
        }
      />
    ),
    [],
  );

  const fetchMore = useCallback(() => {
    if (!isLoading) {
      fetchNextPage();
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="title" style={styles.title}>
        Trending this week
      </Text>
      <FlatList
        data={data.pages}
        renderItem={renderMovie}
        onEndReached={fetchMore}
        keyExtractor={(_, i) => String(i)}
        ListFooterComponent={<ActivityIndicator />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.base,
    paddingBottom: 0,
    backgroundColor: theme.background,
  },
  title: {
    marginBottom: spacing.base,
  },
  movie: {
    marginBottom: spacing.base,
  },
});

export default HomeScreen;
