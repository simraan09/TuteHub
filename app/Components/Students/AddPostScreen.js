import React from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,Platform,TextInput} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class AddPostScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
            postName:'',
            path:'',
            sid:this.props.navigation.state.params.id,
            timeDate: new Date(),
            cid:'',
            photo:null
        }
        this.getCourseId();
    }

    postDetails = async() =>{
        
        const {postName,path,sid,timeDate,cid} = this.state;

        fetch('http://192.168.43.176:3000/postDetails',{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                postName:postName,
                path:path,
                sid:sid,
                timeDate:timeDate,
                cid:cid
            })
        })
    }

    uploadImage = () =>{

        const createFormData = (photo,body) => {

            const data = new FormData();
          
            data.append("photo", {
              name: photo.fileName,
              type: photo.type,
              uri:
                Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
            });
          
            Object.keys(body).forEach(key => {
              data.append(key, body[key]);
            });
          
            return data;
          };
      
          fetch("http://192.168.43.176:3000/upload", {

            method: "POST",
            body: createFormData(this.state.photo,{id:this.state.sid})
          })
            .then(response => response.json())
            .then(response => {
              console.log("upload succes", response);
              alert("Upload success!");
              this.setState({postName:''});
              this.setState({ photo: null });
            })
            .catch(error => {
              console.log("upload error", error);
              alert("Upload failed!");
            });

            this.postDetails();
    }

    selectImage = () =>{
        const options = {
            noData: true,
          }
          ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
              this.setState({ photo: response })
              console.log(this.state.photo.fileName);
              this.setState({path:response.fileName});
            }
          })
    }

    getCourseId = async() =>{
        
        const {sid} = this.state;

        fetch('http://192.168.43.176:3000/studentCourse',{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({sid:sid})
        })
        .then((res)=>res.json())
        .then(resJson=>{
            this.setState({cid:resJson['cid']});
        })
        .catch((e)=>{if(e){console.log(e)}})
    }

    render(){
        const {photo} = this.state;
        return(
            <View style={styles.container}>
                <TextInput
                    placeholder="Enter about post..."
                    style={styles.aboutPost}
                    value={this.state.postName}
                    onChangeText={(postName)=>{this.setState({postName})}}
                />
                {photo && (
                    <React.Fragment>
                        <Image
                            source={{uri:photo.uri}}
                            style={{width:wp('50%'),height:hp('40%')}}
                        />
                        <TouchableOpacity onPress={this.uploadImage} style={styles.uploadBtn}><Text style={styles.uploadTxt}>Upload</Text></TouchableOpacity>
                    </React.Fragment>
                )}
                <TouchableOpacity style={styles.selectBtn} onPress={this.selectImage}><Text style={styles.selectTxt}>Select Photo</Text></TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    selectTxt:{
        fontWeight:'bold',
        fontSize:wp('5%'),
        textAlign:'center',
        color:'rgb(255,255,255)'
    },
    selectBtn:{
        backgroundColor:'rgb(0, 67, 87)',
        height:hp('5%'),
        width:wp('40%'),
        borderRadius:wp('2%'),
        marginTop:wp('2%'),
        marginBottom:wp('2%')
    },
    uploadTxt:{
        fontSize:wp('5%'),
        fontWeight:'bold',
        textAlign:'center',
        color:'rgb(255,255,255)'
    },
    uploadBtn:{
        backgroundColor:'rgb(0, 137, 87)',
        height:hp('5%'),
        width:wp('40%'),
        borderRadius:wp('2%'),
        marginTop:wp('2%'),
        marginBottom:wp('2%')
    },
    aboutPost:{
        width:wp('60%'),
        height:hp('5%'),
        marginBottom:wp('5%'),
        borderBottomWidth:1
    }
});

export default AddPostScreen;
