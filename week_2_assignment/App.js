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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const imgData = [
  { id: 1, imgSource: require('./assets/1.jpg') },
  { id: 2, imgSource: require('./assets/2.jpg') },
  { id: 3, imgSource: require('./assets/3.jpg') },
  { id: 4, imgSource: require('./assets/4.jpg') },
  { id: 5, imgSource: require('./assets/5.jpg') },
  { id: 6, imgSource: require('./assets/6.jpg') },
];

export default class App extends React.Component {
  _keyExtractor = item => item.id;
  _renderItem = ({ item, index }) => {
    return (
      <Image
        style={{
          width: width / 2 - 20,
          height: width / 2 - 20,
          borderRadius: 10,
          margin: 5,
          // marginLeft: 5,
          // marginRight: index % 2 == 0 ? 5 : 0,
        }}
        source={item.imgSource}
        resizeMethod={'auto'}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 44,
            paddingTop: Constants.statusBarHeight,
          }}>
          <TouchableOpacity>
            <Ionicons name="md-arrow-round-back" size={27} color="#6A779F" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="fullscreen" size={27} color="#6A779F" />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Image
            source={require('./assets/avatar.jpg')}
            style={{ width: 100, height: 100, borderRadius: 50 }}
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
              <TouchableOpacity>
                <View
                  style={{
                    height: 30,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#3C72FF',
                    paddingHorizontal: 30,
                  }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {'Follow'}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    width: 50,
                    height: 30,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#56D8FE',
                    marginLeft: 10,
                  }}>
                  <Ionicons name="md-send" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.row,
            { justifyContent: 'space-between', marginVertical: 20 },
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
  body: {
    flex: 1,
  },
  row: {
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
