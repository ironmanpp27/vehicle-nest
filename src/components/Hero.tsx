
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-in">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Vehicle Registration System
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                Register and manage your vehicles with our streamlined, efficient system. Quick registration, instant verification.
              </p>
            </div>
            
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground/90">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="button-hover group">
                <Link to="/register">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="button-hover">
                <Link to="/vehicles">
                  Browse Vehicles
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative animate-slide-in delay-200">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-accent/40 flex items-center justify-center">
                <div className="w-4/5 h-4/5 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center">
                  <img
                    src="/placeholder.svg" 
                    alt="Vehicle Registration Interface"
                    className="max-w-full max-h-full object-contain p-6"
                  />
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/10 rounded-2xl"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute -top-6 -left-6 -z-10 h-[200px] w-[200px] rounded-full bg-accent/10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const benefits = [
  "Fast and secure vehicle registration process",
  "Real-time validation and verification systems",
  "Comprehensive vehicle management dashboard",
  "Automated document processing and storage",
  "Integration with national vehicle databases"
];
