import React from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import styles from './styles';

const TaskList = ({tasks, deleteTask}) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({item, index}) => (
        <View style={styles.itemName}>
          <Text>{item}</Text>
          <Button title="Delete" onPress={() => deleteTask(index)} />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default TaskList;
