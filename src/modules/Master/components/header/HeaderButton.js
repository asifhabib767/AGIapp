import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import topbar from '../../images/top-bar.png';

const HeaderButton = (props) => {

    console.log('props chekc', props);
    const { navigation } = props;
    return (

        <View style={[styles.postionbox]}>
            <ImageBackground style={[styles.topbar]} source={topbar} />
            <View style={[styles.headerDetails]}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <View style={{ flexBasis: '55%' }}>
                        <Text style={[styles.headerTitle]}> {props.title} </Text>
                        {props.subtitle && (
                            <Text style={[styles.headerSubTitle]}> {props.subtitle} </Text>
                        )}
                    </View>
                    {typeof props.btnName !== 'undefined' &&
                        <View style={{ flexBasis: '30%' }}>
                            <TouchableOpacity>
                                <Text
                                    style={[styles.buttonss]}
                                    size="medium"
                                    onPress={props.url}>
                                    {props.btnName}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }

                </View>
            </View>
        </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    postionbox: {
        position: 'relative',
        backgroundColor: '#1B2662',
        height: 120,
    },
    headerDetails: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    topbar: {
        marginTop: -0,
        width: width,
        height: height / 4,
        resizeMode: 'contain',
    },
    headerTitle: {
        color: '#fff',
        fontSize: RFPercentage(2.5),
        fontWeight: 'bold',
        textTransform: 'uppercase',
        paddingVertical: 10,
    },
    headerSubTitle: {
        color: '#fff',
        fontSize: RFPercentage(2),
    },
    iconbg: {
        backgroundColor: '#4E72B2',
        width: 100,
        height: 100,
        borderBottomLeftRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    iconstyle: {
        marginTop: -20,
        marginLeft: 20,
    },
    buttonss: {
        backgroundColor: '#19d4ee',
        borderColor: '#19d4ee',
        color: '#fff',
        borderRadius: 20,
        paddingVertical: 10,
        marginTop: 13,
        textAlign: 'center',
        fontWeight: 'bold'
    },

});

export default HeaderButton;
