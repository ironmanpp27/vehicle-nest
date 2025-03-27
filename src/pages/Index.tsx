
import React from "react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ClipboardList, Search, ShieldCheck } from "lucide-react";
import { mockVehicles } from "@/lib/types";
import { Link } from "react-router-dom";

const Index = () => {
  // Take a subset of vehicles to display
  const recentVehicles = mockVehicles.slice(0, 3);
  
  return (
    <Layout>
      <Hero />
      
      {/* Animation section */}
      <section className="py-12 bg-gradient-to-r from-primary/5 to-accent/10 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-md space-y-4 animate-slide-in">
              <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                Advanced Vehicle Management
              </h2>
              <p className="text-muted-foreground">
                Our intelligent system tracks all your vehicle data in real-time with automated notifications and smart analytics.
              </p>
              <Button asChild variant="outline" className="group">
                <Link to="/vehicles">
                  Explore Features <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
            <div className="relative w-full max-w-lg animate-blur-in">
              <div className="rounded-xl overflow-hidden shadow-medium border border-border/40">
                <div className="aspect-video bg-white/80 backdrop-blur-sm relative">
                  <img 
                    src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" 
                    alt="Vehicle Registration Animation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay"></div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 h-24 w-24 rounded-full bg-accent blur-xl opacity-70"></div>
              <div className="absolute -top-4 -left-4 -z-10 h-24 w-24 rounded-full bg-primary/30 blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-slide-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
              Streamlined Registration Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our system simplifies every aspect of vehicle registration with powerful features designed for efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/40 bg-card/60 backdrop-blur-sm card-hover">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent registrations section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold">Recent Registrations</h2>
            <Button asChild variant="ghost" className="button-hover">
              <Link to="/vehicles">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 bg-gradient-to-r from-accent/30 to-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6 animate-blur-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Ready to Register Your Vehicle?
            </h2>
            <p className="text-xl text-muted-foreground">
              Start the registration process today and experience our streamlined system.
            </p>
            <Button asChild size="lg" className="mt-4 button-hover">
              <Link to="/register">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const features = [
  {
    title: "Easy Registration",
    description: "Register vehicles quickly with our intuitive form that guides you through each step of the process.",
    icon: ClipboardList,
  },
  {
    title: "Advanced Search",
    description: "Find any vehicle in seconds with our powerful search that filters by make, model, year, and more.",
    icon: Search,
  },
  {
    title: "Secure Management",
    description: "Keep all your vehicle data secure and manage registrations with confidence and ease.",
    icon: ShieldCheck,
  },
];

export default Index;
