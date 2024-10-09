'use client'


import { SessionProvider } from "next-auth/react"
import Navbar from "./Navbar"


export default function NavbarProvider () {

    return (
        
    <SessionProvider>
        <Navbar className='-m-8 -mx-16' style={{zIndex:20}}  />
    </SessionProvider>
    )
}