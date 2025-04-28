import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchDestinyPlayer } from "../services/bungieService";

const SearchProfile = ({ playerName, setPlayerName, setPlayerProfiles }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}>
      <input
        type="text"
        placeholder="Enter player name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button
        onClick={() => {
          searchDestinyPlayer(playerName).then((data) => {
            if (!data) {
              setPlayerProfiles([]);
              setError(
                "Player not found. Please check the name and try again."
              );
              return;
            }
            console.log(data);
            if (data.membershipType.length > 1) {
              setPlayerProfiles(data.membershipType);
              navigate("/profiles/")
            }
          });
        }}
      
      style={{
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s",
      }}>
        Search Destiny Player
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SearchProfile;
