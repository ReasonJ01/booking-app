"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BookingFlowSummary from "./BookingFlowSummary";
import { InferSelectModel } from "drizzle-orm";
import { bookingFlowQuestion, bookingFlowOption, service } from "@/lib/schema";
import { useBookingFlow } from "@/lib/queries";

// Infer types from schema
type BookingFlowQuestion = InferSelectModel<typeof bookingFlowQuestion>;
type BookingFlowOption = InferSelectModel<typeof bookingFlowOption>;
type Service = InferSelectModel<typeof service>;

// Extended types for the booking flow data
type OptionWithServices = BookingFlowOption & {
    services: Service[];
};

type QuestionWithOptions = BookingFlowQuestion & {
    options: OptionWithServices[];
};

export interface Option {
    optionTitle: string;
    summaryTitle: string;
    description: string;
    services: string[];
    tag?: string;
    image?: string;
    next: string;
}

export interface SelectedOption {
    questionId: string;
    optionTitle: string;
    summaryTitle: string;
    description: string;
    services: string[];
    tag?: string;
    image?: string;
    next: string;
}

export default function BookingFlow() {
    const [currentQuestion, setCurrentQuestion] = useState("start");
    const [selectedServices, setSelectedServices] = useState<SelectedOption[]>([]);
    const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
    const [direction, setDirection] = useState<number>(1);
    const [bookingData, setBookingData] = useState<Record<string, QuestionWithOptions>>({});

    // Use TanStack Query to fetch booking flow data
    const { data: rawBookingData, isLoading, error } = useBookingFlow();

    // Transform the data when it's fetched
    useEffect(() => {
        if (rawBookingData) {
            const transformedData: Record<string, QuestionWithOptions> = {};

            rawBookingData.forEach((question: QuestionWithOptions) => {
                transformedData[question.id] = {
                    ...question,
                    options: question.options.map((option: OptionWithServices) => ({
                        ...option,
                        services: option.services
                    }))
                };
            });

            setBookingData(transformedData);
        }
    }, [rawBookingData]);

    // Reset scroll position when question changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentQuestion]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center pt-8 sm:pt-16 min-h-screen gap-4 w-full max-w-md mx-auto px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading booking options...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center pt-8 sm:pt-16 min-h-screen gap-4 w-full max-w-md mx-auto px-4">
                <div className="text-center">
                    <p className="text-red-500">Failed to load booking flow</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    if (currentQuestion === "final") {
        return <BookingFlowSummary selectedServices={selectedServices} onChange={handleChange} />;
    }

    const currentQuestionData = bookingData[currentQuestion];

    if (!currentQuestionData) {
        return (
            <div className="flex flex-col items-center pt-8 sm:pt-16 min-h-screen gap-4 w-full max-w-md mx-auto px-4">
                <div className="text-center">
                    <p className="text-red-500">Invalid question</p>
                </div>
            </div>
        );
    }

    function handleChange(questionId: string) {
        setCurrentQuestion(questionId);

        // Keep only services up to the question being changed
        const newServices = selectedServices.filter(service => {
            const serviceIndex = selectedServices.findIndex(s => s.questionId === service.questionId);
            const targetIndex = selectedServices.findIndex(s => s.questionId === questionId);
            return serviceIndex < targetIndex;
        });

        setSelectedServices(newServices);

        const newPreviousQuestions = previousQuestions.filter(q => {
            const questionIndex = previousQuestions.indexOf(q);
            const targetIndex = previousQuestions.indexOf(questionId);
            return questionIndex < targetIndex;
        });

        setPreviousQuestions(newPreviousQuestions);
    }

    const handleOptionClick = (option: OptionWithServices) => {
        const selectedOption: SelectedOption = {
            questionId: currentQuestion,
            optionTitle: option.optionTitle,
            summaryTitle: option.optionTitle,
            description: option.description || "",
            services: option.services.map(service => service.id),
            tag: option.tag || undefined,
            next: option.nextQuestionId || "final",
        }
        setDirection(1);
        setPreviousQuestions([...previousQuestions, currentQuestion]);
        setSelectedServices([...selectedServices, selectedOption]);
        setCurrentQuestion(option.nextQuestionId || "final");
    }

    return <div className="flex flex-col items-center pt-8 sm:pt-16 min-h-screen gap-4 w-full max-w-md mx-auto px-4" style={{ overflow: 'hidden' }}>
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="w-full flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-center mb-2">{currentQuestionData.text}</h1>
                {currentQuestionData.options.map((option: OptionWithServices) => (
                    <Card key={option.id} className={`w-full shadow-md relative border-2 transition-all duration-200
                        ${option.tag ? "border-primary border-3 bg-primary/10 dark:bg-primary/25" : ""}
                    `}
                    >
                        {option.tag && (
                            <div className="absolute top-0 right-0 m-2">
                                <span className="inline-block px-3 py-1 text-sm font-bold rounded-full bg-primary text-primary-foreground">
                                    {option.tag}
                                </span>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle>{option.optionTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {option.description}
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button className="cursor-pointer" onClick={() => handleOptionClick(option)}>Select <ArrowRightIcon className="w-4 h-4" /></Button>
                        </CardFooter>
                    </Card>
                ))}
            </motion.div>
        </AnimatePresence>
    </div>
}