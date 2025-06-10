import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, HelpCircle } from "lucide-react";

const commonServices = {
    category: "All Services Include",
    items: [
        {
            name: "Professional Nail Prep",
            description: "Every service begins with thorough e-file cuticle preparation. This professional technique ensures your natural nails are properly prepared for the best possible adhesion and longest-lasting results."
        },
        {
            name: "Shaping & Filing",
            description: "Your nails will be expertly shaped to your preference using professional tools and techniques."
        },
        {
            name: "Cuticle Care",
            description: "Gentle cuticle maintenance to keep your nails healthy and your manicure looking pristine."
        },
        {
            name: "Finishing Touches",
            description: "Every service concludes with nourishing cuticle oil application to promote nail health and maintain the longevity of your manicure."
        },
        {
            name: "Please Note",
            description: "Removal or repair of existing enhancement, and nail art is not included in these services. If you require any of these, please add this as a separate service. This ensures proper time allocation and the best care for your natural nails."
        }
    ]
};

const services = [
    {
        category: "Builder Gel",
        items: [
            {
                name: "Builder Gel Full Set",
                price: "£45",
                description: "For those with no previous product on their nails. Creates a natural-looking enhancement that protects and strengthens your nails."
            },
            {
                name: "Builder Gel Infill",
                price: "£35",
                description: "For returning clients within 4 weeks. Includes debulking old product and reshaping."
            },
            {
                name: "Builder Gel Rebalance",
                price: "£40",
                description: "For sets over 4 weeks old. Includes debulking and restructuring of the apex."
            }
        ]
    },
    {
        category: "Hard Gel",
        items: [
            {
                name: "Hard Gel Full Set",
                price: "£45",
                description: "These services are for those with no previous product on their nails. Hard Gel is for clients with long natural nails, are heavy handed, or have weak/brittle nails. These services all include thorough e-file cuticle prep, hard gel application to the natural nail and finished with cuticle oil."
            },
            {
                name: "Hard Gel Infill",
                price: "£35",
                description: "These services are for those who have previously been to me for their nails. An infill is for up to 4 weeks of growth. These services all include, debulking old product, reshaping, thorough e-file cuticle prep, and finished with cuticle oil."
            },
            {
                name: "Hard Gel Rebalance",
                price: "£40",
                description: "These services are for those who have seen me previously but whose sets have been on for longer than 4 weeks. These services all include debulking of old product, thorough e-file cuticle prep, restructuring of the apex, and finished with cuticle oil."
            }
        ]
    },
    {
        category: "Extensions",
        items: [
            {
                name: "Full Cover Extensions",
                price: "£50",
                description: "These services are for clients who want extra length. They are done using full cover tips that can be infilled up to 3 times before they need removing and reapplying. These services all include thorough e-file cuticle prep, application of tips, and finished with cuticle oil."
            },
            {
                name: "Hard Gel Extensions",
                price: "£55",
                description: "These services are for clients who want extra length. They are done using hard gel over tips. These services all include thorough e-file cuticle prep, application of tips, application of hard gel, and finished with cuticle oil."
            }
        ]
    },
    {
        category: "Nail Art Add-ons",
        items: [
            {
                name: "Bronze Art",
                price: "£5",
                description: "Simple yet elegant designs including single color French tips, basic glitter application, or single finger accent design."
            },
            {
                name: "Silver Art",
                price: "£10",
                description: "More detailed designs including ombre effects, multiple finger accents, or simple hand-painted designs."
            },
            {
                name: "Gold Art",
                price: "£15",
                description: "Complex designs including marble effects, foil work, multiple colors, or detailed hand-painted art on multiple fingers."
            },
            {
                name: "Platinum Art",
                price: "£20",
                description: "Premium designs including full sets of intricate hand-painted art, complex patterns, or detailed designs on all nails."
            },
            {
                name: "Custom Design",
                price: "From £25",
                description: "Bespoke nail art designs created specifically for you. Price varies based on complexity, time required, and materials used. Please discuss your ideas during consultation."
            }
        ]
    },
    {
        category: "Other Services",
        items: [
            {
                name: "Gel Manicure",
                price: "£30",
                description: "These services are for those who just want a touch of colour to their nails. These include thorough e-file cuticle prep, application of gel colour and finished with cuticle oil."
            },
            {
                name: "Removal",
                price: "£15",
                description: "Professional removal of builder gel or hard gel enhancements. This service includes careful e-file removal to protect your natural nails, followed by gentle buffing and nourishing cuticle oil application."
            },
            {
                name: "Repair",
                price: "£5",
                description: "Quick fix for any chips, cracks, or lifting in your existing gel enhancement. Price is per nail that needs repair. Includes cleaning, reapplication of gel where needed, and finishing with cuticle oil."
            }
        ]
    },

];

export default function PriceList() {
    const getExplanationDialog = (category: string) => {
        if (category === "Builder Gel") {
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:cursor-pointer">
                            <HelpCircle className="w-4 h-4 mr-1" />
                            What is Builder Gel?
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>What is Builder Gel?</DialogTitle>
                            <DialogDescription className="pt-2">
                                Builder Gel is a medium-viscosity gel that&apos;s specifically designed to enhance and strengthen natural nails. It creates a flexible but durable layer that helps protect your natural nails while allowing them to grow. Perfect for those wanting to grow their natural nails or add subtle strength without excessive length.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )
        }
        if (category === "Hard Gel") {
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:cursor-pointer">
                            <HelpCircle className="w-4 h-4 mr-1" />
                            What is Hard Gel?
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>What is Hard Gel?</DialogTitle>
                            <DialogDescription className="pt-2">
                                Hard Gel is a more rigid enhancement that creates an exceptionally strong and durable coating on your nails. It&apos;s ideal for those who are tough on their nails or need extra durability. Unlike Builder Gel, Hard Gel creates a more solid structure and is perfect for extending nail length while maintaining strength.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )
        }
        return null;
    }

    return (
        <div>
            <div className="min-h-[calc(100vh-4rem)] py-8 px-4 max-w-3xl mx-auto bg-background">
                <h1 className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl text-center mb-8">
                    Service <span className="font-light">Pricing</span>
                </h1>
                <div className="space-y-6">
                    <Card className="shadow-lg border border-ring/10 bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-2xl font-playfair">{commonServices.category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {commonServices.items.map((item, index) => (
                                    item.name === "Please Note" ? (
                                        <div key={index} className="mt-6 p-4 rounded-lg border border-primary/20 bg-primary/5">
                                            <div className="flex items-center gap-2 text-primary">
                                                <AlertCircle className="w-5 h-5" />
                                                <h3 className="font-medium">{item.name}</h3>
                                            </div>
                                            <p className="text-sm text-primary/80 mt-2">{item.description}</p>
                                        </div>
                                    ) : (
                                        <div key={index} className="space-y-1">
                                            <h3 className="font-medium text-primary">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    )
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {services.map((category, index) => (
                        <Card key={index} className="shadow-lg border border-ring/10">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-2xl font-playfair">{category.category}</CardTitle>
                                    {getExplanationDialog(category.category)}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="space-y-3">
                                    {category.items.map((service, serviceIndex) => (
                                        <AccordionItem
                                            key={serviceIndex}
                                            value={`item-${index}-${serviceIndex}`}
                                            className="border border-ring/10 rounded-lg px-4 overflow-hidden"
                                        >
                                            <AccordionTrigger className="hover:no-underline py-4">
                                                <div className="flex justify-between items-center w-full">
                                                    <span className="font-medium text-left">{service.name}</span>
                                                    <span className="text-primary font-semibold ml-4">{service.price}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground">
                                                <p className="leading-relaxed pb-2">{service.description}</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>

    )
}