import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const aftercareInfo = [
    {
        title: "Daily Care",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        title: "What to Avoid",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        title: "Long-term Maintenance",
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    }
];

export default function Aftercare() {
    return (
        <div>
            <div className="min-h-[calc(100vh-4rem)] py-8 px-4 max-w-3xl mx-auto bg-background">
                <h1 className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl text-center mb-8">
                    Aftercare <span className="font-light">Guide</span>
                </h1>
                <div className="space-y-6">
                    {aftercareInfo.map((section, index) => (
                        <Card key={index} className="shadow-lg border border-ring/10">
                            <CardHeader>
                                <CardTitle className="text-2xl font-playfair">{section.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {section.content}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
} 