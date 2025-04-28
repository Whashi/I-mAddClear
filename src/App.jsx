import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SearchProfile from "./Pages/SearchProfile";
import ProfileSelect from "./Pages/ProfileSelect";
import CharacterSelect from "./Pages/CharacterSelect";

//Whashi#9741

function App() {
  const [playerName, setPlayerName] = useState("Whashi#9741");
  const [playerProfiles, setPlayerProfiles] = useState([]);
  const [characters, setCharacters] = useState();

  const [recentActivity, setRecentActivity] = useState();

  return (
    <div
      style={{
        backgroundColor: "#282c34",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        I'm Add Clear
      </h1>
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "20px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >{playerName}</h2>
      <Routes>
        <Route
          path="/search"
          element={
            <SearchProfile
              playerName={playerName}
              setPlayerName={setPlayerName}
              setPlayerProfiles={setPlayerProfiles}
            />
          }
        />
        <Route
          path="/profiles/"
          element={
            <ProfileSelect
              playerProfiles={playerProfiles}
              setCharacters={setCharacters}
            />
          }
        />
        <Route
          path="/characters/"
          element={
            <CharacterSelect
              characters={characters}
              setCharacters={setCharacters}
            />
          }
        />
        {/* Add more routes as needed */}
        <Route path="/" element={<Navigate to="/search" />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
