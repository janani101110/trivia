import React from 'react'
import './Home.css'
import octopus from '../Home/Assets/octopus.png'

export const Home = () => {
  return (  
    
    <div className='home'>
      <div className='homeimg'>
        <img src={octopus} alt=''/>
      </div>
      <div className='home-left'>
       <h1>Welcome Tinkers !</h1>
      </div>
      <div className='home-right'>
        <input type='text' className='mainsearch' placeholder='     Search your problem' />
      </div>
    </div>
    
  )
}
