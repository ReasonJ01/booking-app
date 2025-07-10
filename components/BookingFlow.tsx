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
        "text": "What would you like to book?",
        "options": [
            {
                "optionTitle": "Full Set",
                "summaryTitle": "Full Set",
                "description": "New set with or without removal",
                "services": [],
                "next": "q1a"
            },
            {
                "optionTitle": "Infill",
                "summaryTitle": "Infill",
                "description": "Maintenance for existing sets",
                "services": [],
                "next": "q3"
            },
            {
                "optionTitle": "Rebalance",
                "summaryTitle": "Rebalance",
                "description": "For sets older than 4 weeks needing refresh",
                "services": [],
                "next": "q4"
            },
            {
                "optionTitle": "Removal Only",
                "summaryTitle": "Removal Only",
                "description": "Book just a removal without other services",
                "services": [],
                "next": "q8"
            }
        ]
    },
    "q1a": {
        "text": "Do you currently have any product on your nails?",
        "options": [
            {
                "optionTitle": "Yes",
                "summaryTitle": "Add Removal",
                "description": "Add a removal before applying new set",
                "services": [],
                "next": "q2a"
            },
            {
                "optionTitle": "No",
                "summaryTitle": "No Removal Needed",
                "description": "Starting on bare nails",
                "services": [],
                "next": "q2"
            }
        ]
    },
    "q2a": {
        "text": "What type of removal do you need?",
        "options": [
            {
                "optionTitle": "My work",
                "summaryTitle": "Removal of My Work",
                "description": "Removing product previously applied by this salon",
                "services": ["removal-inhouse"],
                "next": "q2"
            },
            {
                "optionTitle": "Other salon",
                "summaryTitle": "Removal of Other Work",
                "description": "Removing product applied elsewhere",
                "services": ["removal-external"],
                "next": "q2"
            }
        ]
    },
    "q2": {
        "text": "Choose your Full Set type",
        "options": [
            {
                "optionTitle": "Builder Gel",
                "summaryTitle": "Builder Gel Full Set",
                "description": "Strong, flexible overlay for natural nails",
                "services": ["bg-full-set"],
                "next": "q7"
            },
            {
                "optionTitle": "Hard Gel",
                "summaryTitle": "Hard Gel Full Set",
                "description": "Durable option for longer nails or heavy use",
                "services": ["hg-full-set"],
                "next": "q7"
            },
            {
                "optionTitle": "Full Cover Extensions",
                "summaryTitle": "Full Cover Extensions",
                "description": "Pre-formed tips for instant length",
                "services": ["fc-full-set"],
                "next": "q7"
            }
        ]
    },
    "q3": {
        "text": "Choose your Infill type",
        "options": [
            {
                "optionTitle": "Builder Gel Infill",
                "summaryTitle": "Builder Gel Infill",
                "description": "Maintenance for BG nails",
                "services": ["bg-infill"],
                "next": "q7"
            },
            {
                "optionTitle": "Hard Gel Infill",
                "summaryTitle": "Hard Gel Infill",
                "description": "Maintenance for HG nails",
                "services": ["hg-infill"],
                "next": "q7"
            }
        ]
    },
    "q4": {
        "text": "Choose your Rebalance type",
        "options": [
            {
                "optionTitle": "Builder Gel Rebalance",
                "summaryTitle": "Builder Gel Rebalance",
                "description": "Full rework for BG sets >4 weeks old",
                "services": ["bg-rebalance"],
                "next": "q7"
            },
            {
                "optionTitle": "Hard Gel Rebalance",
                "summaryTitle": "Hard Gel Rebalance",
                "description": "Full rework for HG sets >4 weeks old",
                "services": ["hg-rebalance"],
                "next": "q7"
            }
        ]
    },
    "q7": {
        "text": "Would you like to add nail art?",
        "options": [
            {
                "optionTitle": "No Nail Art",
                "summaryTitle": "No Additional Design",
                "description": "Simple solid finish",
                "services": [],
                "next": "final"
            },
            {
                "optionTitle": "Bronze Tier",
                "summaryTitle": "Bronze Tier Nail Art",
                "description": "French, Chrome, Dots, etc.",
                "services": ["tier-bronze"],
                "next": "final"
            },
            {
                "optionTitle": "Silver Tier",
                "summaryTitle": "Silver Tier Nail Art",
                "description": "Stars, Flowers, Animal print",
                "services": ["tier-silver"],
                "next": "final"
            },
            {
                "optionTitle": "Gold Tier",
                "summaryTitle": "Gold Tier Nail Art",
                "description": "Combined/mismatched designs",
                "services": ["tier-gold"],
                "next": "final"
            },
            {
                "optionTitle": "Platinum Tier",
                "summaryTitle": "Platinum Tier Nail Art",
                "description": "3D/Line Work/Advanced detail",
                "services": ["tier-platinum"],
                "next": "final"
            },
            {
                "optionTitle": "Custom",
                "summaryTitle": "Custom Design",
                "description": "Extreme or bespoke art",
                "services": ["tier-custom"],
                "next": "final"
            }
        ]
    },
    "q8": {
        "text": "What type of removal do you need?",
        "options": [
            {
                "optionTitle": "My work",
                "summaryTitle": "Removal of My Work",
                "description": "Removing product previously applied by this salon",
                "services": ["removal-inhouse"],
                "next": "final"
            },
            {
                "optionTitle": "Other salon",
                "summaryTitle": "Removal of Other Work",
                "description": "Removing product applied elsewhere",
                "services": ["removal-external"],
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