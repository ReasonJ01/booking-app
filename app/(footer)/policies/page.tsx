import { Card, CardContent } from "@/components/ui/card";

export default function Policies() {
    return (

        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] mx-3">
            <h1
                className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl relative z-10 mb-4"
            >
                My <span className="font-light">Policies</span>
            </h1>
            <div className="flex flex-col gap-8">
                <Card>
                    <CardContent>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A sit veritatis molestias alias quia rerum. Omnis tempore, aperiam rem voluptatum quidem perspiciatis veniam ratione, culpa laudantium exercitationem eveniet vel eos!</li>
                            <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A sit veritatis molestias alias quia rerum. Omnis tempore, aperiam rem voluptatum quidem perspiciatis veniam ratione, culpa laudantium exercitationem eveniet vel eos!</li>
                            <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A sit veritatis molestias alias quia rerum. Omnis tempore, aperiam rem voluptatum quidem perspiciatis veniam ratione, culpa laudantium exercitationem eveniet vel eos!</li>
                        </ul>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}