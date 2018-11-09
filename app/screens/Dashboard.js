import React, { PureComponent } from 'react';

import {
    StyleSheet,
    View,
    Platform,
    FlatList
} from "react-native";

import {
    Button,
    Text,
    Icon,
    ListItem,
    Body,
    Right,
    Container,
    Spinner,
    Thumbnail
} from 'native-base';

import { colors, paddingHelpers } from "../config/styles";
import { changeActiveScreen } from '../actions/SessionActions';
import { connect } from 'react-redux';
import * as axios from 'axios'
const platform = Platform.OS;
import { VUE_APP_BASE_API_URL } from '../config/env'

import TitleBar from "../components/TitleBar"

var _ = require('lodash');

class Dashboard extends PureComponent {

    constructor(props) {
        super(props);

        this.state = { 
            isLoading: true,
            data: [],
            page: 1
        };
    }

    changeScreen(card) {
        this.props.navigator.resetTo({
            screen: 'dac.ItemInfo',
            passProps: {
                item: card,
            },
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            }
        });
    }

    componentWillMount() {
        this.getItems();
    }

    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }

    titleBarLeft() {
        return (
            {
                content: (
                    <View style={styles.titleBarContent}>
                        <Button transparent onPress={() => this.props.navigator.toggleDrawer({
                            side: 'left',
                            animated: true,
                            to: 'open'
                        })}>
                            <Icon type={'MaterialIcons'} name={'menu'} style={{ color: '#fff', fontSize: platform === "ios" ? 22 : 24 }} />
                        </Button>
                    </View>
                )
            }
        );
    }

    titleBarBody() {
        return (
            {
                content: (
                    <View style={styles.titleBarContent}>
                        <Text style={{ color: '#fff', paddingLeft: platform === "ios" ? 0 : 10, fontSize: platform === "ios" ? 18 : 19.64  }}>
                            { this.props.company ? this.props.company.name : 'Familia no disponible' }
                        </Text>
                    </View>
                )
            }
        );
    }

    getItems = () => {
        this.setState({ isLoading: true });

        axios.get(`https://apidev.gewaer.io/v1/leads?format=true&limit=20&page=${this.state.page}&q=(is_deleted:0,is_duplicated:0)`)
        .then((response) => {
            console.log("Updated");
            this.setState({ data: [...this.state.data, ...response.data.data], isLoading: false });
        })
        .catch((error) => {
            console.log(error.response);
        });
    }

    getImageCover() {
        return 'https://banner2.kisspng.com/20180406/sve/kisspng-computer-icons-user-material-design-business-login-dizzy-5ac7f1c61041c2.5160856515230529980666.jpg';
    }

    rowContent(lead) {
        return (
            <ListItem style={styles.listItem} onPress={() => this.changeScreen(lead)}>
                <View>
                    <Thumbnail source={{ uri: this.getImageCover() }} />
                </View>
                <Body>
                    <Text>
                        {lead.firstname} {lead.lastname}
                    </Text>
                    <Text note>
                        {lead.email}
                    </Text>
                    <Text note>
                        {this.formatPhoneNumber(lead.phone)}
                    </Text>
                </Body>
                <Right>
                    <Text note>
                        {lead.id}
                    </Text>
                </Right>
            </ListItem>
        );
    }

    handleLoadMore = () => {
        if (this.state.isLoading) {
            return;
        }

        this.setState({
            page: this.state.page + 1,
            isLoading: true
        }, () => {
            this.getItems();
        })   
    }

    renderFooter = () => {
        if (!this.state.isLoading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <Spinner color={colors.brandPrimary} />
            </View>
        );
    };

    render() {
        return (
            <Container>
                <TitleBar left={this.titleBarLeft()} body={this.titleBarBody()}></TitleBar>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            this.rowContent(item)
                        )}
                        onEndReachedThreshold={0.5}
                        keyExtractor={item => item.id}
                        ListFooterComponent={() => this.renderFooter()}
                        onEndReached={() => this.handleLoadMore()}
                        getItemLayout={(data, index) => (
                            { length: 80.5, offset: 80.5 * index, index }
                        )}
                    />
            </Container>
        );
    }
}

// Stylesheet
const styles = StyleSheet.create({
    titleBarContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.buttonBackground,
        margin: 5
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: "500"
    },
    listItem: {
        marginLeft: 0,
        padding: paddingHelpers.S
    }
});

const mapStateToProps = state => {
    return {
        token: state.session.token,
        company: state.session.company
    };
};

export default connect(mapStateToProps, {
    changeActiveScreen
})(Dashboard);