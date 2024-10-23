'use client'

import CommentComponent from "./commentComponent"
import { SessionProvider } from "next-auth/react"

export default function SessionCover ({article}) {
    return (
        <SessionProvider>
            <CommentComponent article={article} />
        </SessionProvider>
    )
}