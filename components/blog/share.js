'use client';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

export default function Share({ share, title }) {
  const [copied, setCopied] = useState(false);



  const handleClick = () => {
    if (navigator.share) {
      navigator.share({
        title: '',
        text: title,
        url: share, 
      })
        .then(() => console.log('Úspěšně sdíleno'))
        .catch((error) => console.log('Chyba při sdílení:', error));
    } else if (navigator.clipboard) {
    
      navigator.clipboard.writeText(share)
        .then(() => {
          setCopied(true);
          console.log('Odkaz zkopírován do schránky');
          setTimeout(() => setCopied(false), 3000);
        })
        .catch((error) => console.log('Chyba při kopírování:', error));
    } else {
      console.log('Sdílení ani kopírování není podporováno.');
    }
  };

  

  return (
    <div>
      <IconButton onClick={handleClick} color='action'>
        <ShareIcon className='dark:text-gray-300 w-6 h-6' />
      </IconButton>
      {copied && <span>Odkaz zkopírován do schránky</span>} 
    </div>
  );
}
