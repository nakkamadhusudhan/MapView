import React, { Component } from "react";
import { StyleSheet, View,KeyboardAvoidingView,StatusBar, TouchableOpacity, Platform,Button} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from "react-native-maps";
import Polyline from '@mapbox/polyline';

// import RNGooglePlaces from 'react-native-google-places';

import {SearchBar,Icon} from 'react-native-elements';

import MapViewDirections from 'react-native-maps-directions';

//const GOOGLE_MAPS_APIKEY = 'AIzaSyCdiSSXQtpJdAZr6X7uBqdQY3cLVQSX1pU';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error:null,
      coords: [],
    };

  }
    //current location
    getCurrentLocation = ()=>{
      navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
                  error: null,
            });
           console.log(this.state);
      });
    }

    // componentDidMount() {
    //   this.getDirections("55.23607109335242, 10.478553771972656", "55.178279530181264, 10.525074005126953");
    //   this.getDirections("55.067434, 10.607282", "55.093088, 10.588734");
    //   }

    //   async getDirections(startLoc, destinationLoc) {
    //     try {
    //         let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&mode=${walking}`)
    //         let respJson = await resp.json();
    //         let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    //         let coords = points.map((point, index) => {
    //             return  {
    //                 latitude : point[0],
    //                 longitude : point[1]
    //             }
    //         })
    //         this.setState({coords: coords})
    //         return coords
    //     } catch(error) {
    //         alert(error)
    //         return error
    //     }
    // }

    // //Searching Places
    // openSearchModal() {
    //   RNGooglePlaces.openPlacePickerModal()
    //   .then((place) => {
    //       console.log(place);
    //       // place represents user's selection from the
    //       // suggestions and it is a simplified Google Place object.
    //   })
    //   .catch(error => console.log(error.message));  // error is a Javascript Error object
    // }

  render() {
    return (
      <View style={styles.overallViewContainer}>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          region={{
            latitude:12.956033,
            longitude:77.709168,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        > 
         <MapView.Marker 
            coordinate={{
              latitude:12.956033,
              longitude:77.709168,
            }}
            title={'My marker title'}
            description={'My marker description'}
            showsUserLocation={true}
         />
       
       <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>

        </MapView>
        <TouchableOpacity onPress={() => this.openSearchModal()} >
          <SearchBar
              ref='searchBar'
              placeholder='Find me'
              barStyle="blue"
              underlineColorAndroid='transparent'
              showsCancelButtonWhileEditing={false}
            >
            </SearchBar>
        </TouchableOpacity>
          
          <View style={{ 
            flex:1,
            marginTop:450,
            marginRight:5,
            flexDirection:'column-reverse',
            alignItems: 'flex-end',
           justifyContent:'flex-end'
            }} >
          <Icon name="directions" size={40} />
          <Icon name="my-location" size={40} onPress={this.getCurrentLocation}/>
          </View>
         
      </View>
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
   
  },
  allNonMapThings: {
    alignItems: "center",
    height: "100%",
    width: "100%"
  },

  overallViewContainer: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  input: {
    elevation: 1,
    width: "99%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto"
  }
});