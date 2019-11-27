import React, {useState, useEffect} from 'react';
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
  const [latitude, setLatitude] = useState(40.720843200000004);
  const [longitude, setLongitude] = useState(-73.9798174);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [prevLatLng, setPrevLatLng] = useState({});
  const [marker, setMarker] = useState(false);
  const [delta, setDelta] = useState(0.009);
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
    const watchID = Geolocation.watchPosition(
      position => {
        const newCoordinate = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        if (Platform.OS === 'android') {
          if (marker) {
            marker._component.animateMarkerToCoordinate(newCoordinate, 500);
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
        setLatitude(newCoordinate.latitude);
        setLongitude(newCoordinate.longitude);
        setRouteCoordinates(routeCoordinates.concat(newCoordinate));
        setDistanceTravelled(distanceTravelled + calcDistance(newCoordinate));
        setPrevLatLng({latitude, longitude});
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
    return Geolocation.clearWatch(watchID);
  }, []);

  const requestLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log(granted);
  };

  const calcDistance = newLatLng => {
    return haversine(prevLatLng, newLatLng) / 1.609344 || 0;
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showUserLocation
        followUserLocation
        loadingEnabled
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}>
        <Polyline coordinates={routeCoordinates} strokeWidth={5} />
        <Marker.Animated ref={x => setMarker(x)} coordinate={coordinate} />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.bubble, styles.button]}>
          <Text style={styles.bottomBarContent}>
            {parseFloat(distanceTravelled).toFixed(2)} mi
          </Text>
        </TouchableOpacity>
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
    flex: 1,
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
});

export default Map;
