import React from 'react'
import './Home.css'
import blob from '../Home/Assets/blob.jpeg'

export const Home = () => {
  return (  
    
    <div className='home'>
      <div className='home-left'> 
        <img src={blob} alt='' style={{width:'320px',height:'320px'}}/>
      </div>
      <div className='home-right'> 
       <h1>Welcome Tinkers !</h1>
      
      
        <input type='text' className='mainsearch' placeholder='     Search your problem' />
      </div>
    </div>
    
  )
}
