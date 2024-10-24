'use client';

import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';

export default function Heart({ likes, heartsList, slug }) {
  const { data: session } = useSession();
  const [user, setUser] = useState('');
  const [clicked, setClicked] = useState(false);
  const [clicks, setClicks] = useState(parseInt(likes))




  useEffect(() => {
    if (session) {
      setUser(session.user.email);
      if (heartsList.includes(session.user.email)) {
        setClicked(true); 
      } else {
        setClicked(false);
      }
    }
  }, [session, heartsList]);

  const handleClick = async () => {
    setClicks(clicks + 1)
    setClicked(true)

    if(!user){
      alert('nebyl zjištěn přihlášený uživatel');
      return;
    }

    if(!slug){
      alert('chyba při zjištění ID článku');
      return;
    }


    try{

      const response = await fetch('/api/hearts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          article_slug_heart: slug,
          user_account_heart: user,
          operation: 'insert'
        })
      });
  
      if(!response.ok){
        console.log(response.error)
      }
  
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <Tooltip title={!session ? "Je potřeba být přihlášený" : ""} arrow>
    <div className='relative'>
      {clicked ? (
        <Chip
          icon={<FavoriteIcon color="error" />}  
          label={clicks}
          className='dark:text-gray-300'
          variant='outlined'
          onClick={session && !clicked ? handleClick : null} 
          style={!session ? { cursor: 'not-allowed', opacity: 0.6 } : {}}
        />
      ) : (
        <Chip
          icon={<FavoriteBorderIcon style={{ color: '#9e9e9e' }} />}  
          label={clicks}
          className='dark:text-gray-300'
          variant='outlined'
          onClick={session ? handleClick : null} 
          style={!session ? { cursor: 'not-allowed', opacity: 0.6 } : {}}
        />
      )}
    </div>
    </Tooltip>
  );
}
