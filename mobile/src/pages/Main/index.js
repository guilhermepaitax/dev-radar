import React, { useEffect, useState } from 'react';
import { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import { 
  Map,
  Container,
  SearchInput, 
  LoadButton, 
  Avatar, 
  DevInfo, 
  TextName, 
  TextBio, 
  TextTechs
} from './styles';

import api from '../../services/api';
import { subscribeToNewDevs, disconnect, connect } from '../../services/socket';

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');
  const [devs, setDevs] = useState([]);

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

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, []);

  function setupWebsocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(
      latitude,
      longitude,
      techs,
    );
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      latitude,
      longitude,
      techs,
    });

    setDevs(response.data);
    setupWebsocket();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <Map 
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
      >
        {devs.map(dev => (
          <Marker 
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],
            }}
          >
            <Avatar source={{ uri: dev.avatar_url }} />
            <Callout onPress={() => {
              navigation.navigate('Profile', { github_username: dev.github_username });
            }}>
              <DevInfo>
                <TextName>{dev.name}</TextName>
                <TextBio>{dev.bio}</TextBio>
                <TextTechs>{dev.techs.join(', ')}</TextTechs>
              </DevInfo>
            </Callout>
          </Marker>
        ))}
      </Map>
      <Container>
        <SearchInput
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <LoadButton onPress={loadDevs}>
          <MaterialIcons name="my-location" size={21} color="#fff" />
        </LoadButton>
      </Container>
    </>
  );
}
