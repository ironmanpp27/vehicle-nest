
import React, { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VehicleStatus } from "@/lib/types";

// Export the SearchFilters interface
export interface SearchFilters {
  make?: string;
  year?: string;
  status?: VehicleStatus;
  type?: string;
  sortBy?: "newest" | "oldest" | "make";
}

interface SearchBarProps {
  onSearch: (query: string, filters?: SearchFilters) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    make: "",
    year: "",
    status: undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleClear = () => {
    setQuery("");
    setFilters({
      make: "",
      year: "",
      status: undefined,
    });
    onSearch("", {});
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="w-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-2 shadow-sm transition-all animate-fade-in"
    >
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vehicles by make, model, or registration..."
            className="pl-9 pr-9 bg-background/50 border-border/40 focus-visible:ring-primary/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" type="button" className="gap-1 bg-background/50">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <h3 className="font-medium">Filter Vehicles</h3>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Make</label>
                  <Select
                    value={filters.make}
                    onValueChange={(value) => setFilters({...filters, make: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any make</SelectItem>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="ford">Ford</SelectItem>
                      <SelectItem value="bmw">BMW</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Year</label>
                  <Select
                    value={filters.year}
                    onValueChange={(value) => setFilters({...filters, year: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any year</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Status</label>
                  <Select
                    value={filters.status as string}
                    onValueChange={(value) => setFilters({...filters, status: value as VehicleStatus})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button onClick={handleClear} variant="ghost" type="button">
                    Reset
                  </Button>
                  <Button onClick={handleSearch} type="submit">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button type="submit" className="button-hover">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};
