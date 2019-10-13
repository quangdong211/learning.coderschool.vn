import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const ConversionTypeButton = props => {
  const backgroundColor = props.fromCurrency === props.from && props.toCurrency === props.to ? 'lightblue' : null;
  const buttonStyle = { backgroundColor: backgroundColor };
  const fromFlag = props.from === 'usd' ? '🇺🇲' : '🇻🇳';
  const toFlag = props.to === 'usd' ? '🇺🇲' : '🇻🇳';
  return (
    <TouchableOpacity
      onPress={() => props.setConversionCurrencies(props.from, props.to)}
      style={[styles.button, buttonStyle]}>
      <Text>
        {fromFlag} to {toFlag}
      </Text>
    </TouchableOpacity>
  );
};

const FormattedCurrency = props => {
  const format = props.type === 'usd' ? 'us' : 'vn';
  const currency = props.type === 'usd' ? 'USD' : 'VND';
  const flag = props.type === 'usd' ? '🇺🇸' : '🇻🇳';

  const formatter = new Intl.NumberFormat(format, {
    currency,
    style: 'currency',
  });

  return (
    <Text style={styles.currencyText}>
      {formatter.format(props.value)} {flag} {currency}
    </Text>
  );
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: 0,
      currentCurrencyValue: 0,
      convertedCurrencyValue: 0,
      fromCurrency: 'vnd',
      toCurrency: 'usd',
    };
  }

  setFromCurrencyValue = text => {
    let currentCurrencyValue = text;
    let convertedCurrencyValue = '';
    if (this.state.fromCurrency === 'vnd') {
      convertedCurrencyValue = currentCurrencyValue / 23000;
    } else {
      convertedCurrencyValue = currentCurrencyValue * 23000;
    }
    this.setState({
      textInput: text,
      currentCurrencyValue: currentCurrencyValue,
      convertedCurrencyValue: convertedCurrencyValue,
    });
  };

  setConversionCurrencies = (from, to) => {
    this.setState(
      {
        fromCurrency: from,
        toCurrency: to,
      },
      () => this.setFromCurrencyValue(this.state.textInput)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Please enter the value of the currency you want to convert</Text>
        <TextInput
          autoFocus
          keyboardType="number-pad"
          selectionColor="red"
          placeholder="100.000.000 VNĐ"
          style={styles.input}
          onChangeText={text => this.setFromCurrencyValue(text)}
        />
        <ConversionTypeButton
          fromCurrency={this.state.fromCurrency}
          toCurrency={this.state.toCurrency}
          from="vnd"
          to="usd"
          setConversionCurrencies={this.setConversionCurrencies}
        />
        <ConversionTypeButton
          fromCurrency={this.state.fromCurrency}
          toCurrency={this.state.toCurrency}
          from="usd"
          to="vnd"
          setConversionCurrencies={this.setConversionCurrencies}
        />
        <Text>Current currency:</Text>
        <FormattedCurrency
          type={this.state.fromCurrency}
          value={this.state.currentCurrencyValue}
        />
        <Text>Conversion currenecy:</Text>
        <FormattedCurrency
          type={this.state.toCurrency}
          value={this.state.convertedCurrencyValue}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 13,
  },
  input: {
    height: 60,
    padding: 5,
    width: 300,
    fontSize: 35,
    borderWidth: 1,
    borderColor: 'lightblue',
    textAlign: 'center',
  },
  button: {
    height: 35,
    width: 200,
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: 'lightblue',
    justifyContent: 'center',
  },
  currencyText: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',
  },
});
