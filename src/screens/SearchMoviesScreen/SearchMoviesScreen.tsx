import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Movie from '../../types/Movie';
import theme from '../../theme/theme';
import { spacing } from '../../types/spacing';
import { MovieCard, SearchBar, Text } from '../../components';
import useSearchMoviesQuery from '../../apis/useSearchMoviesQuery';

const SearchMoviesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, fetchNextPage, isLoading } = useSearchMoviesQuery(searchQuery);

  const renderMovie = useCallback(
    ({ item }: ListRenderItemInfo<Movie>) => (
      <MovieCard movie={item} style={styles.movie} />
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
    marginTop: spacing.big
  }
});

export default SearchMoviesScreen;
