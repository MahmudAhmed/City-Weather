import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const axios = require("axios");


export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      cities: [
        { city: "New York", country: "US" },
        { city: "London", country: "GB" },
        { city: "Los Angeles", country: "US" },
        { city: "Dubai", country: "UAE" },
        { city: "Mumbai", country: "IN" },
        { city: "Paris", country: "FR" },
        { city: "Tokyo", country: "JP" },
        { city: "Moscow", country: "Russia" },
        { city: "Barcelona", country: "Spain" },
        { city: "Rome", country: "Italy" },
        { city: "San Francisco", country: "US" },
        { city: "Madrid", country: "Spain" },
        { city: "Chicago", country: "US" },
        { city: "Abu Dhabi", country: "UAE" },
        { city: "Amsterdam", country: "Netherlands" },
        { city: "Beijing", country: "China" },
        { city: "Toronto", country: "Canada" },
        { city: "Doha", country: "Qatar" },
        { city: "Hong Kong", country: "China" },
        { city: "San Diego", country: "US" },
        { city: "Boston", country: "US" },
        { city: "Sydney", country: "Australia" },
        { city: "Las Vegas", country: "US" },
        { city: "Miami", country: "US" },
        { city: "San Jose", country: "US" },
      ],
      list: [],
      refresh: true,
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount(){
    this.getTemps();
  }

  randomGen(cities, n){
    const cityList = [];
    const len = cities.length - 1;
    for (let i = 0; i < n; i++){
      let idx = Math.floor(Math.random() * len)
      while (cityList.includes(cities[idx])) idx = Math.floor(Math.random() * len);
      cityList.push(cities[idx])
    }
    return cityList;
  }

  fetchData(city, country, arr){
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=6f6c988ba933250c41a9e9fe80910c22&units=imperial`)
      .then( res => {
        const data = res.data;
        const city = {
          name: data.name,
          country: data.sys.country,
          temp: Math.floor(data.main.temp),
          type: data.weather[0].main,
          details: `Humidity: ${data.main.humidity} | ${data.weather[0].main}`,
        };
        arr.push(city);
        this.setState({ list: arr, refresh: false });
      })
      .catch( err => console.log(city))

  }

  getTemps(){
    const cities = this.randomGen(this.state.cities, 9);
    const list = [];
    for (let city in cities){
      this.fetchData(cities[city].city, cities[city].country, list);
    }
  }

  handleRefresh() {
    this.setState({
      list: [],
      refresh: true
    })
    this.getTemps();
  }

  getColor(item){
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

  render(){
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Text style={styles.title}>☀️ City Weather</Text>
        <FlatList
          style={styles.list}
          data={this.state.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => alert(item.details)}
              underlayColor="white"
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0)"]}
                start={[0, 0.5]}
              >
                <View style={styles.row}>
                  <Text style={[this.getColor(item), styles.temp]}>
                    {this.getEmoji(item.type)} {item.temp}° F
                  </Text>
                  <Text style={styles.city}>{item.name}</Text>
                </View>
              </LinearGradient>
            </TouchableHighlight>
          )}
          refreshing={this.state.refresh}
          onRefresh={this.handleRefresh}
        />
        {/* <Button
          title="Go to Page"
          onPress={() => this.navigation.navigate('Page')}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
  },
});