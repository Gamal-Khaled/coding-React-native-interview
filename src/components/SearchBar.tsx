import React, { useCallback, useRef } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
} from 'react-native';

import theme from '../theme/theme';
import { spacing } from '../types/spacing';

interface Props {
  onSearch: (value: string) => void;
}

const SearchBarComponent = ({ onSearch }: Props) => {
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleChangeText = useCallback((value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  }, []);

  const handleSubmit = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      onSearch(e.nativeEvent.text);
    },
    [],
  );

  return (
    <TextInput
      testID="searchBar"
      style={styles.search}
      placeholder="Enter movie title"
      placeholderTextColor={theme.border}
      returnKeyType="search"
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmit}
    />
  );
};

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 30,
    marginBottom: spacing.base,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.small,
    color: theme.font,
  },
});

const SearchBar = React.memo(SearchBarComponent);
export default SearchBar;
