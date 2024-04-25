import React from 'react';


export const Shopcard = ({ shoppost }) => {
  // Check if shoppost is defined and contains the _id property
  if (!shoppost || !shoppost._id) {
    return null; // Or render a placeholder or loading indicator
  } 

  return ( 
    <div className='shoppingcard' key={shoppost._id}>
      
        
        <img src={shoppost.imageUrl} alt='' />
        <div className='shopcardtext'>
          <div className='shopcardtitle'>
            {shoppost.name}
          </div>
          <div className='shopcardprice'>
            {shoppost.price}
          </div>
        </div>
      
    </div>
  );
};

export default Shopcard;



