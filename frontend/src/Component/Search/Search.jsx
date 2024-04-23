import React from 'react'
import './Search.css'

import search from '../Assets/search.jpeg'

export const Search = () => {
  return (
    <div className="search">
      <input type="text" className="searchBar" placeholder="Search for more.." />   
      <img src={search} className="searchIcon"/>      
    </div>
  )
}
