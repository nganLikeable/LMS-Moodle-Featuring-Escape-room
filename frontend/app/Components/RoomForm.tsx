'use client'

import { setCookie } from "@/lib/cookies"
import { log } from "console";
import { useRouter } from "next/navigation"
import {FormEvent, useState} from 'react'
export function StageForm() {
    return (
        <div>
            
        </div>
    )
}
export default function RoomForm() {
    const router = useRouter();

    const [error, setError] = useState("")

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // clear error 
        setError('')

        const formData = new FormData(event.currentTarget)
        const timerDuration = formData.get('timerDuration')
        const title = formData.get('title')
        const description = formData.get('description')
        const backgroundImg = formData.get('bgImg')
        const stagesNo = formData.get('stagesNo')

        try {
            // send POST req to create API endpoint
            const response = await fetch('http://localhost:3002/api/escape-room/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({timerDuration, title, description, backgroundImg, stagesNo})
            })

            if (response.ok) {
                const {room, token} = await response.json();

                // setCookie or not???
                console.log('Room created successfully:', room);

                
            }
        }

    }
}