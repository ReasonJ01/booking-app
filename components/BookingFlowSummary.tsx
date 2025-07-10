import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { SelectedOption } from "./BookingFlow";
import { ArrowRightIcon } from "lucide-react";

interface BookingFlowSummaryProps {
    selectedServices: SelectedOption[];
    onChange: (questionId: string) => void;
}

export default function BookingFlowSummary({ selectedServices, onChange }: BookingFlowSummaryProps) {
    return (
        <div className="flex flex-col items-center pt-16 h-screen gap-4 w-full max-w-md mx-auto px-4">
            <Card className="w-full max-w-md shadow-lg border-2 border-primary">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="divide-y divide-dashed">
                        {selectedServices.map((service) => (
                            <div key={service.questionId} className="flex items-center justify-between py-3">
                                <div>
                                    <div className="font-semibold">{service.summaryTitle}</div>
                                    <div className="text-xs text-muted-foreground">{service.description}</div>
                                </div>
                                <Button
                                    className="cursor-pointer text-on-primary hover:text-on-primary/80"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onChange(service.questionId)}
                                >
                                    Change
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Button className=" w-full cursor-pointer" onClick={() => { }}>
                Choose a Slot <ArrowRightIcon className="w-4 h-4" />
            </Button>
        </div>
    );
}