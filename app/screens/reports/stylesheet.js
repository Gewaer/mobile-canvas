import { StyleSheet, Platform, Dimensions } from "react-native";
import {
    colors,
    paddingHelpers,
} from "../../config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export default StyleSheet.create({
    linkBTN: {
        color: colors.brandOrange,
        textDecorationLine: "underline",
        fontSize: 14
    },
    submitBtn: {
        backgroundColor: colors.brandRed,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: 280,
        alignSelf: 'center',
        height: 36
    },
    googleBtn: {
        backgroundColor: colors.gmail,
        width: '100%',
        alignItems: 'center'
    },
    googleText: {
        color: "#fff",
        textAlign: 'center',
        width: '100%'
    },
    facebookBtn: {
        marginTop: paddingHelpers.S,
        marginBottom: paddingHelpers.XS,
        backgroundColor: colors.facebook,
        width: '100%',
        alignItems: 'center'
    },
    facebookText: {
        color: "#fff",
        textAlign: 'center',
        width: '100%'
    },
    formItem: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.brandOrange,
        marginTop: 10,
        height: 29.5
    },
    titleBarContent: {
        color: "white",
        fontWeight: "600"
    },
    containerView: {
        marginBottom: paddingHelpers.XS,
        marginHorizontal: 12
    },
    containerViewBack: {
        flexGrow: 1,
        marginTop: paddingHelpers.XS,
        marginBottom: paddingHelpers.XS,
        paddingVertical: paddingHelpers.N, 
        backgroundColor: colors.brandWhite,
        alignItems: 'center',
        paddingHorizontal: paddingHelpers.N,
    },
    textContainer: {
        alignItems: "center",
        marginTop: 10,
        backgroundColor: "transparent"
    },
    divisionLine: {
        height: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.brandOrange
    }
});
