//@ts-nocheck
import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@mantine/core";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Geohash from "./components/Geohash";
import { tales } from "../../constants";

export const ManageGeohash = () => {
  const [location, setLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(1);
  const [nearbyGeohashes, setNearbyGeohashes] = useState([]);
  const [places, setPlaces] = useState(tales);

  const handleAccuracyChange = (event) => {
    setAccuracy(parseInt(event.target.value, 10));
  };

  const calculateBoxSize = () => {
    const dimensions = [
      59, 10, 3, 0.5, 0.09, 0.02, 0.0021, 0.0002, 0.00004, 0.00003, 0.00002,
      0.00001,
    ];

    return dimensions[accuracy - 1];
  };

  const handleGetNearbyGeohashes = () => {
    const myLocation = location.geohash;
    const nearby = places.map((place) => {
      const geohash = Geohash.encode(place.latitude, place.longitude, accuracy);
      return { ...place, geohash };
    });

    const filteredNearby = nearby.filter((place) => {
      const compareLength = accuracy - 1;
      const placePrefix = place.geohash.substring(0, compareLength);
      const myLocationPrefix = myLocation.substring(0, compareLength);

      return placePrefix === myLocationPrefix;
    });

    setNearbyGeohashes(filteredNearby);
    console.log("nearby are ", filteredNearby);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geohash = Geohash.encode(latitude, longitude, accuracy);
          setLocation({ latitude, longitude, geohash });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [accuracy]);

  return (
    <Box mx="lg">
      <Text align="center" fz="26px" fw={600}>
        Geohash App
      </Text>

      <Flex justify="center" mt="md">
        <Box>
          <label>
            Select Distance
            <select value={accuracy} onChange={handleAccuracyChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                <option key={value} value={value}>
                  {`${value} - ${
                    value === 1
                      ? "5000km"
                      : value === 2
                      ? "1250km"
                      : value === 3
                      ? "156km"
                      : value === 4
                      ? "39km"
                      : value === 5
                      ? "4.89km"
                      : value === 6
                      ? "1.22km"
                      : value === 7
                      ? "153m"
                      : value === 8
                      ? "38.2m"
                      : value === 9
                      ? "4.77m"
                      : "<3m"
                  } around me`}
                </option>
              ))}
            </select>
          </label>
          {location && (
            <div>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
              <p>Geohash: {location.geohash}</p>
            </div>
          )}
        </Box>
      </Flex>

      <Flex justify="center" align="center">
        <Button onClick={handleGetNearbyGeohashes}>Get Nearby tales</Button>
      </Flex>

      {location && (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            icon={L.icon({
              iconUrl: "/person.png",
              iconSize: [40, 40],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
            })}
            position={[location.latitude, location.longitude]}
          >
            <Popup>Your Location</Popup>
          </Marker>
          {/* Draw Rectangle around the location */}
          {/* <Rectangle
            bounds={[
              [
                location.latitude + calculateBoxSize(),
                location.longitude + calculateBoxSize(),
              ], //top,right
              [
                location.latitude - calculateBoxSize(),
                location.longitude - calculateBoxSize(),
              ], // -bottom, left
            ]}
          /> */}

          {nearbyGeohashes.map((place, index) => (
            <Marker
              icon={L.icon({
                iconUrl: "/tale.png",
                iconSize: [30, 30],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41],
              })}
              key={index}
              position={[place.latitude, place.longitude]}
            >
              <Popup>{place.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </Box>
  );
};
