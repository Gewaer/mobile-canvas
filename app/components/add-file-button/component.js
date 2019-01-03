// Importing package modules.
import React, { Component } from "react";

import {
	ScrollView,
	View,
	TouchableOpacity,
	AsyncStorage,
	StyleSheet
} from "react-native";

import {
	Body,
	Icon,
	Text,
	ListItem,
	List,
	Right,
} from "native-base";

import {
	ListStyles,
	paddingHelpers,
	colors
} from "../../config/styles";

import Stylesheet from "./stylesheet";

class AddFileButton extends Component {
	
	render() {
		const {
			onPress
		} = this.props;

		return (
			<TouchableOpacity style={ Stylesheet.container } onPress={ onPress }>
				<Icon type="Ionicons" name="ios-add"  style={ Stylesheet.buttonIcon }/>
			</TouchableOpacity>
		);
	}
}

export default AddFileButton;