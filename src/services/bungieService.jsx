const BUNGIE_API_KEY = import.meta.env.VITE_BUNGIE_API_KEY;

if (!BUNGIE_API_KEY) {
  console.error(
    "BUNGIE_API_KEY is not defined. Please set it in your environment variables."
  );
}

const BASE_URL = "https://www.bungie.net/Platform";

export const searchDestinyPlayer = async (name) => {
  console.log("Searching for player:", name);

  const formattedName = name.trim().replace("#", "%23");

  try {
    const response = await fetch(
      `${BASE_URL}/Destiny2/SearchDestinyPlayer/-1/${formattedName}/`,
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
        membershipType: data.Response,
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

export const getDestinyProfile = async (membershipType, membershipId) => {
  const response = await fetch(
    `${BASE_URL}/Destiny2/${membershipType}/Profile/${membershipId}/?components=200`,
    {
      headers: {
        "X-API-Key": BUNGIE_API_KEY,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data.Response;
};

export const getRecentActivities = async (
  membershipType,
  membershipId,
  characterId,
  count
) => {
  const response = await fetch(
    `${BASE_URL}/Destiny2/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/Activities/?count=${count}`,
    {
      headers: {
        "X-API-Key": BUNGIE_API_KEY,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data.Response.activities[0].activityDetails.instanceId;
};

export const getPostGameCarnageReport = async (activityId) => {
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
