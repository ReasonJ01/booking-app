'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export function SignUpForm() {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const name = formData.get('name') as string;

        try {
            const result = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: '/dashboard'
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            // Replace the current route to force a remount
            router.replace('/dashboard');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
            setLoading(false);
        }
    }

    return (
        <Card className="shadow-none border-none sm:border sm:shadow-sm">
            <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl sm:text-2xl text-center">Create an Account</CardTitle>
                <CardDescription className="text-center text-base">
                    Enter your details to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-sm" htmlFor="sign-up-name">Name</Label>
                        <Input
                            id="sign-up-name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            className="transition-colors"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm" htmlFor="sign-up-email">Email</Label>
                        <Input
                            id="sign-up-email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="transition-colors"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm" htmlFor="sign-up-password">Password</Label>
                        <Input
                            id="sign-up-password"
                            name="password"
                            type="password"
                            required
                            className="transition-colors"
                            placeholder="Create a password"
                        />
                    </div>
                    {error && (
                        <div className="flex items-center gap-2 p-3 text-sm text-destructive border border-destructive/20 rounded-md bg-destructive/10">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                    <Button
                        type="submit"
                        className="w-full font-medium"
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
} 