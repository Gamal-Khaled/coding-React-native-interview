import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import Movie from '../../types/Movie';
import theme from '../../theme/theme';
import { spacing } from '../../types/spacing';
import { MovieCard, SearchBar, Text } from '../../components';
import NavigationRoutes from '../../navigation/NavigationRoutes';
import useSearchMoviesQuery from '../../apis/useSearchMoviesQuery';
import { RootStackParamList } from '../../navigation/RootStackNavigator';

type ScreenNavigation = NavigationProp<
  RootStackParamList,
  NavigationRoutes.MainTabNavigator
>;

const SearchMoviesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, fetchNextPage, isLoading } = useSearchMoviesQuery(searchQuery);
  const { navigate } = useNavigation<ScreenNavigation>();

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
      <SearchBar onSearch={setSearchQuery} />
      <FlatList
        data={data.pages}
        renderItem={renderMovie}
        onEndReached={fetchMore}
        keyExtractor={(_, i) => String(i)}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>Enter movie name to search</Text>
        }
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
  emptyMessage: {
    textAlign: 'center',
    marginTop: spacing.big,
  },
});

export default SearchMoviesScreen;
