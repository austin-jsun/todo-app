/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage, AlertIOS, AppRegistry, TouchableOpacity, TextInput, Alert, Button, SectionList, FlatList, Platform, StyleSheet, Text, View, ScrollView} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
//let taskList = ;
export default class App extends Component<Props> {



	constructor() {
		super();
		this.state = {status: false, data: []};
		this.displayData();
	}

	displayData = async() => {
		let retrieved = await AsyncStorage.getItem('saveData');
		let parsed = JSON.parse(retrieved);
		this.setState({data: parsed});
	}


	editTaskList(text) {
		const newData = this.state.data.concat({task: text, taskComplete: false})
		this.setState({data: newData})
		//this.state.data.push(text); -> you can't actually you use the push mehtod to alter state data
		//this.render(); -> this also doesn't reload the state!
		AsyncStorage.setItem('saveData', JSON.stringify(this.state.data))
	}


	_onPressButton() {
		//Alert.alert('You tapped button!')
		//this.setState({status: true});
		AlertIOS.prompt('Add Reminder', null, (text) => this.editTaskList(text));
	}

	_onPressSmallButton(item) {
		//item.taskComplete = true;
    //NEVER edit this.state directly, treat it as immutable and then
    //update it by making an array copy and changing that array then setting
    //your new state
    let newData = [...this.state.data];
    let index = newData.findIndex(el => el === item);
    newData[index].taskComplete = !newData[index].taskComplete;
    this.setState({data: newData});
	}


  render() {
    return (
    	<View style = {styles.container}>
	    	<View style={styles.titleBackground}>
	    		<Text style={styles.title}>Reminders</Text>
	    	</View>

	    	<View style={styles.listBackground}>
	    		<FlatList
	    			data={this.state.data}
	    			renderItem = {({item}) =>
	    			<View style = {styles.listItem}>
	    				<View style={item.taskComplete? styles.otherButton : styles.listButton}>
		    				<Button
		    					title = ""
		    					color = "black"
		    					onPress = {() => this._onPressSmallButton(item)}
		    				/>
		    			</View>
	    				<Text style ={styles.listItemText}>{item.task}</Text>
	    			</View>}
	    		/>
	    	</View>


	    	<View style = {styles.buttonView}>
		    	<View style={styles.buttonBackground}>
		    		<TouchableOpacity
		    			onPress = {(item) => this._onPressButton(item)}
		    			color = "white"
		    		>
		    			<Text style={styles.plusButton}>+</Text>
		    		</TouchableOpacity>
		    	</View>
		    </View>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleBackground: {
    flex: 0.3,
    backgroundColor: '#6495ED'
  },
  title: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 50,
    top: 110,
    margin: 35,
    color: 'white'
  },
  listBackground: {
  	flex:0.5,
  	alignItems: 'center',
  	backgroundColor: 'white'
  },
  listItem: {
  	flex: 0.1,
  	flexDirection: 'row',
  	justifyContent: 'flex-start'
  },
  listButton: {
  	height:25,
  	width: 25,
  	marginRight: 10,
  	backgroundColor: '#778899'
  },
  otherButton: {
  	height:25,
  	width: 25,
  	marginRight: 10,
  	backgroundColor: 'green'
  },
  listItemText: {
  	fontSize: 25,
  	marginRight: 50,
  	fontFamily:'Avenir-Heavy'
  },
  buttonView: {
  	flex: 0.1,
  	margin: 20,
  	alignItems: 'flex-end'
  },
  buttonBackground: {
  	height: 50,
  	width: 50,
  	borderRadius: 25,
  	alignItems: 'center',
  	backgroundColor: '#6495ED'
  },
  plusButton: {
  	fontSize: 36,
  	color: 'white'
  }
});
