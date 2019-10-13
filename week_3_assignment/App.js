import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const CHOICES = [
  {
    name: 'rock',
    uri: require('./assets/rook.png'),
  },
  {
    name: 'paper',
    uri: require('./assets/paper.png'),
  },
  {
    name: 'scissors',
    uri: require('./assets/scissors.png'),
  },
];

const Button = props => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => props.onPress(props.name)}>
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);

const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={uri} resizeMode="contain" style={styles.choiceImage} />
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamePrompt: 'Fire!',
      userChoice: {},
      computerChoice: {},
      playedTotal: 0,
      won: 0,
      lose: 0,
      tied: 0,
    };
  }

  randomComputerChoice = () =>
    CHOICES[Math.floor(Math.random() * CHOICES.length)];

  getRoundOutcome = userChoice => {
    const computerChoice = this.randomComputerChoice().name;
    let result;

    if (userChoice === 'rock') {
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'paper') {
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'scissors') {
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    }

    if (userChoice === computerChoice) result = 'Tie game!';
    return [result, computerChoice];
  };

  onPress = playerChoice => {
    const playedTotal = this.state.playedTotal + 1;
    const [result, compChoice] = this.getRoundOutcome(playerChoice);

    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(
      choice => choice.name === compChoice
    );

    var won = this.state.won;
    var lose = this.state.lose;
    var tied = this.state.tied;
    if (result == 'Victory!') {
      won = won + 1;
    }
    if (result == 'Defeat!') {
      lose = lose + 1;
    }
    if (result == 'Tie game!') {
      tied = tied + 1;
    }

    this.setState({
      playedTotal: playedTotal,
      won: won,
      lose: lose,
      tied: tied,
      gamePrompt: result,
      userChoice: newUserChoice,
      computerChoice: newComputerChoice,
    });
  };

  getResultColor = () => {
    if (this.state.gamePrompt === 'Victory!') return 'green';
    if (this.state.gamePrompt === 'Defeat!') return 'red';
    return null;
  };

  render() {
    var wonPercent = 0,
      losePercent = 0,
      tiedPercent = 0;
    if (this.state.playedTotal > 0) {
      wonPercent = Math.floor((this.state.won / this.state.playedTotal) * 100);
      losePercent = Math.floor((this.state.lose / this.state.playedTotal) * 100);
      tiedPercent = 100 - (wonPercent + losePercent);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.vsStyle}>
          {'Played Total: ' + this.state.playedTotal}
        </Text>
        <View style={styles.playedTotal}>
          <Text style={[styles.vsStyle, { color: 'green' }]}>
            {`Won: ${this.state.won} (${wonPercent} %)`}
          </Text>
          <Text style={[styles.vsStyle, { color: 'red' }]}>
            {` Lose: ${this.state.lose} (${losePercent} %)`}
          </Text>
          <Text style={styles.vsStyle}>
            {` Tied: ${this.state.tied} (${tiedPercent} %)`}
          </Text>
        </View>
        <Text
          style={[styles.gamePromptStyle, { color: this.getResultColor() }]}>
          {this.state.gamePrompt}
        </Text>
        <View style={styles.choicesContainer}>
          <ChoiceCard player="Player" choice={this.state.userChoice} />
          <View style={styles.choiceContainer}>
            <Text style={styles.vsStyle}>vs</Text>
          </View>
          <ChoiceCard player="Computer" choice={this.state.computerChoice} />
        </View>

        {CHOICES.map(choice => {
          return (
            <Button
              key={choice.name}
              name={choice.name}
              onPress={this.onPress}
            />
          );
        })}
      </View>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  playedTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee',
  },
  vsStyle: {
    color: '#000',
    fontSize: 20,
  },
  gamePromptStyle: {
    fontSize: 35,
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    padding: 20,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
    elevation: 4,
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 20,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902',
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  },
});
