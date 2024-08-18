


import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import axios from "axios";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
  if (!dateString) return "Date not available"; // Fallback for missing dates
  const date = new Date(dateString);
  const monthnames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const year = date.getUTCFullYear();
  const month = monthnames[date.getUTCMonth()];
  const day = date.getUTCDate();
  return `${month} ${day}, ${year}`;
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        console.log("response is ", res);

        const uniqueHistoryMap = new Map();
        res.data.content.forEach((entry) => {
          const key = entry.title || entry.searchTerm; // Use title or searchTerm as the unique identifier

          if (uniqueHistoryMap.has(key)) {
            const existingEntry = uniqueHistoryMap.get(key);
            if (new Date(entry.createdAt) > new Date(existingEntry.createdAt)) {
              uniqueHistoryMap.set(key, entry);
            }
          } else {
            uniqueHistoryMap.set(key, entry);
          }
        });

        setSearchHistory(Array.from(uniqueHistoryMap.values()));
      } catch (error) {
        console.error("Error fetching search history:", error);
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete =async(entry)=>{
    try {
       await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));

    } catch (error) {
      console.error("Error deleting search history:", error);
      toast.error("Failed to delete search Item")
    } 

  }


  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No Search History Found</p>
          </div>
        </div>
      </div>
    );
  }

return (
  <div className="bg-black text-white min-h-screen">
    <Navbar />
    <div className="max-w-6xl mx-auto mb-8">
      <h1 className="text-3xl font-bold mb-8">Search History</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {searchHistory?.map((entry) => (
          <div
            className="bg-gray-800 p-4 rounded flex items-start"
            key={entry.id || entry.createdAt}  // Fallback key
          >
            <img
              src={entry.image ? SMALL_IMG_BASE_URL + entry.image : 'default-image.png'}  // Fallback image
              className="w-16 h-16 rounded-full object-cover mr-4"
              alt={entry.title || "History Image"}  
            />

            <div className="flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col">
                  <span className="text-white text-lg">{entry.title || 'Untitled'}</span>
                  <span className="text-gray-400 text-sm">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>

                <div className="flex items-center">
                  <span
                    className={`py-1 px-3 min-w-20 text-center rounded-full text-sm mr-4 ${
                      entry.searchType === "movie"
                        ? "bg-red-600"
                        : entry.searchType === "tv"
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}
                  >
                    {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
                  </span>

                  <Trash
                    className="size-5 cursor-pointer hover:fill-red-600 hover:text-red-600"
                    onClick={() => handleDelete(entry)}
                  />
                </div>
              </div>
            </div> 
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default SearchHistoryPage;

