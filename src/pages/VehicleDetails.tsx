
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockVehicles, Vehicle, VehicleStatus } from "@/lib/types";
import { ArrowLeft, Calendar, User, MapPin, Phone, Mail, FileText, Tag, Edit } from "lucide-react";
import { toast } from "sonner";

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      const foundVehicle = mockVehicles.find((v) => v.id === id);
      setVehicle(foundVehicle || null);
      setLoading(false);
      
      if (!foundVehicle) {
        toast.error("Vehicle not found");
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
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
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-64 bg-muted rounded"></div>
            <div className="h-6 w-40 bg-muted rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!vehicle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The vehicle you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/vehicles">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Vehicles
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 animate-fade-in">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link to="/vehicles">
                <Button variant="ghost" size="sm" className="button-hover">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </Link>
              <Badge className={getStatusColor(vehicle.status)}>
                {vehicle.status}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-xl text-muted-foreground">
              {vehicle.year} • {vehicle.color}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="button-hover">
              <FileText className="mr-2 h-4 w-4" /> Generate Report
            </Button>
            <Button className="button-hover">
              <Edit className="mr-2 h-4 w-4" /> Edit Details
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
                <CardDescription>
                  Detailed information about this vehicle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Registration Number
                      </p>
                      <p className="text-lg font-medium flex items-center">
                        <Tag className="h-4 w-4 mr-2 text-primary" />
                        {vehicle.registrationNumber}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        VIN
                      </p>
                      <p className="text-lg font-medium">
                        {vehicle.vin}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Type
                      </p>
                      <p className="text-lg font-medium">
                        {vehicle.type}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Registration Date
                      </p>
                      <p className="text-lg font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {new Date(vehicle.registrationDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Make & Model
                      </p>
                      <p className="text-lg font-medium">
                        {vehicle.make} {vehicle.model}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Year & Color
                      </p>
                      <p className="text-lg font-medium">
                        {vehicle.year} • {vehicle.color}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Registration Timeline</CardTitle>
                <CardDescription>
                  History of this vehicle's registration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div className="h-full w-px bg-border"></div>
                    </div>
                    <div className="pb-6">
                      <p className="text-sm text-muted-foreground">
                        {new Date(vehicle.registrationDate).toLocaleDateString()}
                      </p>
                      <p className="font-medium">Initial Registration</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Vehicle registered by {vehicle.owner.firstName} {vehicle.owner.lastName}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div className="h-full w-px bg-border"></div>
                    </div>
                    <div className="pb-6">
                      <p className="text-sm text-muted-foreground">
                        {new Date(new Date(vehicle.registrationDate).setMonth(new Date(vehicle.registrationDate).getMonth() + 1)).toLocaleDateString()}
                      </p>
                      <p className="font-medium">Documentation Verified</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        All vehicle documentation has been verified and approved
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(new Date(vehicle.registrationDate).setFullYear(new Date(vehicle.registrationDate).getFullYear() + 1)).toLocaleDateString()}
                      </p>
                      <p className="font-medium">Registration Renewal Due</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Vehicle registration needs to be renewed by this date
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Owner Information</CardTitle>
                <CardDescription>
                  Contact details for the vehicle owner
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 pb-4 border-b border-border/40">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {vehicle.owner.firstName} {vehicle.owner.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        License: {vehicle.owner.licenseNumber}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span>{vehicle.owner.email}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span>{vehicle.owner.phone}</span>
                    </div>
                    
                    <div className="flex">
                      <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                      <div>
                        <p>{vehicle.owner.address.street}</p>
                        <p>
                          {vehicle.owner.address.city}, {vehicle.owner.address.state} {vehicle.owner.address.zipCode}
                        </p>
                        <p>{vehicle.owner.address.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>
                  Options for this vehicle registration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start button-hover">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Registration Card
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start button-hover">
                    <FileText className="mr-2 h-4 w-4" />
                    Export Vehicle Details
                  </Button>
                  
                  <Separator className="my-2" />
                  
                  <Button variant="destructive" className="w-full justify-start button-hover">
                    <FileText className="mr-2 h-4 w-4" />
                    Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VehicleDetails;
