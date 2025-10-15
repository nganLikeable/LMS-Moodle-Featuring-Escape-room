import {FormEvent} from 'react'
import {useRouter} from 'next/router'

export default function LoginPage() {
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        
    }
}