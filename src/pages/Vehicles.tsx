
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { VehicleCard } from "@/components/VehicleCard";
import { SearchBar, SearchFilters } from "@/components/SearchBar";
import { mockVehicles, Vehicle, VehicleStatus, VehicleType } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Vehicles = () => {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [activeTab, setActiveTab] = useState("all");
  
  const handleSearch = (query: string, filters: SearchFilters) => {
    let results = [...mockVehicles];
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(
        (vehicle) =>
          vehicle.registrationNumber.toLowerCase().includes(lowercaseQuery) ||
          vehicle.make.toLowerCase().includes(lowercaseQuery) ||
          vehicle.model.toLowerCase().includes(lowercaseQuery) ||
          vehicle.vin.toLowerCase().includes(lowercaseQuery) ||
          `${vehicle.owner.firstName} ${vehicle.owner.lastName}`
            .toLowerCase()
            .includes(lowercaseQuery)
      );
    }
    
    if (filters.status) {
      results = results.filter((vehicle) => vehicle.status === filters.status);
    }
    
    if (filters.type) {
      results = results.filter((vehicle) => vehicle.type === filters.type);
    }
    
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "newest":
          results.sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime());
          break;
        case "oldest":
          results.sort((a, b) => new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime());
          break;
        case "make":
          results.sort((a, b) => a.make.localeCompare(b.make));
          break;
      }
    }
    
    setFilteredVehicles(results);
  };
  
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredVehicles(mockVehicles);
    } else {
      setFilteredVehicles(
        mockVehicles.filter((vehicle) => vehicle.status.toLowerCase() === activeTab)
      );
    }
  }, [activeTab, mockVehicles]);
  
  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 animate-slide-in">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Vehicle Directory
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Browse, search, and filter through all registered vehicles in our system.
            </p>
          </div>
          
          <div className="relative mb-12 overflow-hidden rounded-xl border border-border/40 bg-white/60 backdrop-blur-sm shadow-medium">
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <img 
                src="https://cdn.dribbble.com/users/722246/screenshots/4084242/media/ca0e9ff57f1db6a5c4f15b9421e7f2df.gif" 
                alt="Background Animation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative p-6 md:p-8 z-10">
              <div className="mb-8">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
          
          {/* Vehicle stats with animated icon */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl border border-border/40 shadow-sm flex items-center">
              <div className="mr-4 h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src="https://cdn.dribbble.com/users/3178178/screenshots/6430539/desgndash.gif" 
                  alt="Statistics"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Vehicles</p>
                <p className="text-2xl font-bold">{mockVehicles.length}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border/40 shadow-sm flex items-center">
              <div className="mr-4 h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src="https://cdn.dribbble.com/users/1018473/screenshots/3963419/check.gif" 
                  alt="Active Vehicles"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Active Vehicles</p>
                <p className="text-2xl font-bold">
                  {mockVehicles.filter(v => v.status === VehicleStatus.ACTIVE).length}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border/40 shadow-sm flex items-center">
              <div className="mr-4 h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src="https://cdn.dribbble.com/users/1018473/screenshots/3848385/hourglass.gif" 
                  alt="Pending Vehicles"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Pending</p>
                <p className="text-2xl font-bold">
                  {mockVehicles.filter(v => v.status === VehicleStatus.PENDING).length}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border/40 shadow-sm flex items-center">
              <div className="mr-4 h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src="https://cdn.dribbble.com/users/2421265/screenshots/9022738/media/f5344616cc90f635114f61714cede6be.gif" 
                  alt="Recent Registrations"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Recent (7 days)</p>
                <p className="text-2xl font-bold">
                  {mockVehicles.filter(v => {
                    const sevenDaysAgo = new Date();
                    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                    return new Date(v.registrationDate) >= sevenDaysAgo;
                  }).length}
                </p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-5 w-full max-w-md mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
              <TabsTrigger value="suspended">Suspended</TabsTrigger>
            </TabsList>
            
            <Separator className="mb-8" />
            
            {["all", "active", "pending", "expired", "suspended"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                {filteredVehicles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVehicles.map((vehicle) => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="mx-auto w-40 h-40 mb-6">
                      <img 
                        src="https://cdn.dribbble.com/users/285475/screenshots/1993768/media/deedfcc02166d4a23b7ab8ef2592608b.gif" 
                        alt="No Results Found"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-lg text-muted-foreground">
                      No vehicles found. Try adjusting your search or filters.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Vehicles;
