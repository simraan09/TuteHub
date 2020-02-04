import React from 'react';
import {ScrollView,StyleSheet,TouchableOpacity,TextInput,Text, View,FlatList} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class QuestionScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            question:'',
            sid:this.props.navigation.state.params.id,
            data:[],
            refresh:false
        }
    }

    componentDidMount(){
        this.getQuestion();
    }

    getQuestion = async() =>{
        
        const {sid} = this.state;

        fetch('http://192.168.43.176:3000/getQuestion',{

            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                sid:sid
            })
        })
        .then((res)=>res.json())
        .then(resJson=>{
            this.setState({data:resJson});
            console.log(resJson)
        })
        .catch(e=>{console.log(e)})
    }

    sendQestion = async()=>{

        const {question,sid} = this.state;

        fetch('http://192.168.43.176:3000/sendQuestion',{

            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                question:question,
                sid:sid
            })
        })
        .catch((e)=>{console.log(e)})

        this.setState({question:''});
    }

    render(){
        if(this.state.refresh === true){this.getQuestion();this.setState({refresh:false})}
        return(
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{flex:1}}>
                <View style={styles.container}>
                    <TextInput
                        placeholder="Ask Anything...."
                        style={styles.infoField}
                        value={this.state.question}
                        onChangeText={(question)=>{this.setState({question:question,refresh:true})}}
                    />
                    <Text style={{fontWeight:'bold',fontSize:wp('5%')}} onPress={this.sendQestion}>Submit</Text>
                </View>
                <View style={{flex:1}}>
                <FlatList
                        data={this.state.data}
                        keyExtractor={(x,i) => i.toString()}
                        renderItem={({item}) => 
                                <View> 
                                    <Text style={{fontSize:wp('5%'),fontWeight:'bold',margin:wp('5%')}}>Q: {`${item.question}`}</Text>
                                </View>
                                }
                    />
                </View> 
            </ScrollView>
        );
        
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        margin:wp('5%')
    },
    infoField:{
        width:wp('90%'),
        borderBottomWidth:2,
        borderBottomColor:'rgb(180, 180, 180)'
    },
    answers:{
        flex:1,
        flexDirection:'row',
        height:hp('100%'),
        width:wp('100%'),
        marginTop:wp('5%'),
        backgroundColor:'red',
        alignItems:'flex-start'
    },
    question:{
        flex:1,
        flexDirection:'row',
        height:hp('100%'),
        width:wp('100%'),
        marginTop:wp('5%'),
        alignItems:'stretch',
        backgroundColor:'green'
    }
});

export default QuestionScreen;