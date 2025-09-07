import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addTodo, deleteTodo, Todo } from '../redux/TodoSlice';

const TodoScreen = () => {
  const [text, setText] = useState<string>('');
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos);

  const renderItem = ({ item }: { item: Todo }) => {
    return (
      <View style={styles.todoItem}>
        <Text style={styles.todoText}>{item.title}</Text>
        <TouchableOpacity
          onPress={() => dispatch(deleteTodo(item.id))}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo App</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter a task"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => {
            if (text.trim()) {
              dispatch(addTodo(text));
              setText('');
            }
          }}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '72%',
    paddingHorizontal: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#005AAA',
    borderRadius: 5,
    width: '25%',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: '#fbc903ff',
    padding: 10,
    borderRadius: 5,
  },
  todoText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#fb2121ff',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});
