import {Button} from "@/components/ui/button";
import { LogIn } from "lucide-react";


export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-backgorund">
    <div className="wrapper" >
        <div className="flex flex-col items-center justify-center lg:py24 py12 text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">
                Ready to elevate your English?
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                Join GuiTeach today and start your journey towards fluency with personalized private lessons tailored to your specific goals and pace.
            </p>
            <Button className="size-lg">
                <LogIn className="w-6 h-6" />Sign In
            </Button>
        </div>
    </div>
    </section>
  );
}
