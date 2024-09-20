'use client'
import IconButton from '@mui/material/IconButton';


import ShareIcon from '@mui/icons-material/Share';

export default function Share ()  {

    const handleClick = () => {
        console.log('sdíleno')
    }

return (
    
    <IconButton onClick={handleClick} color='action'>
        <ShareIcon className='dark:text-gray-300'/>
    </IconButton>











     

)
}