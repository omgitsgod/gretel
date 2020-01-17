import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import useGeolocation from './useGeolocation';
import {mapStyle} from '../constants';
import styles from '../style/Map';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
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
  const [latitude, setLatitude] = useState(40.758);
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
  let icon;

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

  if (focus) {
    icon = 'crosshairs-gps';
  } else {
    icon = 'crosshairs';
  }

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
          name={icon}
          type="material-community"
          size={50}
          color="#1ec5e3"
          onPress={focusOnMe}
          underlayColor="transparent"
        />
      </View>
    </View>
  );
};

export default Map;
