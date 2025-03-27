
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockVehicles, Vehicle, VehicleType, VehicleStatus } from "@/lib/types";
import { CalendarIcon, CheckCircle, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  // Form state
  const [vehicleDetails, setVehicleDetails] = useState({
    registrationNumber: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    vin: "",
    type: VehicleType.SEDAN,
  });
  
  const [ownerDetails, setOwnerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  
  const handleVehicleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicleDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleOwnerDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwnerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleTypeChange = (value: string) => {
    setVehicleDetails((prev) => ({
      ...prev,
      type: value as VehicleType,
    }));
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      // Validate vehicle form
      if (!vehicleDetails.registrationNumber || !vehicleDetails.make || !vehicleDetails.model || !vehicleDetails.vin) {
        toast.error("Please fill in all required vehicle fields");
        return;
      }
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      // Validate owner form
      if (
        !ownerDetails.firstName ||
        !ownerDetails.lastName ||
        !ownerDetails.email ||
        !ownerDetails.phone ||
        !ownerDetails.licenseNumber
      ) {
        toast.error("Please fill in all required owner fields");
        return;
      }
      setStep(3);
      window.scrollTo(0, 0);
    } else if (step === 3) {
      handleSubmit();
    }
  };
  
  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
      window.scrollTo(0, 0);
    } else if (step === 3) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = () => {
    setLoading(true);
    
    // Create new vehicle object
    const newVehicle: Vehicle = {
      id: uuidv4(),
      registrationNumber: vehicleDetails.registrationNumber,
      make: vehicleDetails.make,
      model: vehicleDetails.model,
      year: vehicleDetails.year,
      color: vehicleDetails.color,
      vin: vehicleDetails.vin,
      type: vehicleDetails.type,
      status: VehicleStatus.PENDING,
      registrationDate: new Date().toISOString().split('T')[0],
      owner: {
        id: uuidv4(),
        firstName: ownerDetails.firstName,
        lastName: ownerDetails.lastName,
        email: ownerDetails.email,
        phone: ownerDetails.phone,
        licenseNumber: ownerDetails.licenseNumber,
        address: {
          street: ownerDetails.street,
          city: ownerDetails.city,
          state: ownerDetails.state,
          zipCode: ownerDetails.zipCode,
          country: ownerDetails.country
        }
      }
    };
    
    // Add the new vehicle to the mock data
    mockVehicles.push(newVehicle);
    
    // Simulate API call with a delay
    setTimeout(() => {
      setLoading(false);
      setRegistrationComplete(true);
      toast.success("Vehicle registered successfully!");
      window.scrollTo(0, 0);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Vehicle Registration
            </h1>
            {!registrationComplete && (
              <p className="text-xl text-muted-foreground">
                Register a new vehicle in our system by filling out the details below.
              </p>
            )}
          </div>
          
          {!registrationComplete ? (
            <>
              <div className="mb-10">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                  {[1, 2, 3].map((s) => (
                    <React.Fragment key={s}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-12 w-12 rounded-full flex items-center justify-center border-2 font-medium ${
                            s === step
                              ? "border-primary bg-primary text-white"
                              : s < step
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background text-muted-foreground"
                          }`}
                        >
                          {s}
                        </div>
                        <span
                          className={`mt-2 text-sm font-medium ${
                            s === step
                              ? "text-primary"
                              : s < step
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {s === 1 ? "Vehicle" : s === 2 ? "Owner" : "Review"}
                        </span>
                      </div>
                      {s < 3 && (
                        <div
                          className={`w-20 h-0.5 ${
                            s < step ? "bg-primary" : "bg-border"
                          }`}
                        ></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              {step === 1 && (
                <Card className="border-border/40 shadow-soft">
                  <CardHeader>
                    <CardTitle>Vehicle Details</CardTitle>
                    <CardDescription>
                      Enter information about the vehicle you want to register
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="registrationNumber">Registration Number <span className="text-red-500">*</span></Label>
                        <Input
                          id="registrationNumber"
                          name="registrationNumber"
                          value={vehicleDetails.registrationNumber}
                          onChange={handleVehicleDetailsChange}
                          placeholder="ABC-1234"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="vin">VIN <span className="text-red-500">*</span></Label>
                        <Input
                          id="vin"
                          name="vin"
                          value={vehicleDetails.vin}
                          onChange={handleVehicleDetailsChange}
                          placeholder="Vehicle Identification Number"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="make">Make <span className="text-red-500">*</span></Label>
                        <Input
                          id="make"
                          name="make"
                          value={vehicleDetails.make}
                          onChange={handleVehicleDetailsChange}
                          placeholder="e.g. Toyota, Honda, BMW"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="model">Model <span className="text-red-500">*</span></Label>
                        <Input
                          id="model"
                          name="model"
                          value={vehicleDetails.model}
                          onChange={handleVehicleDetailsChange}
                          placeholder="e.g. Camry, Civic, X5"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="year">Year <span className="text-red-500">*</span></Label>
                        <Input
                          id="year"
                          name="year"
                          type="number"
                          value={vehicleDetails.year}
                          onChange={handleVehicleDetailsChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="color">Color <span className="text-red-500">*</span></Label>
                        <Input
                          id="color"
                          name="color"
                          value={vehicleDetails.color}
                          onChange={handleVehicleDetailsChange}
                          placeholder="e.g. Red, Blue, Silver"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="type">Type <span className="text-red-500">*</span></Label>
                        <Select
                          value={vehicleDetails.type}
                          onValueChange={handleTypeChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(VehicleType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleNextStep} className="button-hover">
                      Next <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {step === 2 && (
                <Card className="border-border/40 shadow-soft">
                  <CardHeader>
                    <CardTitle>Owner Details</CardTitle>
                    <CardDescription>
                      Enter information about the vehicle owner
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={ownerDetails.firstName}
                          onChange={handleOwnerDetailsChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={ownerDetails.lastName}
                          onChange={handleOwnerDetailsChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={ownerDetails.email}
                          onChange={handleOwnerDetailsChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={ownerDetails.phone}
                          onChange={handleOwnerDetailsChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Driver's License Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        value={ownerDetails.licenseNumber}
                        onChange={handleOwnerDetailsChange}
                        required
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <h3 className="font-semibold">Address Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="street">Street <span className="text-red-500">*</span></Label>
                      <Input
                        id="street"
                        name="street"
                        value={ownerDetails.street}
                        onChange={handleOwnerDetailsChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                        <Input
                          id="city"
                          name="city"
                          value={ownerDetails.city}
                          onChange={handleOwnerDetailsChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                        <Input
                          id="state"
                          name="state"
                          value={ownerDetails.state}
                          onChange={handleOwnerDetailsChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code <span className="text-red-500">*</span></Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={ownerDetails.zipCode}
                          onChange={handleOwnerDetailsChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
                        <Input
                          id="country"
                          name="country"
                          value={ownerDetails.country}
                          onChange={handleOwnerDetailsChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep} className="button-hover">
                      Back
                    </Button>
                    <Button onClick={handleNextStep} className="button-hover">
                      Next <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {step === 3 && (
                <Card className="border-border/40 shadow-soft">
                  <CardHeader>
                    <CardTitle>Review & Submit</CardTitle>
                    <CardDescription>
                      Please review the information before submitting
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Vehicle Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Registration Number</p>
                          <p className="font-medium">{vehicleDetails.registrationNumber}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">VIN</p>
                          <p className="font-medium">{vehicleDetails.vin}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Make</p>
                          <p className="font-medium">{vehicleDetails.make}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Model</p>
                          <p className="font-medium">{vehicleDetails.model}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Year</p>
                          <p className="font-medium">{vehicleDetails.year}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Color</p>
                          <p className="font-medium">{vehicleDetails.color}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="font-medium">{vehicleDetails.type}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Owner Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Full Name</p>
                          <p className="font-medium">
                            {ownerDetails.firstName} {ownerDetails.lastName}
                          </p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">License Number</p>
                          <p className="font-medium">{ownerDetails.licenseNumber}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{ownerDetails.email}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{ownerDetails.phone}</p>
                        </div>
                        
                        <div className="space-y-1 md:col-span-2">
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="font-medium">
                            {ownerDetails.street}, {ownerDetails.city}, {ownerDetails.state}{" "}
                            {ownerDetails.zipCode}, {ownerDetails.country}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="bg-muted/40 p-4 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground">
                        By submitting this form, you confirm that all provided information is accurate and complete. The vehicle registration will be processed according to current regulations, and additional verification may be required.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep} className="button-hover">
                      Back
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading} className="button-hover">
                      {loading ? "Processing..." : "Submit Registration"}
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </>
          ) : (
            <Card className="border-border/40 shadow-soft text-center py-8">
              <CardContent className="space-y-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-display font-bold">Registration Complete!</h2>
                  <p className="text-muted-foreground">
                    Your vehicle has been successfully registered in our system.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg border border-border/40 max-w-md mx-auto">
                  <div className="grid grid-cols-1 gap-4 text-left">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Registration Number</p>
                      <p className="font-medium">{vehicleDetails.registrationNumber}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Vehicle</p>
                      <p className="font-medium">
                        {vehicleDetails.year} {vehicleDetails.make} {vehicleDetails.model}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Registration Date</p>
                      <p className="font-medium flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate("/vehicles")} className="button-hover">
                    View All Vehicles
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/")} className="button-hover">
                    Return to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Register;
