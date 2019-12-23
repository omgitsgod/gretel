import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import useGeolocation from './useGeolocation';
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
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
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
    Geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    const watchID = Geolocation.watchPosition(
      position => {
        const newCoordinate = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLatitude(newCoordinate.latitude);
        setLongitude(newCoordinate.longitude);
        setRouteCoordinates(routeCoordinates.concat(newCoordinate));
        setDistanceTravelled(distanceTravelled + calcDistance(newCoordinate));
        setPrevLatLng({latitude, longitude});
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000,
      },
    );
    return () => Geolocation.clearWatch(watchID);
  });

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
    }
  };

  const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]

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
            {latitude.toFixed(4)}|{longitude.toFixed(4)}{' '}
            {parseInt(distanceTravelled).toFixed(2)} mi
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.bubble, styles.button]}
          onPress={setDelta}>
          <Text style={styles.bottomBarContent}>Zoom Out</Text>
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
