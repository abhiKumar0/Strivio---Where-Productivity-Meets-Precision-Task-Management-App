import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { PersonStanding } from "lucide-react";

const Testimonial = () => {
  return (
    <div>
      <Carousel className="flex justify-center items-center">
        <CarouselContent>
          <CarouselItem>
            <div className=" w-96 h-96 p-6 rounded-lg shadow-lg flex flex-col items-center justify-around">
              <blockquote className="mt-6 border-l-2 pl-6 italic text-xl text-textColor">
                "After all," he said, "everyone enjoys a good joke, so it's only
                fair that they should pay for the privilege."
              </blockquote>
              <div className="details flex items-center mt-6 bg-slate-300 justify-start rounded-lg w-full p-3">
                <PersonStanding className="rounded-full bg-white p-8 mr-5"/>
                <div className="text">
                    <h2 className="text-md text-gray-900">Someone</h2>
                    <p className="text-textColor">CEO, Company</p>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>...</CarouselItem>
          <CarouselItem>...</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Testimonial;
