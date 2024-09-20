'use client'


import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Heart ({likes})  {

    const handleClick = () => {
        console.log('přidáno srdíčko')
    }

    let clicks = likes
    
return (
    
 
   <div >
        {(clicks > 0) && <Chip icon={<FavoriteIcon variant="outlined" color='error'/>} label={clicks} className='dark:text-gray-300' variant="outlined" onClick={handleClick} />}
        {(clicks === 0) && <Chip icon={<FavoriteBorderIcon variant="outlined" color='#9e9e9e'/>} label={clicks} className='dark:text-gray-300' variant="outlined" onClick={handleClick} />}
   </div>











     

)
}