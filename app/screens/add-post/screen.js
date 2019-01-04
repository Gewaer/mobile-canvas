// Importing package modules.
import React, { Component } from 'react';

import {
    View,
    Platform,
    TouchableOpacity,
    BackHandler,
    Alert
} from "react-native";

import {
    Button,
    Text,
    Content,
    Container,
    Form,
    Item,
    Input,
    Spinner,
    Icon,
    Root,
    Picker
} from "native-base";

import { connect } from 'react-redux';
import TitleBar from '../../components/TitleBar';

import {
    globalStyle,
    colors,
    paddingHelpers,
} from "../../config/styles";

// Importing Redux's actions
import { 
    changeActiveScreen, 
    changeSessionToken, 
    changeUser, 
    changeCurrentCondo,
    changeCondos
} from '../../actions/SessionActions';
import Stylesheet from './stylesheet';
import MulticolorBar from '../../components/multicolor-bar/';
import AddFileButton from '../../components/add-file-button';
import FilePlaceholder from '../../components/file-placeholder';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import * as mime from 'react-native-mime-types';

const axios = require('../../config/axios');

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

/*
	Screen Name: Login. 
	Description: This screen is used to let the user log in with his/her email or with social options.
*/
class AddPost extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            pickerSelection: '',
            title: '',
            content: '',
            files: []
        };
    }

    onValueChange(value) {
        this.setState({
            pickerSelection: value
        });
    }

    // Handles Android's back button's action
    backAndroid() {
        this.pushScreen('dac.Welcome');
        return true
    }

    componentDidMount() {
        // Creates an event listener for Android's back button
        BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
    }

    // Changes the active screen using redux.
    changeScreen(activeScreen) {
        this.props.changeActiveScreen({ activeScreen });
    }

    // Pushes to another screen in the navigator stack.
    pushScreen(activeScreen) {
        this.props.navigator.push({
            screen: activeScreen,
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            },
        });
    }

    createPost = () => {
        let content = this.state.content.trim();
        let title = this.state.title.trim();
        if (title && content && this.state.pickerSelection+1) {
            const data = new FormData();
            data.append('CondoId', this.props.currentCondo.CondoId);
            data.append('SectId', this.props.sections[this.state.pickerSelection+1].SectId);
            data.append('BlogTitle', title);
            data.append('BlogText', content);

            axios({
            url: `/blogs`,
            method: "POST",
            data
            }).then(() => {
                this.setState({ title: '', content: ''})
                Alert.alert(
                    "Crear Post",
                    "El post se ha creado exitosamente.", [
                        {
                            text: "OK",
                        }
                    ], {
                        cancelable: false
                    }
                );
            }).catch((error) => {
                Alert.alert(
                    "Crear Post",
                    "Se ha producido un error, no se se ha creado el post.", [
                        {
                            text: "OK",
                        }
                    ], {
                        cancelable: false
                    }
                );
            })
        } else {
            Alert.alert(
                "Campos requeridos",
                "No debe dejar campos vacíos", [
                    {
                        text: "OK",
                    }
                ], {
                    cancelable: false
                }
            );
        }
    }

    // Defines title bar's left content
    titleBarLeft() {
        return {
            content: (
                <View>
                    <TouchableOpacity transparent onPress={() => this.props.navigator.toggleDrawer({ side: 'left', animated: true, to: 'open' })}>
                        <Icon type={'Ionicons'} name={'ios-menu'} style={{ color: 'white', width: 22 }} />
                    </TouchableOpacity>
                </View>
            )
        };
    }

    // Defines title bar's body content
    titleBarBody() {
        return {
            content: (
                <View style={[Stylesheet.titleBarContent, { width: '105%' }]}>
                    <Text style={[Stylesheet.titleBarContent, { fontSize: 20 }]}>
                        { this.props.user.UserName }
                    </Text>
                    <Text style={[Stylesheet.titleBarContent, { fontSize: 14 }]}>
                        { this.props.currentCondo && this.props.currentCondo.CondoName }
                    </Text>
                </View>
            )
        };
    }
    
    sectionItems() {
        return this.props.sections.filter(section => section.SectCode).map((section, index) => {
            return(
                <Picker.Item
                    key={ index }
                    value={ index }
                    label={ section.SectName }
                />
            );
        }) 
    }

     showFilePicker() {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
          },
            (error, file) => {
                this.setState({ files: this.state.files.concat(file) }, () => { console.log(this.state.files) });
                const fileData = new FormData();
                fileData.append("uri", file.uri);
                fileData.append("fileSize", file.fileSize);
                fileData.append("fileName", file.fileName);
          })
    }

    render() {
        return (
            <Root>
                <Container style={{ backgroundColor: colors.normalWhite }}>
                    <TitleBar noShadow left={this.titleBarLeft()} body={this.titleBarBody()} bgColor={colors.brandLightBlack} />
                    <MulticolorBar/>
                    <Content style={{ backgroundColor: colors.normalWhite }}>
                        {
                            this.state.isLoading ?
                                <Spinner color={colors.brandLightBlack} /> :
                                <View>
                                    <Text style={ Stylesheet.titleText }>Agregar Post</Text>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <View style={Stylesheet.containerView}>
                                        <Form>
                                            <Text style={ Stylesheet.labelText }>Sección del blog:</Text>
                                            <Item picker style={ Stylesheet.formItem }>
                                                <Picker
                                                    textStyle={{ fontSize: 12 }}
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                    style={{ width: 350 }}
                                                    placeholder="Selecciona una sección..."
                                                    placeholderStyle={{ color: colors.brandLightGray, fontSize: 12 }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={this.state.pickerSelection}
                                                    onValueChange={(itemValue) => this.onValueChange(itemValue)}
                                                >
                                                    {
                                                        this.sectionItems()
                                                    }
                                                </Picker>
                                            </Item>
                                            <Text style={ Stylesheet.labelText }>Título:</Text>
                                            <Input
                                                value={ this.state.title }
                                                placeholderTextColor={ colors.brandLightGray }
                                                style={ [Stylesheet.formInput, { height: 29.5 }] }
                                                placeholder="Escribe el título..."
                                                onChangeText={(title) => this.setState({ title: title })}
                                            />
                                            <Text style={ Stylesheet.labelText }>Contenido:</Text>
                                            <Input
                                                value={ this.state.content }
                                                placeholderTextColor={ colors.brandLightGray }
                                                style={ [Stylesheet.formInput, { height: 142.5 }] }
                                                multiline={ true } placeholder="Agrega contenido..."
                                                onChangeText={(content) => this.setState({ content: content })}
                                            />                                   
                                        </Form>
                                        <Text style={ [Stylesheet.labelText, { marginBottom: 8 }] }>Adjuntar imagen o archivo:</Text>
                                        <View style={ { flexDirection: 'row' } }>
                                            <AddFileButton onPress = { () => { this.showFilePicker() } }/>
                                            { this.state.files.map((file, index) => {
                                                    return(
                                                        <FilePlaceholder key = { index } style={ { marginLeft: 8, borderWidth: 1, borderColor: colors.brandLightGray } } isImage = { mime.lookup(file.uri).includes('image') } source = { file.uri }/>
                                                    );
                                                })
                                            }
                                        </View>
                                    </View>
                                    <View style={ Stylesheet.divisionLine }></View>
                                    <Button
                                        block
                                        primary
                                        onPress={() => { this.createPost() }}
                                        style={[Stylesheet.submitBtn, { marginTop: 20 }]}>
                                        <Text style={{ color: colors.normalWhite, fontSize: 12, paddingRight: 10 }}>
                                            Crear
                                        </Text>
                                        <Icon type="Ionicons"  name="ios-add"  color={colors.normalWhite} style={ Stylesheet.buttonIcon }/>
                                    </Button>
                                </View>
                        }
                    </Content>
                </Container>
            </Root>
        );
    }
}
  
// Maps redux's state variables to this class' props
const mapStateToProps = state => {
    return {
        state: state,
        condos: state.session.condos,
        currentCondo: state.session.currentCondo,
        user: state.session.user,
        sections: state.session.sections
    };
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
    changeActiveScreen, 
    changeSessionToken, 
    changeUser, 
    changeCurrentCondo,
    changeCondos
})(AddPost);