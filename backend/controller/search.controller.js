import { fetchFromTMDB } from "../services/tmdb.service.js";
import {User} from '../models/user.model.js';

export const searchPerson =async (req, res)=>{
  const { query } = req.params ;
  try {
  
    const response = await fetchFromTMDB (
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
      console.log("Fetched data:", response);
   
     
      if(response.results.length === 0){
      return res.status(404).send(null)
      }

      // add this to database 
      await User.findByIdAndUpdate(req.user._id, {
        $push:{
          searchHistory:{
            id: response.results[0].id,
            image: response.results[0].profile_path,
            title: response.results[0].name,
            searchType: "person",
            createdAt: new Date()

          },
        }
      })


      res.status(200).json({
        success: true,
        content: response.results,
      });

  
  } catch (error) {
  
    console.error("Error in searchPerson controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  
    
  }


}



export const searchMovie =async (req, res)=>{

  const {query} = req.params ;
try {

  const response = await fetchFromTMDB(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

    
    console.log("Fetched data:", response);
    if(response.results.length===0){
    return res.status(404).send(null)
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push:{
        searchHistory:{
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date()

        },
      }
    })



    res.status(200).json({
      success: true,
      content: response.results,
    });


} catch (error) {

  console.error("Error in searchMovie controller:", error.message);
  res.status(500).json({ success: false, message: "Internal server error" });

  
}
  

}

export const searchTv =async (req, res)=>{
  const {query} = req.params ;
  try {
  
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
  
      console.log("Fetched data:", response);
      if(response.results.length === 0){
      return res.status(404).send(null)
      }
      await User.findByIdAndUpdate(req.user._id, {
        $push:{
          searchHistory:{
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].name,
            searchType: "tv",
            createdAt: new Date()

          },
        }
      })

      res.status(200).json({
        success: true,
        content: response.results,
      });

      
  
  } catch (error) {
  
    console.error("Error in searchTv controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  
    
  }
  

}


export const getSearchHistory = async(req, res)=>{
  try {
    const searchHistory = (req.user.searchHistory || []).filter(entry => entry && typeof entry === 'object')

    const uniqueHistoryMap = new Map();
    searchHistory.forEach(entry => {
      const key = entry.title || entry.searchTerm;

      if (uniqueHistoryMap.has(key)) {
        const existingEntry = uniqueHistoryMap.get(key);
        if (new Date(entry.createdAt) > new Date(existingEntry.createdAt)) {
          uniqueHistoryMap.set(key, entry);
        }
      } else {
        // If the item is not in the map, add it
        uniqueHistoryMap.set(key, entry);
      }
    });

    const uniqueHistory = Array.from(uniqueHistoryMap.values());


    res.status(200).json({
      success: true,
      content: uniqueHistory,
    });
  } catch (error) {
    console.error("Error in getSearchHistory controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
    
  }

  
}

export const RemoveItemFromSearchHistory = async(req, res)=>{
  let {id} = req.params;
  id = parseInt(id);
  try {
   const user = await User.findByIdAndUpdate(req.user._id,{
      $pull:{
        searchHistory:{
          id: id
        },
      },
    });
    const removedItem = user.searchHistory.find(item => item.id === id);

    res.status(200).json({
      success: true,
      message: "item removed from search history", removedItem
    });

    
  } catch (error) {
    console.error("Error in RemoveItemFromSearchHistory controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
    
  }

}