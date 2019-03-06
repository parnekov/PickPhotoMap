import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const mapToProps = (state) => {
  return {state};
}

class MapV extends Component {
  constructor(props){
    super(props);
    this.state = {
      isReady: false
    }
  }

  // function call when the map is completed
  onMapLayout = () => {
    this.setState({isReady: true})
  }
  
  render() {
    const { latitude, longitude } = this.props.state.where;
    return (
      <View style={styles.container}>
        {latitude && 
          <MapView 
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{latitude,
                    longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1}}
            onLayout={this.onMapLayout}> 
          
            {this.state.isReady && 
              <MapView.Marker 
                coordinate={{
                    latitude,
                    longitude,}}
                title={'My market'}
                description={'My description'}/>}
          </MapView>}
      </View>
    );
  }
}

export default connect(mapToProps) (MapV);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    width,
    height
  }
});
