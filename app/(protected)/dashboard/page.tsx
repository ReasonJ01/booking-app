'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Heart, History, Plus, Star, Users } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    // Mock data - replace with real data later
    const hasUpcomingAppointment = true;
    const isOnWaitlist = true;
    const waitlistPosition = 3;

    return (
        <div className="min-h-screen py-8">
            <div className="container max-w-5xl mx-auto px-4 space-y-8">
                {/* Next Appointment or Booking CTA */}
                <Card className="relative overflow-hidden">
                    <CardHeader>
                        <CardTitle>Next Appointment</CardTitle>
                        {hasUpcomingAppointment ? (
                            <>
                                <CardDescription>Your upcoming appointment details</CardDescription>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center gap-2 text-lg">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        <span>Thursday, March 28th, 2024</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-lg">
                                        <Clock className="h-5 w-5 text-primary" />
                                        <span>2:00 PM - 3:30 PM</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Star className="h-5 w-5" />
                                        <span>Builder Gel Infill, Removal</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <CardDescription>No upcoming appointments</CardDescription>
                        )}
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                        {hasUpcomingAppointment ? (
                            <>
                                <Button variant="outline" className="hover:cursor-pointer">Reschedule</Button>
                                <Button variant="destructive" className="hover:cursor-pointer">Cancel</Button>
                            </>
                        ) : (
                            <Button asChild className="w-full">
                                <Link href="/book">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Book an Appointment
                                </Link>
                            </Button>
                        )}
                    </CardFooter>
                </Card>

                {/* Waitlist Status */}
                {isOnWaitlist && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Waitlist Status
                            </CardTitle>
                            <CardDescription>You&apos;re on the waitlist for cancellations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-primary">#{waitlistPosition}</p>
                                <p className="text-sm text-muted-foreground">Current Position</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full hover:cursor-pointer">Remove from Waitlist</Button>
                        </CardFooter>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2 md:grid-cols-2">
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/book">Book Appointment</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/account">Manage Account</Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <History className="h-5 w-5 text-primary" />
                                Total Visits
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">12</div>
                            <p className="text-sm text-muted-foreground">Since March 2023</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Heart className="h-5 w-5 text-primary" />
                                Favorite Service
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-medium">Builder Gel Infill</div>
                            <p className="text-sm text-muted-foreground">Booked 6 times</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Star className="h-5 w-5 text-primary" />
                                Last Visit
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-medium">February 15th, 2024</div>
                            <p className="text-sm text-muted-foreground">Builder Gel Infill</p>
                        </CardContent>
                    </Card>
                </div>


            </div>
        </div>
    );
} 