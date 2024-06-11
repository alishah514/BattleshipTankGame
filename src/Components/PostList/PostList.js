import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';

const PostList = ({posts, selectedPost, setSelectedPost, searchText}) => {
  const filteredPosts = posts.filter(post => {
    const lowercaseTitle = post.title.toLowerCase();
    const lowercaseSearchText = searchText.toLowerCase();
    return lowercaseTitle.includes(lowercaseSearchText);
  });

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => setSelectedPost(item)}>
      <View style={styles.title}>
        <Text>{item?.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filteredPosts}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default PostList;
