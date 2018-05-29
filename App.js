/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
 	Animated,
	Image, 
	Easing,
	TouchableHighlight
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
	
	constructor(){
		
		super();	
		
		this.state = {};
		this.state.spinValue = new Animated.Value(0);
		this.state.touched = true;	
		// Interpolate beginning and end values		
		this.state.spin = this.state.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg']})
	}

	spin () {
	
		this.setState((prevState) => ({
			touched: !prevState.touched
		}))
		
		let spinning = this.state.spinValue.setValue(0);
		// Setup animation
		Animated.timing(
			this.state.spinValue,
			{
				toValue: this.state.touched && this.state.touched !== undefined ? 1 : 0,
				duration: 2000,
				easing: Easing.linear,
			}
		).start();
	}

	render() {
				
		return (
		  <View style={styles.container}>
			<TouchableHighlight onPress={() => this.spin()}>				
				<Animated.Image
					source={require('./placeholder.png')}
					style={{
						width: 200,
						height: 200, 
						borderRadius: 100,
						transform: [{rotate: this.state.spin}] 
					}}
				/>
			</TouchableHighlight>
		  </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	}
});
