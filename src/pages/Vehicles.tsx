
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { VehicleCard } from "@/components/VehicleCard";
import { SearchBar, SearchFilters } from "@/components/SearchBar";
import { mockVehicles, Vehicle, VehicleStatus, VehicleType } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [activeTab, setActiveTab] = useState("all");
  
  const handleSearch = (query: string, filters: SearchFilters) => {
    let results = [...vehicles];
    
    // Search by query
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
    
    // Apply filters
    if (filters.status) {
      results = results.filter((vehicle) => vehicle.status === filters.status);
    }
    
    if (filters.type) {
      results = results.filter((vehicle) => vehicle.type === filters.type);
    }
    
    // Apply sort
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
  
  // Handle tab changes
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(
        vehicles.filter((vehicle) => vehicle.status.toLowerCase() === activeTab)
      );
    }
  }, [activeTab, vehicles]);
  
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
          
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
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
