import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Text from './Text/Text';
import Movie from '../types/Movie';
import theme from '../theme/theme';
import { spacing } from '../types/spacing';
import { imageSizeSmall } from '../constants/apis';

interface Props {
  movie: Movie;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const MovieCard = ({ movie, onPress, style }: Props) => {
  const [loadingImage, setLoadingImage] = useState(true);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <FastImage
        source={{
          uri: process.env.IMAGE_BASE_URL + imageSizeSmall + movie.poster_path,
        }}
        style={styles.thumbnail}
        onLoadEnd={() => setLoadingImage(false)}>
        {loadingImage && (
          <ActivityIndicator color={theme.font} style={styles.imageLoading} />
        )}
      </FastImage>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{movie.title ?? movie.name}</Text>
          <Text style={styles.date}>
            {movie.release_date ?? movie.first_air_date}
          </Text>
        </View>
        <Text style={styles.average}>
          {(movie.vote_average * 10).toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: theme.primary,
    borderWidth: 2,
    borderRadius: 26,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    backgroundColor: theme.card,
  },
  thumbnail: {
    height: 200,
    width: 125,
    borderRadius: 10,
    marginRight: spacing.small,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  date: {
    fontSize: 16,
    marginVertical: spacing.base,
  },
  average: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'right',
  },
  genres: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  genre: {
    padding: spacing.small,
    marginRight: spacing.small,
    marginBottom: spacing.small,
    backgroundColor: theme.primary,
    borderRadius: 20,
  },
  imageLoading: {
    zIndex: -1,
  },
});

export default MovieCard;
