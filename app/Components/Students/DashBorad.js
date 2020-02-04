import React from 'react';
import {ScrollView, StyleSheet,TouchableOpacity,Text,View} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:''
        }
        this.setId();
    }

    setId = async() =>{
        const ID = await AsyncStorage.getItem('id');
        this.setState({id:ID});
    }

    logout = async() =>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('SignIn');
    }

    addPostNavi = () =>{
        this.props.navigation.navigate('AddPost',{id:this.state.id});
    }

    readPostNavi = () =>{
        this.props.navigation.navigate('ReadPost',{id:this.state.id});
    }
    render(){
        return(
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={styles.container}>
                    <Text style={styles.heading}>Navigation Menu</Text>
                    <TouchableOpacity onPress={this.readPostNavi}><Text style={styles.items}>Read Post</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.addPostNavi} ><Text style={styles.items}>Add Post</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.logout}><Text>Logout</Text></TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:wp('40%')
    },
    heading:{
        fontWeight:'bold',
        fontSize:wp('7%'),
        marginBottom:wp('5%'),
        marginTop:wp('5%'),
        textDecorationLine:"underline"
    },
    items:{
        fontSize:wp('5%'),
        marginBottom:wp('3%'),
        marginTop:wp('3%'),
        color:'rgb(70, 70, 70)'
    }
});

export default Dashboard;