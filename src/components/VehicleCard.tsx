
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vehicle, VehicleStatus } from "@/lib/types";
import { Calendar, User, Tag } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const getStatusColor = (status: VehicleStatus) => {
    switch (status) {
      case VehicleStatus.ACTIVE:
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case VehicleStatus.EXPIRED:
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case VehicleStatus.SUSPENDED:
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case VehicleStatus.PENDING:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Link to={`/vehicles/${vehicle.id}`}>
      <Card className="overflow-hidden card-hover border-border/40 bg-card/60 backdrop-blur-sm">
        <div className="h-48 bg-gradient-to-br from-primary/5 to-accent/20 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-3xl font-display font-bold">{vehicle.make}</p>
          </div>
          <Badge className={`absolute top-4 right-4 ${getStatusColor(vehicle.status)}`}>
            {vehicle.status}
          </Badge>
        </div>
        <CardContent className="p-6">
          <div className="space-y-1 mb-4">
            <h3 className="font-display text-xl font-semibold">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-muted-foreground text-sm">
              {vehicle.year} • {vehicle.color}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Tag className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium mr-1.5">Reg Number:</span> 
              <span className="text-muted-foreground">{vehicle.registrationNumber}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium mr-1.5">Registered:</span> 
              <span className="text-muted-foreground">{new Date(vehicle.registrationDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium mr-1.5">Owner:</span> 
              <span className="text-muted-foreground">
                {vehicle.owner.firstName} {vehicle.owner.lastName}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 bg-muted/30 border-t border-border/40">
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-muted-foreground">VIN: {vehicle.vin.slice(-6)}</span>
            <Badge variant="secondary" className="text-xs font-medium">
              {vehicle.type}
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
