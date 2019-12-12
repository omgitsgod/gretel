import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

export const useGeolocation = () => {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);

  const onChange = position => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      speed: position.coords.speed,
      heading: position.coords.heading,
      timestamp: position.timestamp,
    });
  };

  const onError = err => {
    setError(err.message);
  };

  useEffect(() => {
    const id = Geolocation.watchPosition(onChange, onError);

    return () => Geolocation.clearWatch(id);
  }, []);
  return {...location, error};
};
