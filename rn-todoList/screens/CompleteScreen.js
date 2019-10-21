import React from 'react';
import {
  Text, View, Alert, StyleSheet, TouchableOpacity, TextInput,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import { TODOS } from '../utils/data.js';

const TodoItem = props => {
  const { idx, todo, onToggleTodo, onLongPress } = props;
  const statusStyle = {
    backgroundColor: todo.status === 'Done' ? 'blue' : 'green'
  };
  return (
    <TouchableOpacity
      onLongPress={() => onLongPress(todo)}
      onPress={() => onToggleTodo(todo.id)}
      style={[styles.todoItem, statusStyle]}>
      <Text style={styles.todoText}>
        {idx + 1}: {todo.body}
      </Text>
    </TouchableOpacity>
  );
};

export default class CompleteScreen extends React.Component {
  constructor(props) {
    super(props);
    let list = TODOS.filter(item => item.status == 'Done');
    this.state = {
      todoList: list,
      todoBody: ''
    }
  }
  onSubmitTodo = () => {
    const { todoList, todoBody } = this.state;
    const newTodo = {
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1
    };
    const newTodoList = [...todoList, newTodo];
    this.setState({
      todoList: newTodoList,
      todoBody: ''
    });

  };

  onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };

  onToggleTodo = id => {
    const { todoList } = this.state;
    const todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    const newTodoList = [
      ...todoList
    ];
    this.setState({ todoList: newTodoList });
    setTimeout(() => {
      this.props.navigation.navigate('SingleTodo', {
        updatedTodo: todo
      });
    }, 1000);
  };

  onDeleteTodo = id => {
    const { todoList } = this.state;
    const newTodoList = todoList.filter(todo => todo.id !== id);
    this.setState({ todoList: newTodoList });
  };

  render() {

    const { todoList, todoBody } = this.state;
    return (
      <ImageBackground
        style={styles.scrollView}
        resizeMethod={"auto"}
        source={require('../assets/images/iphone11.png')}>
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          style={styles.scrollView}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>

              {todoList.map((todo, idx) => {
                return (
                  <TodoItem
                    key={idx}
                    idx={idx}
                    todo={todo}
                    onLongPress={this.onLongPress}
                    onToggleTodo={this.onToggleTodo}
                  />
                );
              })}
              <View style={styles.inputContainer}>
                <TextInput
                  value={todoBody}
                  style={styles.todoInput}
                  onChangeText={text => this.setState({ todoBody: text })}
                />
                <TouchableOpacity style={styles.button}
                  onPress={this.onSubmitTodo}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

CompleteScreen.navigationOptions = {
  title: 'Complete'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  todoInput: {
    width: '95%',
    minHeight: 30,
    color: 'white',
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginTop: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  scrollView: {
    flex: 1,
  }
});