
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-accent blur-3xl"></div>
      </div>
      
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8 animate-scale-in">
          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full">
            <span className="text-sm font-medium text-primary">Simplified Vehicle Management</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
            Modern Vehicle Registration System
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            Effortlessly register, search, and manage vehicle information with our intuitive and powerful system designed for precision and simplicity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="button-hover">
              <Link to="/register">
                Register a Vehicle
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="button-hover">
              <Link to="/vehicles">
                Browse Vehicles
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
