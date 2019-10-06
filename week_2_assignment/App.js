import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
const { width } = Dimensions.get('window');
import Constants from 'expo-constants';
// You can import from local files
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

const imgData = [
  { id: 1, imgSource: require('./assets/1.jpg') },
  { id: 2, imgSource: require('./assets/2.jpg') },
  { id: 3, imgSource: require('./assets/3.jpg') },
  { id: 4, imgSource: require('./assets/4.jpg') },
  { id: 5, imgSource: require('./assets/5.jpg') },
  { id: 6, imgSource: require('./assets/6.jpg') },
];

export default class App extends React.Component {

  _onBack = () => {
    alert('Back');
  }
  _onMore = () => {
    alert('More');
  }
  _onFollow = () => {
    alert('Follow');
  }
  _onSend = () => {
    alert('Send');
  }

  _keyExtractor = item => item.id;
  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <Image
          style={{
            width: width / 2 - 20,
            height: width / 2 - 20,
            borderRadius: 10,
            margin: 5,
          }}
          source={item.imgSource}
          resizeMethod={'auto'}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.viewHeader}>
          <TouchableOpacity onPress={this._onBack}>
            <Ionicons name="md-arrow-round-back" size={24} color="#6A779F" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onMore}>
            <AntDesign name="appstore1" size={24} color="#6A779F" />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Image
            source={require('./assets/avatar.jpg')}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: '#0F1E3E' }}>
              {'Hoàng Yến Chibi'}
            </Text>
            <View style={[styles.body, { marginTop: 5 }]}>
              <Text style={{ color: '#ABACBB' }}>{'Ca sĩ, diễn viên'}</Text>
            </View>

            <View style={[styles.row]}>
              <TouchableOpacity onPress={this._onFollow}>
                <View
                  style={[styles.button, {
                    backgroundColor: '#3C72FF',
                    paddingHorizontal: 30,
                  }]}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {'Follow'}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onSend}>
                <View
                  style={[styles.button, {
                    backgroundColor: '#56D8FE',
                    paddingHorizontal: 20,
                    marginLeft: 10,
                  }]}>
                  <Ionicons name="md-send" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.row,
            { justifyContent: 'space-between', marginTop: 20, marginBottom: 20 }
          ]}>
          <View style={styles.viewFollow}>
            <Text style={styles.number}>{'535'}</Text>
            <Text style={styles.title}>{'Photos'}</Text>
          </View>
          <View style={styles.viewFollow}>
            <Text style={styles.number}>{'615k'}</Text>
            <Text style={styles.title}>{'Followers'}</Text>
          </View>
          <View style={styles.viewFollow}>
            <Text style={styles.number}>{'376'}</Text>
            <Text style={styles.title}>{'Following'}</Text>
          </View>
        </View>
        <FlatList
          data={imgData}
          numColumns={2}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 13,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    paddingTop: Constants.statusBarHeight,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  button: {
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  row: {
    marginTop: 5,
    flexDirection: 'row',
  },
  number: {
    color: '#333C57',
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    marginTop: 4,
    color: '#939393',
    fontSize: 14,
  },
  viewFollow: {
    alignItems: 'center',
    width: '30%',
  },
});
