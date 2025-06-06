'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from '@/components/auth/sign-in-form';
import { SignUpForm } from '@/components/auth/sign-up-form';

export default function AuthPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-start">
            <div className="container">
                <div className="mx-auto w-full max-w-[400px] relative pt-[calc(15vh+3rem)]">
                    <Tabs defaultValue="sign-in" className="relative">
                        <TabsList className="grid w-full grid-cols-2 absolute -top-12 bg-muted/50 p-1">
                            <TabsTrigger
                                value="sign-in"
                                className="data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:scale-[1.02] transition-all"
                            >
                                Sign In
                            </TabsTrigger>
                            <TabsTrigger
                                value="sign-up"
                                className="data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:scale-[1.02] transition-all"
                            >
                                Sign Up
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="sign-in" className="mt-0">
                            <SignInForm />
                        </TabsContent>
                        <TabsContent value="sign-up" className="mt-0">
                            <SignUpForm />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
} 