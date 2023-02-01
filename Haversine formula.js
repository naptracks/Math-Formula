
//Haversine formula => how to get distance betweenn 2 coordinates
// https://en.wikipedia.org/wiki/Haversine_formula


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const LocationScreen = () => {
  const [location, setLocation] = useState({});
  const [destination, setDestination] = useState({});
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => setLocation(position.coords),
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  useEffect(() => {
    if (Object.keys(location).length && Object.keys(destination).length) {
      const distance = getDistance(
        location.latitude,
        location.longitude,
        destination.latitude,
        destination.longitude
      );
      setDistance(distance);
    }
  }, [location, destination]);

  useEffect(() => {
    fetch('https://api.example.com/destination')
      .then((response) => response.json())
      .then((destination) => setDestination(destination));
  }, []);

  return (<View></View>)

}


