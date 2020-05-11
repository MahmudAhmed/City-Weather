import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const axios = require("axios");


export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
      searchterm: "",
      prompt: "Search for a city..."
    };
  }

  fetchData(city) {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6f6c988ba933250c41a9e9fe80910c22&units=imperial`)
      .then(res => {
          const data = res.data;
          const city = {
            name: data.name,
            country: data.sys.country,
            temp: Math.floor(data.main.temp),
            type: data.weather[0].main,
            details: `Humidity: ${data.main.humidity} | ${data.weather[0].main}`,
          };
          this.setState({ city });
      })
      .catch(err => this.setState({ city: null, prompt: "Invalid City" }))

  }

  getColor(item) {
    if (item.temp < 35) {
      return styles.cold;
    } else if (item.temp < 55) {
      return styles.normal;
    } else if (item.temp <= 70) {
      return styles.medium;
    } else if (item.temp > 70) {
      return styles.hot;
    }
  }

  getEmoji(type) {
    "clouds clear haze thunderstorm rain snow mist"
    switch (type) {
      case "Clouds":
        return "☁️"
      case "Clear":
        return "☀️";
      case "Haze":
        return "🌫";
      case "Thunderstorm":
        return "⛈";
      case "Snow":
        return "❄️";
      case "Mist":
        return "🌁";
      default:
        return "🌡";
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Text style={styles.title}>☀️ City Weather</Text>
        <View style={styles.inputContainer}>
          <Text>Search for City</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({searchterm: text})}
            value={this.state.searchterm}
          />
          <TouchableHighlight
            onPress={() => this.fetchData(this.state.searchterm)}
            style={{paddingTop: 10}}
            underlayColor="white"
          >
            <Text>Search</Text>
          </TouchableHighlight>
        </View>
        {this.state.city ? (
        <TouchableHighlight
          onPress={() => alert(this.state.city.details)}
          underlayColor="white"
          style={styles.list}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0)"]}
            start={[0, 0.5]}
          >
            <View style={styles.row}>
              <Text style={[this.getColor(this.state.city), styles.temp]}>
                {this.getEmoji(this.state.city.type)} {this.state.city.temp}° F
                </Text>
              <Text style={styles.city}>{this.state.city.name}</Text>
            </View>
          </LinearGradient>
        </TouchableHighlight>
        ) :  (
        <Text>{this.state.prompt}</Text>)
        }
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: { 
    height: 40, 
    width: "70%", 
    borderColor: 'gray', 
    backgroundColor: "black", 
    borderWidth: 1,
    color: "white",
    padding: 5,
  },
  inputContainer: { 
    paddingVertical: 10, 
    width: "100%", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  cold: { color: "navy" },
  normal: { color: "green" },
  medium: { color: "orange" },
  hot: { color: "red" },
  title: {
    // paddingTop: 40,
    paddingBottom: 15,
    width: "100%",
    textAlign: "center",
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
  },
  city: {
    fontFamily: "sans-serif",
    fontSize: 20,
    lineHeight: 40,
  },
  temp: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  list: {
    width: "100%",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
});