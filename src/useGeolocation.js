import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

export const useGeolocation = () => {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({coords}) => {
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  useEffect(() => {
    const id = Geolocation.watchPosition(onChange);

    return () => Geolocation.clearWatch(id);
  }, []);
  return {...location, error};
};
