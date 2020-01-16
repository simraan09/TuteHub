import React from 'react';
import {ScrollView,View,Text,TextInput,StyleSheet,ImageBackground, TouchableOpacity,ToastAndroid, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-material-dropdown';

class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            role:'',
            id:'',
            password:''
        }
    }

    login = () =>{

        const {id,password} = this.state;
        
        if(id.length === 0 || password.length === 0){
            ToastAndroid.showWithGravityAndOffset(
                'Please fill the Field',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
            return
        }

        let url = '';

        if(this.state.role === 'Teacher'){
            url = 'http://192.168.8.187:3000/teacherLogin'
        }else{
            url = 'http://192.168.8.187:3000/studentLogin'
        }

        fetch(url,{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                id:id,
                password:password
            })
        })
        .then((res)=>res.json())
        .then(resJson=>{
            if(resJson['msg'] === 'not'){
                ToastAndroid.showWithGravityAndOffset(
                    'User Id or Password Error',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            }else{
                alert('Success');
            }
            this.setState({id:'',password:''});
        })
        .catch((e)=>{Alert.alert('Faield try again!')})
    }

    render(){
        const data = [
            {value:'Teacher'},
            {value:'Student'}
        ];
        return(
            <ImageBackground style={{width:wp('100%'),height:hp('100%')}} source={{uri:'https://images.pexels.com/photos/159497/school-notebook-binders-notepad-159497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}>
            <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
                <View style={styles.infoField}>
                    {this.state.role ? null :(
                        <Dropdown
                            label="Select the role"
                            data={data}
                            onChangeText={(role)=>{this.setState({role})}}
                            baseColor="rgb(255, 255, 255)"
                            itemTextStyle={{fontWeight:'bold'}}
                            labelFontSize={21}
                            fontSize={21}
                        />
                    )}

                    {!this.state.role ? null :(
                        <TextInput
                            placeholder="User ID"
                            value={this.state.id}
                            onChangeText={(id)=>{this.setState({id})}}
                            placeholderTextColor="rgb(0,0,0)"
                            style={styles.field}
                        />
                    )}
                    {!this.state.role ? null :(
                        <TextInput
                            placeholder="Password"
                            value={this.state.password}
                            onChangeText={(password)=>{this.setState({password})}}
                            placeholderTextColor="rgb(0,0,0)"
                            style={styles.field}
                            secureTextEntry={true}
                        />
                    )}
                    {!this.state.role ? null :(
                        <TouchableOpacity onPress={this.login} style={styles.btn}>
                            <Text style={styles.btnTxt}>Login</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    infoField:{
        margin:wp('5%'),
        marginTop:hp('40%'),
        justifyContent:'center',
    },
    field:{
        backgroundColor:'rgba(255,255,255,0.6)',
        width:wp('80%'),
        height:hp('6%'),
        marginBottom:wp('5%'),
        borderRadius:5
    },
    btn:{
        backgroundColor:'rgb(221, 131, 0)',
        height:hp('5%'),
        width:wp('50%'),
        borderRadius:5
    },
    btnTxt:{
        color:'rgb(255,255,255)',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:wp('5%')
    }
});

export default LoginScreen;