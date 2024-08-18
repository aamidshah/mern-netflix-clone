
import React from 'react'
import { useState, useEffect } from 'react'
import { useContentStore } from '../store/content'
import axios from 'axios'

const useGetTrendingContent = () => {

  const [trendingContent, setTrendingContent] = useState(null)
  const {contentType} = useContentStore()
  

  useEffect(() => {
    const getTeendingContent = async () => {
    
        const res = await axios.get(`/api/v1/${contentType}/trending`)
        setTrendingContent(res.data.content)
      
        // setIsLoading(false)

    }
    // setIsLoading(true)
    getTeendingContent()
  }, [contentType])

return {trendingContent}
}

export default useGetTrendingContent