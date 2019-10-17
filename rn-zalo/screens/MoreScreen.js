import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class MoreScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          More Screen
        </Text>
      </View>
    );
  }

}

MoreScreen.navigationOptions = {
  title: 'More'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
