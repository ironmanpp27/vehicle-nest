
export interface Vehicle {
  id?: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  color: string;
  vin: string;
  type: VehicleType;
  status: VehicleStatus;
  registrationDate: string;
  owner: Owner;
}

export enum VehicleType {
  SEDAN = "Sedan",
  SUV = "SUV",
  HATCHBACK = "Hatchback",
  CONVERTIBLE = "Convertible",
  PICKUP = "Pickup",
  VAN = "Van",
  COUPE = "Coupe",
  WAGON = "Wagon",
  MOTORCYCLE = "Motorcycle",
  OTHER = "Other"
}

export enum VehicleStatus {
  ACTIVE = "Active",
  EXPIRED = "Expired",
  SUSPENDED = "Suspended",
  PENDING = "Pending"
}

export interface Owner {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  licenseNumber: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Mock data for the frontend
export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    registrationNumber: "ABC-1234",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    color: "Midnight Silver",
    vin: "5YJ3E1EA1JF006789",
    type: VehicleType.SEDAN,
    status: VehicleStatus.ACTIVE,
    registrationDate: "2023-06-15",
    owner: {
      id: "101",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "555-123-4567",
      address: {
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        country: "USA"
      },
      licenseNumber: "DL123456789"
    }
  },
  {
    id: "2",
    registrationNumber: "XYZ-9876",
    make: "BMW",
    model: "X5",
    year: 2022,
    color: "Alpine White",
    vin: "WBAJA5C55KEX39023",
    type: VehicleType.SUV,
    status: VehicleStatus.ACTIVE,
    registrationDate: "2022-11-08",
    owner: {
      id: "102",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "555-987-6543",
      address: {
        street: "456 Park Ave",
        city: "New York",
        state: "NY",
        zipCode: "10022",
        country: "USA"
      },
      licenseNumber: "DL987654321"
    }
  },
  {
    id: "3",
    registrationNumber: "DEF-5678",
    make: "Toyota",
    model: "Camry",
    year: 2021,
    color: "Celestial Silver",
    vin: "4T1BF1FK5MU123456",
    type: VehicleType.SEDAN,
    status: VehicleStatus.ACTIVE,
    registrationDate: "2021-03-22",
    owner: {
      id: "103",
      firstName: "Robert",
      lastName: "Johnson",
      email: "robert.johnson@example.com",
      phone: "555-456-7890",
      address: {
        street: "789 Oak Dr",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "USA"
      },
      licenseNumber: "DL456789012"
    }
  },
  {
    id: "4",
    registrationNumber: "GHI-9012",
    make: "Honda",
    model: "Civic",
    year: 2023,
    color: "Cosmic Blue",
    vin: "2HGFC2F70PH123456",
    type: VehicleType.SEDAN,
    status: VehicleStatus.PENDING,
    registrationDate: "2023-09-10",
    owner: {
      id: "104",
      firstName: "Emily",
      lastName: "Brown",
      email: "emily.brown@example.com",
      phone: "555-789-0123",
      address: {
        street: "101 Pine St",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "USA"
      },
      licenseNumber: "DL789012345"
    }
  },
  {
    id: "5",
    registrationNumber: "JKL-3456",
    make: "Audi",
    model: "Q7",
    year: 2022,
    color: "Daytona Gray",
    vin: "WA1VAAF77LD123456",
    type: VehicleType.SUV,
    status: VehicleStatus.EXPIRED,
    registrationDate: "2022-01-30",
    owner: {
      id: "105",
      firstName: "Michael",
      lastName: "Williams",
      email: "michael.williams@example.com",
      phone: "555-234-5678",
      address: {
        street: "222 Maple Ave",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        country: "USA"
      },
      licenseNumber: "DL234567890"
    }
  }
];
