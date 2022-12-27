import { useState } from 'react';
import {
  FlatList, StyleSheet, Pressable, View,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';

import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export function RepositoryListContainer({ onEndReach, repositories, header }) {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const openRepository = (item) => {
    navigate(`/repositories/${item.id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <Pressable onPress={() => openRepository(item)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(i) => i.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={header}
      style={styles.list}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
}

const availableOrderings = {
  LATEST_REPOSITORIES: {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  HIGHEST_RATED_REPOSITORIES: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  LOWEST_RATED_REPOSITORIES: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

function SortPicker({
  sortMode, setSortMode, searchKeyword, setSearchKeyword,
}) {
  return (
    <>
      <TextInput value={searchKeyword} onChangeText={(text) => setSearchKeyword(text)} placeholder="Search Keyword" />

      <Picker
        style={styles.picker}
        selectedValue={sortMode}
        onValueChange={(val) => setSortMode(val)}
      >
        <Picker.Item label="Latest Repositories" value="LATEST_REPOSITORIES" />
        <Picker.Item label="Highest Rated Repositories" value="HIGHEST_RATED_REPOSITORIES" />
        <Picker.Item label="Lowest Rated Repositories" value="LOWEST_RATED_REPOSITORIES" />
      </Picker>
    </>
  );
}

function RepositoryList() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);
  const [sortMode, setSortMode] = useState('LATEST_REPOSITORIES');

  const { repositories, fetchMore } = useRepositories({
    searchKeyword: debouncedKeyword,
    first: 10,
    ...availableOrderings[sortMode],
  });

  const onEndReach = () => {
    console.log('End reached!');
    fetchMore();
  };

  return (
    <View style={styles.container}>
      <RepositoryListContainer
        repositories={repositories}
        onEndReach={onEndReach}
        header={(
          <SortPicker
            sortMode={sortMode}
            setSortMode={setSortMode}
            searchInput={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        )}
      />
    </View>
  );
}

export default RepositoryList;
