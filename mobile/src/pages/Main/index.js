import React, { useEffect, useState } from 'react';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import { Map } from './styles';

export default function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

    loadInitialPosition();
  }, []);

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  return (
    <Map 
      onRegionChangeComplete={handleRegionChanged}
      initialRegion={currentRegion}
    />
  );
}
