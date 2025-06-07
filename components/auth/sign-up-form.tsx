'use client';

import { useState, useRef } from 'react';
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
import { authClient } from '@/lib/auth-client';

export function SignUpForm() {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        // Wait for virtual keyboard to appear
        setTimeout(() => {
            e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    };

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
            window.location.href = '/dashboard';
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
            setLoading(false);
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
                <CardDescription className="text-center">
                    Enter your details to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="sign-up-name">Name</Label>
                        <Input
                            id="sign-up-name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            required
                            onFocus={handleFocus}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sign-up-email">Email</Label>
                        <Input
                            id="sign-up-email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            onFocus={handleFocus}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sign-up-password">Password</Label>
                        <Input
                            id="sign-up-password"
                            name="password"
                            type="password"
                            required
                            placeholder="Create a password"
                            onFocus={handleFocus}
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
                        className="w-full active:scale-95 transition-transform"
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
} 