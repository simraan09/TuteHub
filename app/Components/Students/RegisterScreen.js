import React from 'react';
import {ScrollView,View,TextInput,Text,TouchableOpacity,StyleSheet,ToastAndroid, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-material-dropdown';

class RegisterScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstName:'',
            lastName:'',
            courseName:'',
            email:'',
            password:'',
        }
    }

    submit = () =>{
        const {firstName,lastName,courseName,email,password} = this.state;

        if(firstName.length === 0 || lastName.length === 0 || courseName.length === 0 || email.length === 0 || password.length === 0){
            ToastAndroid.showWithGravityAndOffset(
                'Please fill the Field',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
              return;
        }

        fetch('http://192.168.8.187:3000/studentReg',{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                firstName:firstName,
                lastName:lastName,
                courseName:courseName,
                email:email,
                password:password,
            })
        })
        .then((response)=>response.json())
        .then(responseJson=>{
            if(responseJson['msg'] === 'inserted'){
                ToastAndroid.showWithGravityAndOffset(
                    'Register Successfully Completed!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                  );
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    'Register Failed!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                  );
            }

            this.setState({firstName:'',lastName:'',courseName:'',email:'',password:''});
        })
        .catch((e)=>{if(e){Alert.alert('Register Failed!')}})
    }

    headerUI = () =>{
        return(
            <View style={{height:hp('5%'),width:wp('100%'),backgroundColor:'rgb(0, 56, 80)'}}></View>
        );
    }

    render(){
        const data = [
            {value:'Information Technology'},
            {value:'Engineering'},
            {value:'Computer Science'},
            {value:'Business Science'}
        ];
        return(
            <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
                <this.headerUI/>
                <View style={styles.infoField}>
                    <Text style={styles.infoTxt}>First Name</Text>
                    <TextInput
                        value={this.state.firstName}
                        onChangeText={(firstName)=>{this.setState({firstName})}}
                        style={styles.field}
                    />
                    <Text style={styles.infoTxt}>Last Name</Text>
                    <TextInput
                        value={this.state.lastName}
                        onChangeText={(lastName)=>{this.setState({lastName})}}
                        style={styles.field}
                    />
                    <Text style={styles.infoTxt}>Course Name</Text>
                    <Dropdown
                        label="Select the Course"
                        data={data}
                        value={this.state.courseName}
                        onChangeText={(courseName)=>{this.setState({courseName})}}
                    />
                    <Text style={styles.infoTxt}>Email</Text>
                    <TextInput
                        value={this.state.email}
                        onChangeText={(email)=>{this.setState({email})}}
                        style={styles.field}
                    />
                    <Text style={styles.infoTxt}>Password</Text>
                    <TextInput
                        value={this.state.password}
                        onChangeText={(password)=>{this.setState({password})}}
                        secureTextEntry={true}
                        style={styles.field}
                    />
                    <TouchableOpacity onPress={this.submit} style={styles.btn}>
                        <Text style={styles.btnTxt}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    infoField:{
        margin:wp('5%')
    },
    infoTxt:{
        
        fontSize:wp('5%'),
        fontWeight:'bold',
        color:'rgb(0, 56, 80)',
        marginBottom:wp('3%')
    },
    field:{
        width:wp('80%'),
        height:hp('6%'),
        borderColor:'rgb(0, 61, 121)',
        borderWidth:2,
        borderRadius:5,
        marginBottom:wp('5%')
    },
    addressFiled:{
        width:wp('80%'),
        height:hp('6%'),
        borderBottomColor:'rgb(0, 61, 121)',
        borderBottomWidth:2,
        borderRadius:5,
        marginBottom:wp('3%')
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

export default RegisterScreen;