
import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
    );
    console.log("Fetched data:", data);

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];
    res.status(200).json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    console.error("Error in getTrendingTv:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTVTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    console.log("Fetched data:", data);

    res.status(200).json({
      success: true,
      trailers: data.results,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.error("Error in getTvTrailers:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    console.log("Fetched data:", data);

    res.status(200).json({
      success: true,
      content: data,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.error("Error in getTvDetails:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSimilarTvs = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    console.log("Fetched data:", data);

    res.status(200).json({
      success: true,
      similar: data.results
    });
  } catch (error) {
    console.error("Error in getSimilarTvs:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

 
export const getTvsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    console.log("Fetched data:", data);

    res.status(200).json({
      success: true,
      content: data.results
    });
  } catch (error) {
    console.error("Error in getTvByCategory:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};