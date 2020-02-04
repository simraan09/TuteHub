import React from 'react';
import {View,StyleSheet,Text,TextInput,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity, Alert,ToastAndroid} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class ReadPostScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            sid:this.props.navigation.state.params.id,
            isLoading:true,
            data:[],
            comments:'',
            commentsOn:'',
            isShow:false,
            commentsOnPost:''
        }
    }

    componentDidMount(){
        this.getPostData();
    }

    commentData = async() =>{

        const {comments,commentsOn,sid} = this.state;

        if(comments.length === 0){
            Alert.alert('Please Write Some Comments!!');
            return;
        }

        fetch('http://192.168.43.176:3000/addComments',{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                comments:comments,
                commentsOn:commentsOn,
                sid:sid
            })
        })
        .then((res)=>res.json())
        .then(resJson=>{
            if(resJson['msg'] === 'falied'){
                Alert.alert('Failed! Try again');
                return;
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    'Saved!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                )
            }
            this.setState({comments:''});
        })
        .catch((e)=>{if(e){Alert.alert('Failed! Try again');}})

    }

    async viewComments(pid){

        this.setState({isShow:true});

        fetch('http://192.168.43.176:3000/getComments',{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                pid:pid
            })
        })
        .then((res)=>res.json())
        .then(resJson=>{
            this.setState({commentsOnPost:resJson[0].comments});
            console.log(resJson[0].comments)
        })
        .catch(e=>{if(e)console.log(e)})
    }

    getPostData = async() =>{

        fetch('http://192.168.43.176:3000/getPostData',{
            method:'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((res)=>res.json())
        .then(resJson=>{
            this.setState({data:resJson});
            this.setState({isLoading:false});
        })
        .catch((e)=>{if(e){alert('Error!')}})
    }

    render(){
        if(this.state.isLoading === true){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large"/>
                    <StatusBar barStyle="default" />
                </View>
            );
        }
        return(
            <View style={styles.conatiner}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(x,i) => i.toString()}
                    renderItem={({item}) => 
                                <View style={styles.infoContainer}> 
                                    <Text style={styles.info}>About: {`${item.name}`}</Text>
                                    <Image
                                        source={{uri:'https://storage.googleapis.com/tutue-hub_uploads/'+item.path}}
                                        style={{width:wp('50%'),height:hp('40%')}}
                                    />
                                     <Text style={styles.info}>Posted at: {`${item.timeDate.slice(0,10)}`}</Text>
                                     <TextInput
                                        placeholder="Write  Comments..."
                                        value={this.state.comments}
                                        onChangeText={(comments)=>{this.setState({comments:comments,commentsOn:item.pid})}}
                                        style={styles.commentsBox}
                                     />
                                     <TouchableOpacity onPress={this.commentData}><Text style={styles.submitTxt}>Submit</Text></TouchableOpacity>
                                     <TouchableOpacity onPress={()=>{this.viewComments(item.pid)}}><Text style={styles.viewTxt}>View Comments</Text></TouchableOpacity>
                                     {this.state.isShow && (
                                     <React.Fragment>
                                         <Text style={{fontWeight:'bold',color:'rgb(0, 93, 49)',fontSize:wp('4%')}}>{this.state.commentsOnPost}</Text>
                                         <Text style={styles.viewTxt} onPress={()=>{this.setState({isShow:false})}}>Hide</Text>
                                     </React.Fragment>)}
                                </View>
                                }
                />
            </View>
        );
    }

}



const styles = StyleSheet.create({
    conatiner:{
        flex:1,
    },
    infoContainer:{
        flex:1,
        justifyContent:'center',
        margin:wp('5%')
    },
    info:{
        marginBottom:wp('2%'),
        marginTop:wp('2%'),
        fontSize:wp('5%')
    },
    commentsBox:{
        borderRadius:5,
        borderWidth:2,
        borderColor:'rgb(180, 180, 180)',
        height:hp('6%')
    },
    submitTxt:{
        fontWeight:'bold',
        marginTop:wp('2%'),
        fontSize:wp('5%')
    },
    viewTxt:{
        fontWeight:'bold',
        fontSize:wp('5%'),
        margin:wp('3%')
    }
});

export default ReadPostScreen;
