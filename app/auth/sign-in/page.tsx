'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function SignInPage() {
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

        try {
            const result = await authClient.signIn.email({
                email,
                password,
                callbackURL: '/dashboard'
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            // Redirect to dashboard on success
            router.push('/dashboard');
            router.refresh();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
            setLoading(false);
        }
    }

    return (
        <Card className="shadow-none sm:shadow-sm">
            <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl sm:text-2xl text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">
                    Sign in to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && (
                        <div className="flex items-center gap-2 p-2 sm:p-3 text-sm text-destructive border border-destructive/20 rounded-md bg-destructive/10">
                            <AlertCircle className="h-4 w-4" />
                            <span>{error}</span>
                        </div>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="pb-4 px-4 sm:pb-6">
                <div className="text-sm text-muted-foreground text-center w-full">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/sign-up" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
} 