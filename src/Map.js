import React, {useState, useEffect} from 'react';
import {Icon, Button} from 'react-native-elements';
import useGeolocation from './useGeolocation';
import {mapStyle} from './constants';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import haversine from 'haversine';
import Geolocation from '@react-native-community/geolocation';

const Map = () => {
  const [latitude, setLatitude] = useState(40.7580);
  const [longitude, setLongitude] = useState(-73.9855);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [prevLatLng, setPrevLatLng] = useState({});
  const [marker, setMarker] = useState(false);
  const [delta, setDelta] = useState(0.009);
  const [focus, setFocus] = useState(true);
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
    }),
  );

  useEffect(() => {
    requestLocation();
  }, []);

  const focusOnMe = () => {
    if (focus) {
      setFocus(false);
    } else {
      setFocus(true);
    }
  };

  const requestLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log(granted);
  };

  const calcDistance = newLatLng => {
    return haversine(prevLatLng, newLatLng) / 1.609344 || 0;
  };

  const setLatLng = x => {
    if (focus) {
      let tempCoord = x.nativeEvent.coordinate;
      setLatitude(tempCoord.latitude);
      setLongitude(tempCoord.longitude);
      setRouteCoordinates(routeCoordinates.concat(tempCoord));
      setDistanceTravelled(distanceTravelled + calcDistance(tempCoord));
      setPrevLatLng({latitude, longitude});
      console.log(routeCoordinates);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        followsUserLocation={true}
        loadingEnabled
        onUserLocationChange={setLatLng}
        showsTraffic={true}
        showsMyLocationButton
        zoomEnabled
        zoomControlEnabled
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}
        customMapStyle={mapStyle}>
        <Polyline coordinates={routeCoordinates} strokeWidth={5} />
        <Marker.Animated
          draggable
          ref={x => setMarker(x)}
          coordinate={coordinate}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.bubble, styles.button]}>
          <Text style={styles.bottomBarContent}>
            {parseInt(distanceTravelled).toFixed(2)} mi
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.crossHair}>
        <Icon
          name="crosshairs"
          type="material-community"
          size={50}
          color="#1ec5e3"
          onPress={focusOnMe}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  crossHair: {
    position: 'absolute',
    bottom: 20,
    right: 0,
  },
});

export default Map;
