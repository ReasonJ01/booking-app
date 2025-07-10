"use client"
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BookingFlowSummary from "./BookingFlowSummary";

const bookingData =
{
    "start": {
        "text": "What are you booking today?",
        "options": [
            {
                "optionTitle": "Full Set",
                "summaryTitle": "Full Set",
                "description": "Complete new set of nails",
                "services": ["full-set"],
                "image": "https://example.com/images/full-set.jpg",
                "next": "q2"
            },
            {
                "optionTitle": "Infill",
                "summaryTitle": "Infill",
                "description": "Fill in grown-out areas",
                "services": ["infill"],
                "tag": "Most Popular",
                "image": "https://example.com/images/infill.jpg",
                "next": "q3"
            }
        ]
    },
    "q2": {
        "text": "Do you have existing product on your nails?",
        "options": [
            {
                "optionTitle": "Yes",
                "summaryTitle": "Removal",
                "description": "Existing extensions or gel needs removing",
                "services": ["removal"],
                "image": "https://example.com/images/removal.jpg",
                "next": "q3"
            },
            {
                "optionTitle": "No",
                "summaryTitle": "No Removal",
                "description": "Fresh nails with no prior product",
                "services": [],
                "image": "https://example.com/images/no-removal.jpg",
                "next": "q3"
            }
        ]
    },
    "q3": {
        "text": "What level of design complexity do you want?",
        "options": [
            {
                "optionTitle": "Simple",
                "summaryTitle": "Simple Design",
                "description": "Minimal or plain designs",
                "services": ["design-simple"],
                "tag": "Quickest",
                "image": "https://example.com/images/simple-design.jpg",
                "next": "final"
            },
            {
                "optionTitle": "Detailed",
                "summaryTitle": "Detailed Design",
                "description": "Intricate patterns or nail art",
                "services": ["design-detailed"],
                "tag": "Best Seller",
                "image": "https://example.com/images/detailed-design.jpg",
                "next": "final"
            }
        ]
    }
}

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

    if (currentQuestion === "final") {
        return <BookingFlowSummary selectedServices={selectedServices} onChange={handleChange} />;
    }

    const currentQuestionData = bookingData[currentQuestion as keyof typeof bookingData];


    if (!currentQuestionData) {
        return <div>Invalid question</div>;
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

    const handleOptionClick = (option: Option) => {

        const selectedOption: SelectedOption = {
            questionId: currentQuestion,
            optionTitle: option.optionTitle,
            summaryTitle: option.summaryTitle,
            description: option.description,
            services: option.services,
            next: option.next,
        }
        setDirection(1);
        setPreviousQuestions([...previousQuestions, currentQuestion]);
        setSelectedServices([...selectedServices, selectedOption]);
        setCurrentQuestion(option.next);
    }


    return <div className="flex flex-col items-center pt-8 sm:pt-16 h-screen gap-4 w-full max-w-md mx-auto px-4">

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
                {currentQuestionData.options.map((option: Option) => (
                    <Card key={option.optionTitle} className={`w-full shadow-md relative border-2 transition-all duration-200
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
        <Button variant="outline" className="w-full cursor-pointer" disabled={previousQuestions.length === 0} onClick={() => handleChange(previousQuestions[previousQuestions.length - 1])}><ArrowLeftIcon className="w-4 h-4" /> Back</Button>
    </div>;
}