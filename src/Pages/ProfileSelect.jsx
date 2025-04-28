import { useNavigate } from "react-router-dom";
import { getDestinyProfile } from "../services/bungieService";

const ProfileSelect = ({ playerProfiles, setCharacters }) => {
  const navigate = useNavigate();
  const PLATFROMS = {
    1: "Xbox",
    2: "PlayStation",
    3: "Steam",
    6: "EpicGames",
  };
  return (
    <div>
      {playerProfiles.map((profile) => (
        <div
          key={profile.membershipId}
          onClick={() =>
            getDestinyProfile(
              profile.membershipType,
              profile.membershipId
            ).then((data) => {
              setCharacters(data.characters.data);
              navigate("/characters/");
            })
          }
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundImage: `url(https://www.bungie.net${profile.emblemBackgroundPath})`,
            backgroundSize: "cover",
          }}
        >
          <img
            src={`https://www.bungie.net${profile.iconPath}`}
            alt={profile.displayName}
            style={{ width: "50px", height: "50px" }}
          />
          <div style={{ flex: 1 }}>
            <h3>{profile.displayName}</h3>
            <p>Platform: {PLATFROMS[profile.membershipType]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileSelect;
