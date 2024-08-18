import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

// here we fetch the data from api tmdb

export const fetchFromTMDB = async (url)=> {
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`
    }
  }
  try {
    const response = await axios.get(url, options);
    console.log("Request URL:", url);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch data from TMDB: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data from TMDB:", error.message);
    throw new Error(`Error fetching data from TMDB: ${error.message}`);
  }

}


// export const fetchFromTMDB = async (url) => {
//   const options = {
//     headers: {
//       accept: 'application/json',
//       Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`
//     }
//   };

 
// };

