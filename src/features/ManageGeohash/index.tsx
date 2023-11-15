//@ts-nocheck
import React, { useState, useEffect } from "react";
import Geohash from "./components/Geohash";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Button, Flex, Text } from "@mantine/core";

export const ManageGeohash = () => {
  const [location, setLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(1);
  const [nearbyGeohashes, setNearbyGeohashes] = useState([]);
  const [places, setPlaces] = useState([
    { name: "Tale 1", latitude: 40.7128, longitude: -74.006 },
    { name: "Tale 2", latitude: 33.47079, longitude: 73.14337 },
    { name: "Tale 3", latitude: 33.470721, longitude: 73.133475 },
    {
      name: "Tale 4",
      latitude: 33.5722943038902,
      longitude: 73.1462300397661,
    },
    {
      name: "Tale 5",
      latitude: 33.57926655556672,
      longitude: 73.15099364271371,
    },
    {
      name: "Tale 6",
      latitude: 33.59672505129952,
      longitude: 73.04890573306093,
    },
    {
      name: "Tale 7",
      latitude: 34.17610663543919,
      longitude: 72.02085572439508,
    },
    {
      name: "Tale 8",
      latitude: 30.135353522863145,
      longitude: 67.14152170478467,
    },
    {
      name: "Tale 9",
      latitude: 35.858381053931595,
      longitude: 74.38611916404477,
    },
    {
      name: "Tale 10",
      latitude: 33.57071305108311,
      longitude: 73.14352830013034,
    },
    {
      name: "Tale 11",
      latitude: 33.570781780854325,
      longitude: 73.13898159795295,
    },
    {
      name: "Tale 12",
      latitude: 33.23091880747727,
      longitude: 72.91684468322518,
    },
    {
      name: "Tale 13",
      latitude: 31.682687637435244,
      longitude: 72.24240052136597,
    },
    {
      name: "Tale 14",
      latitude: 32.95787538561305,
      longitude: 75.09350003048394,
    },
    {
      name: "Tale 15",
      latitude: 30.31211690067509,
      longitude: 74.92600538496755,
    },
    {
      name: "Tale 16",
      latitude: 27.154390390896197,
      longitude: 73.86893337048112,
    },
  ]);

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
          <Marker position={[location.latitude, location.longitude]}>
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
            <Marker key={index} position={[place.latitude, place.longitude]}>
              <Popup>{place.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </Box>
  );
};
