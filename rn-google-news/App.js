import React from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator,
  FlatList, Linking, TouchableOpacity

} from 'react-native';
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';

const apiKey = 'f1bee6ef9c1b4806aa9db507bdb3cc2f';
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      articles: [],
      pageNumber: 1,
      hasErrored: false,
      lastPageReached: false,
    }
  }
  componentDidMount() {
    this.getNews();
  }

  onPress = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };




  getNews = async () => {
    var { pageNumber } = this.state;
    this.setState({ loading: true });
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&page=${pageNumber}`
      );

      const jsonData = await response.json();
      var { articles = [] } = jsonData;

      hasMoreArticles = articles.length > 0;
      if (hasMoreArticles) {
        const newArticleList = this.filterForUniqueArticles(
          this.state.articles.concat(articles)
        );
        this.setState({
          articles: newArticleList,
          pageNumber: pageNumber + 1
        });
      } else {
        this.setState({ lastPageReached: true });
      }

    }
    catch (error) {
      this.setState({ hasErrored: true });
    }
    this.setState({ loading: false });
  };

  filterForUniqueArticles = arr => {
    const cleaned = [];
    arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  };

  renderArticleItem = ({ item }) => {
    var { source = {} } = item;
    return (

      <TouchableOpacity
        onPress={() => this.onPress(item.url)}
        activeOpacity={0.5}>
        <Card
          title={item.title}
          image={{ uri: item.urlToImage }}>
          <View style={styles.row}>
            <Text style={styles.label}>
              {'Source'}
            </Text>
            <Text style={styles.info}>
              {source.name}
            </Text>
          </View>
          <Text style={{ marginBottom: 10 }}>
            {item.content}
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>
              {'Published'}
            </Text>
            <Text style={styles.info}>
              {moment(item.publishedAt).format('LLL')}
            </Text>
          </View>
          <Button
            onPress={() => this.onPress(item.url)}
            icon={<Icon />} title="Read more" backgroundColor="#03A9F4" />
        </Card>
      </TouchableOpacity>
    );
  }


  render() {
    var { loading, articles, hasErrored, lastPageReached } = this.state;

    if (hasErrored) {
      return (
        <View style={styles.container}>
          <Text>Error =(</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Articles Count:</Text>
          <Text style={styles.info}>{articles.length}</Text>
        </View>
        <FlatList
          data={articles}
          renderItem={this.renderArticleItem}
          keyExtractor={item => item.title}
          onEndReached={this.getNews}
          onEndReachedThreshold={1}
          ListFooterComponent={
            lastPageReached ?
              null
              :
              <ActivityIndicator
                size="large"
                loading={loading}
              />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  }
});