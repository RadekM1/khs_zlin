'use client'

import { SessionProvider } from "next-auth/react"
import Heart from "./heart"

export default function HeartSessionCover ({likes, heartsList, slug}){

   

    return (
        <SessionProvider>
            <Heart 
                likes = {likes} 
                heartsList = {heartsList}
                slug = {slug}
            />
        </SessionProvider>
    )
}