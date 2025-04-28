import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getDestinyProfile,
  getRecentActivities,
} from "../services/bungieService";

const CharacterSelect = ({ characters }) => {
  console.log(characters);
  const CLASS_TYPES = {
    0: "Titan",
    1: "Hunter",
    2: "Warlock",
  };
  const RACE_TYPES = {
    0: "Human",
    1: "Awoken",
    2: "Exo",
  };
  const GENDER_TYPES = {
    0: "Male",
    1: "Female",
  };

  return (
    <div>
      {Object.entries(characters).map(([key, value]) => (
        <div
          key={key}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundImage: `url(https://www.bungie.net${value.emblemBackgroundPath})`,
            backgroundSize: "cover",
          }}
          onClick={() => {
            console.log("Character clicked:", value);
            // Add any additional logic for character selection here
            getRecentActivities(
              value.membershipType,
              value.membershipId,
              value.characterId,
              20
            ).then((data) => {
              console.log("Recent activities:", data);
            });
          }}
        >
          <img
            src={`https://www.bungie.net${value.emblemPath}`}
            alt={value.name}
            style={{ width: "50px", height: "50px" }}
          />
          <div style={{ flex: 1 }}>
            <h3
              style={{
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              {CLASS_TYPES[value.classType]}
            </h3>
            <p
              style={{
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              {value.light} Light Level
            </p>
            <p
              style={{
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              {RACE_TYPES[value.raceType]} {GENDER_TYPES[value.genderType]}
            </p>
            <p
              style={{
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            ></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterSelect;
