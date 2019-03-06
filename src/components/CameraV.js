import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Button, PermissionsAndroid} from 'react-native';
import { getPhoto, getGpsAsync } from '../action'
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

const mapToProps = (state) => {
  return {state};
}

class CameraV extends Component {
  state = {
    pickedImage: null
  }

  componentDidMount(){
    if(this.props.state.where.latitude === null){
      console.log(this.props.state.where.latitude);
      this.onTakeGpsInfo();
    }
  } 

  // get GpsInfo
  onTakeGpsInfo = () => {
        const { dispatch } = this.props;
        dispatch(getGpsAsync());
  }

  onPickImage = () => {
    ImagePicker.showImagePicker({title: "Image Picker"}, (responce)=>{
        if(responce.didCancel){
          console.log("User Canceled");
         } else if (responce.error) {
          console.log(error.message);
        } else {
          console.log(responce.uri);
          const { dispatch } = this.props;
          dispatch(getPhoto(responce.uri));
        }
    })
  }

  // navigate to MapScreen
  navigateToMap = ()=> {
    if(this.props.state.photo !== null){
      console.log(this.props.state.photo);
      return this.props.navigation.navigate('MapScreen');
    }
  }

  render() {
    const { photo }  = this.props.state;      
    const { latitude, longitude }  = this.props.state.where;    
    console.log(latitude);
    console.log(longitude);
      
    return (
      <View style={styles.container}>      
          <View style={styles.imageContainer}>
          <Image source={photo ? {uri: photo}: require('../img/imageDefault.png')} style={styles.imgStyle}></Image>
          </View>

          <View style={styles.buttonMap}>
          <Button
            onPress={this.onPickImage.bind(this)}
            title="Pick Image"
            color="#841584"/>
            </View>
            {photo && 
            <View style={styles.buttonMap}>
              <Button 
                onPress={this.navigateToMap}
                title="Show on the Map"
                color="#841584">
              </Button>
            </View>}
          {photo && 
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>You made a photo in location:{'\n'} lat:${latitude} {'\n'} lon:${longitude}</Text>
          </View>
          }
    </View>
    );
  }
}

export default connect(mapToProps)(CameraV);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  imgStyle: {
    width: '100%',
    height: '100%'
  },
  buttonMap: { 
    marginTop: 20,
  },
  infoView: {
    flex: 1, 
    flexDirection: 'row',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 300,
    backgroundColor: '#E7EAED'
  },
  textStyle:{
    textAlign: 'center',
    marginTop: 20,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
