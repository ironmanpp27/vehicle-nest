
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Search, Filter } from "lucide-react";
import { VehicleStatus, VehicleType } from "@/lib/types";

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

export interface SearchFilters {
  status?: VehicleStatus | null;
  type?: VehicleType | null;
  year?: number | null;
  sortBy?: "newest" | "oldest" | "make" | null;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    status: null,
    type: null,
    year: null,
    sortBy: null,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? null : value,
    }));
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by registration number, make, model or VIN..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-11 rounded-lg border-input bg-white shadow-inner-soft"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm h-11 px-4">
                <Filter className="h-4 w-4 mr-2" /> Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup
                value={filters.status || "all"}
                onValueChange={(value) => 
                  updateFilter("status", value as VehicleStatus | "all")
                }
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                {Object.values(VehicleStatus).map((status) => (
                  <DropdownMenuRadioItem key={status} value={status}>
                    {status}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm h-11 px-4">
                <Filter className="h-4 w-4 mr-2" /> Type
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup
                value={filters.type || "all"}
                onValueChange={(value) => 
                  updateFilter("type", value as VehicleType | "all")
                }
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                {Object.values(VehicleType).map((type) => (
                  <DropdownMenuRadioItem key={type} value={type}>
                    {type}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm h-11 px-4">
                <Filter className="h-4 w-4 mr-2" /> Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup
                value={filters.sortBy || "all"}
                onValueChange={(value) => 
                  updateFilter("sortBy", value as "newest" | "oldest" | "make" | "all")
                }
              >
                <DropdownMenuRadioItem value="all">Default</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">Oldest First</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="make">By Make</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button type="submit" variant="default" className="h-11 button-hover">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};
