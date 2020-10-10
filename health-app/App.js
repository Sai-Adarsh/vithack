import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect } from 'react-native-svg'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import * as firebase from "firebase";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const firebaseConfig = {
  apiKey: "AIzaSyA_rPzl1D8YouEsSJ1AjQwElFqH_mxOAFI",
  authDomain: "realtime-4a7de.firebaseapp.com",
  databaseURL: "https://realtime-4a7de.firebaseio.com",
  projectId: "realtime-4a7de",
  storageBucket: "realtime-4a7de.appspot.com",
  messagingSenderId: "624733681109",
  appId: "1:624733681109:web:ab5c7b2277fbf1ffd6b95c",
  measurementId: "G-W109P6TCZL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
global.myVar = null;

class App extends Component {
  constructor(props){
    super(props);
    this.refreshListings = this.refreshListings.bind(this);
    this.state = {
      isVisible: false,
      labels: [new Date(Date.now() - 1000 * 25).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }), new Date(Date.now() - 1000 * 20).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }), new Date(Date.now() - 1000 * 15).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }), new Date(Date.now() - 1000 * 10).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }), new Date(Date.now() - 1000 * 5).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }), new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })],
      vitals_bp: [
        0,
        0,
        0,
        0,
        0
      ],
      vitals_heartrate: [
        0,
        0,
        0,
        0,
        0
      ],
      vitals_pulserate: [
        0,
        0,
        0,
        0,
        0
      ],
      vitals_respiratory: [
        0,
        0,
        0,
        0,
        0
      ],
      vitals_temperature: [
        0,
        0,
        0,
        0,
        0
      ],
    };
  }

  displayModal(show){
    this.setState({isVisible: show})
  }

  refreshListings() {
     firebase.database().ref('vitals_bp').once('value', snapshot => {
           var items = [];
           snapshot.forEach((child) => {
             items.push(
               parseFloat(child.val().value)
             );
           });
           items = items.slice(items.length - 6, items.length);
           this.setState({ vitals_bp: items});
      });
    firebase.database().ref('vitals_heartrate').once('value', snapshot => {
          var items = [];
          snapshot.forEach((child) => {
            items.push(
              parseFloat(child.val().value)
            );
          });
          items = items.slice(items.length - 6, items.length);
          this.setState({ vitals_heartrate: items});
     });
     firebase.database().ref('vitals_pulserate').once('value', snapshot => {
           var items = [];
           snapshot.forEach((child) => {
             items.push(
               parseFloat(child.val().value)
             );
           });
           items = items.slice(items.length - 6, items.length);
           this.setState({ vitals_pulserate: items});
      });
      firebase.database().ref('vitals_respiratory').once('value', snapshot => {
            var items = [];
            snapshot.forEach((child) => {
              items.push(
                parseFloat(child.val().value)
              );
            });
            items = items.slice(items.length - 6, items.length);
            this.setState({ vitals_respiratory: items});
       });
       firebase.database().ref('vitals_temperature').once('value', snapshot => {
             var items = [];
             snapshot.forEach((child) => {
               items.push(
                 parseFloat(child.val().value)
               );
             });
             items = items.slice(items.length - 6, items.length);
             this.setState({ vitals_temperature: items});
        });
    }

  componentDidMount() {
    this.timer = setInterval(()=> this.refreshListings(), 5000);
  }

  render () {
    return (
      <CollapsibleHeaderScrollView
      style = {{
        backgroundColor: '#2d3357',
      }}
       CollapsibleHeaderComponent = {
        <View style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: '#000'}}>
            <CalendarStrip
            scrollable
            style={{height: 150, paddingTop: 50, paddingBottom: 10, borderRadius: 0, width: windowWidth - 0, alignSelf: 'center', justifyContent: 'center'}}
            calendarColor={'#2d3357'}
            calendarHeaderStyle={{color: 'white'}}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            iconContainer={{flex: 0.1}}
            startDate={'2020-08-01T18:30:00.000Z'}
            onDateSelected={(date) => {
              console.log(date);
            }}
            />
        </View>
      }
      headerHeight={150}
      >
        <View style={styles.container}>
          <StatusBar backgroundColor='#121212' barStyle='light-content' />
          <Text style={{alignSelf: 'center', fontWeight: 'bold', color: '#9398c4'}}>{"\n"} Dashboard{"\n"}</Text>
          <AnimatedCircularProgress
            style={{
              alignSelf: 'center'
            }}
            size={200}
            width={20}
            fill={this.state.vitals_temperature[this.state.vitals_temperature.length - 1]}
            tintColor="#ff0050"
            backgroundColor="#3d5875">
            {
              (fill) => (
                <View>
                  <Text style={{alignSelf: 'center',  color: '#9398c4', fontSize: 40, fontWeight: 'bold',}}>{this.state.vitals_temperature[this.state.vitals_temperature.length - 1]} °F</Text>
                  <Text style={{alignSelf: 'center',  color: '#9398c4',}}>temperature</Text>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', color: '#9398c4'}}>{"\n"} Your Health Report{"\n"}</Text>
          <View style={{alignSelf: 'center'}}>
            <ProgressChart
            data={{
              labels: ["Heart", "BP", "Pulse"], // optional
              data: [ (this.state.vitals_heartrate[this.state.vitals_heartrate.length - 1]) / 125, (this.state.vitals_bp[this.state.vitals_bp.length - 1]) / 110, (this.state.vitals_pulserate[this.state.vitals_pulserate.length - 1]) / 105]
            }}
            width={ windowWidth - 20} // from react-native
            height={200}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              backgroundColor: "#2d3357",
              backgroundGradientFrom: "#2d3357",
              backgroundGradientTo: "#2d3357",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 20,
                height: 200,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            hideLegend={false}
          />
          </View>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', color: '#9398c4'}}>{"\n"} Suggestions {"\n"}</Text>
          <View style={styles.chartCard}>
            <LinearGradient colors={['rgba(26, 255, 146, 1)', 'rgba(26, 255, 146, 1)']} style={styles.refreshButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
              <MaterialCommunityIcons name="chart-pie" style={{color: '#fff'}} size={20} />
            </LinearGradient>
            <Text>{"\n"}</Text>
            {
              this.state.vitals_temperature[this.state.vitals_temperature.length - 1] > 100 ?
              <Text style={{fontWeight: 'bold', alignSelf: 'center',color: '#9398c4'}}>• You are running fever </Text> :
              <Text style={{fontWeight: 'bold', alignSelf: 'center',color: '#9398c4'}}>• Your temperature is fine </Text>
            }
            {
              (this.state.vitals_heartrate[this.state.vitals_heartrate.length - 1]) / 125 > 0.6 ?
              <Text style={{fontWeight: 'bold', alignSelf: 'center',color: '#9398c4'}}>• Your heart rate is fine </Text> :
              <Text style={{fontWeight: 'bold', alignSelf: 'center',color: '#9398c4'}}>• Your heartrate is too fast </Text>
            }
            {
              (this.state.vitals_bp[this.state.vitals_bp.length - 1]) / 110 > 0.5 ?
              <Text style={{fontWeight: 'bold', alignSelf: 'center',color: '#9398c4'}}>• Your blood pressure is fine </Text> :
              <Text style={{fontWeight: 'bold', alignSelf: 'center',color: '#9398c4'}}>• You're facing high blood pressure </Text>
            }
          </View>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', color: '#9398c4'}}>{"\n"} Track Heartrate and Blood Pressure{"\n"}</Text>
          <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
            <TouchableOpacity>
              <View style={{right: 10}}>
                  <LinearGradient colors={['#2d3357', '#2d3357']} style={styles.smallChartCard} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                    <LinearGradient colors={['#ff0050', '#ff2200']} style={styles.refreshButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
                      <MaterialCommunityIcons name="heart" style={{color: '#fff'}} size={20} />
                    </LinearGradient>
                    <Text style={{alignSelf: 'center', fontWeight: 'bold', color: '#9398c4', justifyContent: 'center'}}>Heartrate{"\n"}</Text>
                    <View style={{
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: '#292b4d',
                      width: 100,
                      justifyContent: 'center',
                      alignSelf: 'center'}}>
                      <Text style={{alignSelf: 'center',  color: '#FFF', fontSize: 20, fontWeight: 'bold',}}>{this.state.vitals_heartrate[this.state.vitals_heartrate.length - 1]}</Text>
                      <Text style={{alignSelf: 'center',  color: '#9398c4', fontSize: 10}}>bpm</Text>
                    </View>
                  </LinearGradient>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{left: 10}}>
                  <LinearGradient colors={['#2d3357', '#2d3357']} style={styles.smallChartCard} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                    <LinearGradient colors={['#17EAD9', '#6078EA']} style={styles.refreshButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
                      <MaterialCommunityIcons name="heart-pulse" style={{color: '#fff'}} size={20} />
                    </LinearGradient>
                    <Text style={{alignSelf: 'center', fontWeight: 'bold', color: '#9398c4', justifyContent: 'center'}}>Blood Pressure{"\n"}</Text>
                    <View style={{
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: '#292b4d',
                      width: 100,
                      justifyContent: 'center',
                      alignSelf: 'center'}}>
                      <Text style={{alignSelf: 'center',  color: '#FFF', fontSize: 20, fontWeight: 'bold',}}>{this.state.vitals_bp[this.state.vitals_heartrate.length - 1]}</Text>
                      <Text style={{alignSelf: 'center',  color: '#9398c4', fontSize: 10}}>mmhg</Text>
                    </View>
                  </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
            <Text style={{alignSelf: 'center', fontWeight: 'bold', color: '#9398c4'}}>{"\n"}Blood Pressure{"\n"}</Text>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity>
              <LineChart
                data={{
                  labels: this.state.labels,
                  datasets: [
                    {
                      data: this.state.vitals_bp
                    }
                  ]
                }}
                width={ windowWidth - 20} // from react-native
                height={200}
                decimalPlaces={2}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#2d3357",
                  backgroundGradientFrom: "#2d3357",
                  backgroundGradientTo: "#2d3357",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 20,
                    height: 200,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#fff"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', color: '#9398c4'}}>{"\n"}Heart rate{"\n"}</Text>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity>
              <LineChart
                data={{
                  labels: this.state.labels,
                  datasets: [
                    {
                      data: this.state.vitals_heartrate
                    }
                  ]
                }}
                width={ windowWidth - 20} // from react-native
                height={200}
                decimalPlaces={2}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#2d3357",
                  backgroundGradientFrom: "#2d3357",
                  backgroundGradientTo: "#2d3357",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 20,
                    height: 200,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#fff"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', color: '#9398c4'}}>{"\n"}Pulse rate{"\n"}</Text>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity>
              <LineChart
                data={{
                  labels: this.state.labels,
                  datasets: [
                    {
                      data: this.state.vitals_pulserate
                    }
                  ]
                }}
                width={ windowWidth - 20} // from react-native
                height={200}
                decimalPlaces={2}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#2d3357",
                  backgroundGradientFrom: "#2d3357",
                  backgroundGradientTo: "#2d3357",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 20,
                    height: 200,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#fff"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', color: '#9398c4'}}>{"\n"}Respiratory rate{"\n"}</Text>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity>
              <LineChart
                data={{
                  labels: this.state.labels,
                  datasets: [
                    {
                      data: this.state.vitals_respiratory
                    }
                  ]
                }}
                width={ windowWidth - 20} // from react-native
                height={200}
                decimalPlaces={2}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#2d3357",
                  backgroundGradientFrom: "#2d3357",
                  backgroundGradientTo: "#2d3357",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 20,
                    height: 200,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#fff"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </TouchableOpacity>
          </View>
          <Text>{"\n\n"}</Text>
        </View>
      </CollapsibleHeaderScrollView>
    );
  }
}

class DeveloperScreen extends Component {
  render () {
    return (
      <View style={styles.developerContainer}>
      <MaterialCommunityIcons name="github-circle" style={{color: '#fff'}} size={100} />
      <Text style={{fontWeight: 'bold', alignSelf: 'center', textAlign: 'center', color: '#9398c4'}}>This app was developed by Team Appendly for VIT Hack 2020. Source code copyrights © 2020 Appendly."/></Text>
      </View>
    );
  };
}

class AppScreen extends Component {
  render () {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Stack"
          tabBarOptions={{
            style: {
              borderTopColor: '#transparent',
            },
            labelStyle: {
              fontSize: 10,
            },
            activeBackgroundColor: '#242947',
            inactiveBackgroundColor: '#242947',
            inactiveTintColor: '#babbc0',
            activeTintColor: '#ff0050',
          }}
        >
          <Tab.Screen name="Stack" component={App}
            options= {{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="Post" component={App}
            options= {{
              tabBarLabel: 'Heart',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="heart-pulse" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="Invite" component={DeveloperScreen}
            options= {{
              tabBarLabel: 'Developers',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="github-circle" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242947',
  },
  developerContainer: {
    flex: 1,
    backgroundColor: '#242947',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartCard: {
    height: 200,
    borderRadius: 20,
    width: windowWidth - 20,
    alignSelf: 'center',
    backgroundColor: '#2d3357',
    justifyContent: 'center',
  },
  smallChartCard: {
    height: 200,
    borderRadius: 20,
    width: windowWidth - 237,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  refreshButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignSelf: 'center',
    alignItems: 'center',
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    padding: 15,
    borderRadius: 30,
  },
});

export default AppScreen;
