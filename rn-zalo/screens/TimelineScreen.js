import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class TimelineScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Timeline Screen
        </Text>
      </View>
    );
  }

}

TimelineScreen.navigationOptions = {
  title: 'Timeline'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
