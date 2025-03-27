
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CarIcon, InfoIcon } from "lucide-react";
import { Vehicle, VehicleStatus } from "@/lib/types";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Link to={`/vehicles/${vehicle.id}`}>
      <Card className="group overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {vehicle.vin ? (
            <img
              src={`https://source.unsplash.com/random/800x600/?car,${vehicle.make}`}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/80 to-muted">
              <CarIcon className="h-12 w-12 text-foreground/30" />
            </div>
          )}
          
          <div className="absolute top-2 right-2">
            <Badge variant={vehicle.status === VehicleStatus.ACTIVE ? 'default' : 'secondary'} className="capitalize">
              {vehicle.status}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg tracking-tight truncate">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-sm text-muted-foreground">
              Registration: {vehicle.registrationNumber}
            </p>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span>Year: {vehicle.year}</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <span className="text-sm font-medium text-primary">
            Owner: {vehicle.owner.firstName} {vehicle.owner.lastName}
          </span>
          
          <Button variant="ghost" size="sm" className="gap-1 group-hover:bg-primary/10">
            <InfoIcon className="h-4 w-4" />
            Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
