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
  }, []);

  const requestLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log(granted);
  };

  const calcDistance = newLatLng => {
    return haversine(prevLatLng, newLatLng) || 0;
  };

  return (
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
});

export default Map;
