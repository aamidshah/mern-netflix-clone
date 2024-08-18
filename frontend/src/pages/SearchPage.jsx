import React, { useState } from 'react'
import { useContentStore } from '../store/content';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const {setContentType} = useContentStore()

  const hanldeTabClick = (tab) =>{
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie"): setContentType("tv")
    setSearchResults([])


  }

const  handleSearch = async (e) =>{
  e.preventDefault();
  try {
    const res = await axios.get( `/api/v1/search/${activeTab}/${searchQuery}`);
    setSearchResults(res.data.content)

    
  } catch (error) {
    if(error.response.status === 404){
      toast.error("Nothing found, make sure you are searching under the right category")
    }else{
      toast.error("Something went wrong")
    }
    
  }
  }




  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-center gap-3 mb-4'>
          <button className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600": "bg-gray-800"} hover:bg-red-700`}
          onClick={()=>hanldeTabClick("movie")} 
          
          >
        Movies
          </button>

          <button className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600": "bg-gray-800"} hover:bg-red-700`}
          onClick={()=>hanldeTabClick("tv")}          
          >
        Tv Shows
          </button>

          <button className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600": "bg-gray-800"} hover:bg-red-700`}
          onClick={()=>hanldeTabClick("person")} 
          >
        Person
          </button>
        </div>
        {/* creaye a form */}

        <form  className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch} >
        
          <input  
          type="text"
          placeholder={'Search for a  ' + activeTab}
          className='bg-gray-800 text-white p-2 rounded w-full'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button className='bg-red-600 hover:bg-red-700 text-white p-2  rounded'>
            <Search className="size-6" />
            
            </button>

</form>
<div className='grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2  lg:grid-cols-4' >
{searchResults.map((result)=>{
  if(!result.poster_path && !result.profile_path) return null;
  return (

    <div className='bg-gray-800 rounded p-4' key={result.id}>
      {
        activeTab === "person" ? (
          <div to={"/actor/" + result.name} className='flex flex-col items-center'>
            <img src={ORIGINAL_IMG_BASE_URL + result.profile_path}
             alt={result.name} 
             className='max-h-96 rounded mx-auto' />
            <h2 className='mt-2 text-xl from-bold'>{result.name}</h2>
          </div> 

        ):(
          <Link to={"/watch/" + result.id} onClick={()=>setContentType(activeTab)} >
            <img src={ORIGINAL_IMG_BASE_URL + result.poster_path}
             alt={result.title || result.name} 
             className='w-full h-auto rounded' />
            <h2 className='mt-2 text-xl from-bold'>{result.title}</h2>
          </Link> 


        )}
  
    </div>

  )
})}

  
</div>

      </div>

    </div>
  )
}

export default SearchPage
