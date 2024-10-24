'use client'

import { useState, useEffect } from "react";
import CommentCardInput from "@/components/blog/commentCardInput";
import CommentCard from "@/components/blog/commentCard";

export default function CommentComponent ({article}) {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('')
    const [areaValue, setAreaValue] = useState('')
    const [comments, setComments] = useState([]);
    const [disabled, setDisabled] = useState(true)



    useEffect(() => {
      if(article){
        fetchComments();
      }
      
    }, [article]);

      const fetchComments = async () => {
        try {
          setLoading(true);
          const response = await fetch("/api/comments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              article: article,
              operation: "getter",
            }),
          });
          if (!response.ok) {
            console.error("Error fetching comments:", response.statusText);
            return;
          }
  
          const  data  = await response.json();

          let rows = data.result

          setComments(rows || []);
          
        } catch (error) {
          console.error("Error fetching comments:", error);
        } finally {
          setLoading(false);
        }
      };

   

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
          fetchComments()
      
        } catch (error) {
          console.log(error)
        }finally{
          setLoading(false)
          setDisabled(false)
        }
      }

    return (
        <>

      
        
                <div className="flex justify-start flex-col">
          {comments && (
            comments.map((comment) => (
              
              <CommentCard key={comment.id} comment={comment} />
              
            ))
          ) }
        </div>
            
            <CommentCardInput 
              setAreaValue={setAreaValue} 
              disabled={disabled} 
              loading={loading} 
              setDisabled={setDisabled} 
              setUser={setUser} 
              areaValue={areaValue} 
              handleClick={handleClick} 
            />
        </>
    )
}