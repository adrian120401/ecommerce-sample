'use client';
import { Input, Button } from '@nextui-org/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
    email: string;
    password: string;
}
export default function LoginPage() {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    const router = useRouter()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if(response.ok){
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('expires_in', data.expiresIn);
                localStorage.setItem('refresh_token', data.refreshToken);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="p-12 rounded-md shadow-2xl w-96">
                <form onSubmit={onSubmit}>
                    <div key="underlined" className="w-full gap-4">
                        <Input
                            type="email"
                            variant="underlined"
                            label="Email"
                            name="email"
                            onChange={handleInputChange}
                        />
                        <Input
                            type="password"
                            variant="underlined"
                            label="Password"
                            name="password"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-6">
                        <Button type="submit" color="primary" variant="solid" className="w-full">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
