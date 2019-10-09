import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MyTitle } from './Utils';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container} >
        <MyTitle title={'result'} />
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
