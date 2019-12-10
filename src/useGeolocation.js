import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

export const useGeolocation = () => {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {});
};
