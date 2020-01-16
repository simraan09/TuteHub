import {View} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class HeaderScreen extends React.Component{

    headerUI = () =>{
        return(
            <View style={{height:hp('5%'),width:wp('100%'),backgroundColor:'rgb(0, 56, 80)'}}></View>
        );
    }


    render(){
        return(
            <View ></View>
        );
    }
}

export default HeaderScreen;