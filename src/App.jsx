import { useState, useEffect } from "react";

function App() {
  const BUNGIE_API_KEY = import.meta.env.VITE_BUNGIE_API_KEY;

  const PLATFROMS = {
    Xbox: 1,
    PlayStation: 2,
    Steam: 3,
    EpicGames: 6,
  };

  const [recentActivity, setRecentActivity] = useState();

  const searchDestinyPlayer = async (playerName) => {
    console.log("Searching for player:", playerName);

    const formattedName = playerName.trim().replace("#", "%23");

    try {
      console.log(BUNGIE_API_KEY);
      const response = await fetch(
        `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/1/${formattedName}/`,
        {
          headers: {
            "X-API-Key": `${BUNGIE_API_KEY}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          data: data,
        });
        throw new Error(`API Error: ${data.Message || "Unknown error"}`);
      }
      console.log("Search response:", data);

      if (data.Response.length > 0) {
        return {
          membershipType: data.Response[0].membershipType,
          membershipId: data.Response[0].membershipId,
        };
      } else {
        console.log("Player not found");
        return null;
      }
    } catch (error) {
      console.error("Error searching for player:", error);
      throw error;
    }
  };

  const getDestinyProfile = async (playerName) => {
    const player = await searchDestinyPlayer(playerName);
    if (player) {
      const response = await fetch(
        `https://www.bungie.net/Platform/Destiny2/${player.membershipType}/Profile/${player.membershipId}/?components=200`,
        {
          headers: {
            "X-API-Key": BUNGIE_API_KEY,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    }
  };

  // getDestinyProfile("Whashi#9741");

  const getRecentActivities = async (playerName) => {
    const player = await searchDestinyPlayer(playerName);
    if (player) {
      console.log(player);

      const profileResponse = await fetch(
        `https://www.bungie.net/Platform/Destiny2/${player.membershipType}/Profile/${player.membershipId}/?components=200`,
        {
          headers: {
            "X-API-Key": BUNGIE_API_KEY,
          },
        }
      );

      const profileData = await profileResponse.json();
      const characterId = Object.keys(profileData.Response.characters.data)[0];

      const response = await fetch(
        `https://www.bungie.net/Platform/Destiny2/${player.membershipType}/Account/${player.membershipId}/Character/${characterId}/Stats/Activities/?count=20`,
        {
          headers: {
            "X-API-Key": BUNGIE_API_KEY,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRecentActivity(data.Response.activities[0].activityDetails.instanceId);
    }
  };

  useEffect(() => {
    getRecentActivities("Whashi#9741");
  }, []);

  const getPostGameCarnageReport = async (activityId) => {
    const response = await fetch(
      `https://stats.bungie.net/Platform/Destiny2/Stats/PostGameCarnageReport/${activityId}/`,
      {
        method: "GET",
        headers: {
          "X-API-Key": BUNGIE_API_KEY,
          "Content-Type": "application/json",
          Origin: window.location.origin,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.ErrorCode === 1) {
      return data.Response;
    } else {
      console.error("Error fetching Post Game Carnage Report:", data);
      throw new Error("Error fetching Post Game Carnage Report");
    }
  };

  return (
    <>
      <h1>I'm Add Clear</h1>
      <button
        onClick={() => {
          getDestinyProfile("Whashi#9741");
        }}
      >
        Get Destiny Profile
      </button>
      <button
        onClick={() => {
          getRecentActivities("Whashi#9741");
        }}
      >
        Get Recent Activities
      </button>
      <button
        onClick={() => {
          getPostGameCarnageReport(recentActivity);
        }}
      >
        Get Post Game Carnage Report
      </button>
    </>
  );
}

export default App;
