'use client'

import { useSession } from '@/components/SessionProvider'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { User } from 'better-auth'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { LogOut } from 'lucide-react'

export default function AccountPage() {
    const session = useSession()
    const router = useRouter()

    if (!session) {
        return <div>Please sign in to view your account.</div>
    }
    const user = session.user as User

    const handleSignOut = async () => {
        await authClient.signOut()
        router.replace('/auth')
    }

    return (
        <div className="container max-w-5xl mx-auto py-8 pb-24 sm:pb-8 px-4 space-y-8">
            {/* Profile Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your personal information and profile settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <p className="text-lg">{user?.name}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-lg">{user?.email}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="outline"
                        className=" active:scale-95 transition-transform text-destructive hover:text-destructive"
                        onClick={handleSignOut}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </CardFooter>
            </Card>

            {/* Security Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        variant="outline"
                        className="active:scale-95 transition-transform"
                    >
                        Reset Password
                    </Button>

                    <Separator className="my-4" />

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                className="active:scale-95 transition-transform"
                            >
                                Delete Account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="active:scale-95 transition-transform">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction className="active:scale-95 transition-transform">
                                    Delete Account
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>Your saved payment methods and billing history</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No payment methods added yet</p>
                        <Button
                            variant="outline"
                            className="mt-4 active:scale-95 transition-transform"
                        >
                            Add Payment Method
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Appointment History */}
            <Card>
                <CardHeader>
                    <CardTitle>Appointment History</CardTitle>
                    <CardDescription>View your past and upcoming appointments</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No appointments found</p>
                        <Button
                            variant="outline"
                            className="mt-4 active:scale-95 transition-transform"
                        >
                            Book an Appointment
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}