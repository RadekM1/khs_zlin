'use client'

import { useState, useEffect } from "react";
import CommentCardInput from "@/components/blog/commentCardInput";
import CommentCard from "@/components/blog/commentCard";

export default function CommentComponent ({article}) {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('')
    const [areaValue, setAreaValue] = useState('')
    const [disabled, setDisabled] = useState(true)

    const handleClick = async () =>{
        if(!areaValue){
          alert('není zadán komentář');
          return;
        }

        if(!article){
          alert('chyba při zjištění ID článku');
          return;
        }

        if(!user){
          alert('nebyl zjištěn přihlášený uživatel');
          return;
        }
      
        setLoading(true)
        setDisabled(true)
      
        try{
      
          const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              areaValue: areaValue,
              user_account: user,
              article_slug: article,
              operation: 'insert'
            })
          });
    
      
          if(!response.ok){
            console.log(response.error)
          }

          setAreaValue('')
      
        } catch (error) {
          console.log(error)
        }finally{
          setLoading(false)
          setDisabled(false)
        }
      }

    return (
        <>
            <div>
              <CommentCard row={article} />
            </div>
            <CommentCardInput setAreaValue={setAreaValue} disabled={disabled} loading={loading} setDisabled={setDisabled} setUser={setUser} areaValue={areaValue} handleClick={handleClick} />
        </>
    )
}