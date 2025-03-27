
# Vehicle Registration System

A modern web-based system for registering and managing vehicles with an elegant UI, smooth animations, and responsive design.

![VehicleNest](/public/placeholder.svg)

## Features

- Interactive vehicle registration form
- Comprehensive vehicle management dashboard
- Advanced search and filtering capabilities
- Detailed vehicle information pages
- Responsive layout for all device types
- Modern animations and transitions
- Clean and intuitive user interface

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router for navigation
- React Query for data fetching
- Lucide React for icons
- Shadcn/UI for UI components

### Backend (Integration Guide)
This project is designed to work with a Java backend with the following technologies:
- Java 17+
- Spring Boot
- Hibernate ORM
- SQLite3 database
- RESTful API endpoints

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Java 17+ (for backend)
- Maven or Gradle (for backend build)
- Git

### Frontend Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd vehicle-registration-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Backend Integration

To connect this frontend to a Java backend, follow these steps:

#### 1. Set up the Java Backend Project

Create a Spring Boot project with the following dependencies:
- Spring Web
- Spring Data JPA
- Hibernate
- SQLite JDBC Driver

Example `pom.xml` dependencies:
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-core</artifactId>
    </dependency>
    <dependency>
        <groupId>org.xerial</groupId>
        <artifactId>sqlite-jdbc</artifactId>
        <version>3.36.0.3</version>
    </dependency>
</dependencies>
```

#### 2. Configure Database Connection

Create an `application.properties` file in your Spring Boot project:

```properties
# SQLite Configuration
spring.datasource.url=jdbc:sqlite:vehicle_registration.db
spring.datasource.driver-class-name=org.sqlite.JDBC
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Server Configuration
server.port=8080
```

#### 3. Create Entity Models

Create Java entity classes that match our frontend data models:

```java
// Vehicle.java
@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String make;
    private String model;
    private int year;
    private String registrationNumber;
    private String ownerName;
    private String status;
    private String imageUrl;
    
    // Getters and setters
}
```

#### 4. Create Repository Interfaces

```java
// VehicleRepository.java
@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByMakeContainingIgnoreCase(String make);
    List<Vehicle> findByOwnerNameContainingIgnoreCase(String ownerName);
    List<Vehicle> findByRegistrationNumber(String registrationNumber);
}
```

#### 5. Create REST Controllers

```java
// VehicleController.java
@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return vehicleRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        if (!vehicleRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        vehicle.setId(id);
        return ResponseEntity.ok(vehicleRepository.save(vehicle));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        if (!vehicleRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        vehicleRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
```

#### 6. Modify Frontend API Calls

Create an API service file in the frontend project:

```typescript
// src/lib/api.ts
import axios from 'axios';
import { Vehicle } from '@/lib/types';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  // Vehicle endpoints
  async getVehicles() {
    const response = await axios.get<Vehicle[]>(`${API_BASE_URL}/vehicles`);
    return response.data;
  },
  
  async getVehicleById(id: string) {
    const response = await axios.get<Vehicle>(`${API_BASE_URL}/vehicles/${id}`);
    return response.data;
  },
  
  async createVehicle(vehicle: Omit<Vehicle, 'id'>) {
    const response = await axios.post<Vehicle>(`${API_BASE_URL}/vehicles`, vehicle);
    return response.data;
  },
  
  async updateVehicle(id: string, vehicle: Partial<Vehicle>) {
    const response = await axios.put<Vehicle>(`${API_BASE_URL}/vehicles/${id}`, vehicle);
    return response.data;
  },
  
  async deleteVehicle(id: string) {
    await axios.delete(`${API_BASE_URL}/vehicles/${id}`);
  }
};
```

#### 7. CORS Configuration for Backend

Add CORS configuration to your Spring Boot application:

```java
// CorsConfig.java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
```

### Setting Up Cross-Environment Development

1. **Install the required tools:**
   - [Java Development Kit (JDK) 17+](https://adoptium.net/)
   - [Maven](https://maven.apache.org/download.cgi) or [Gradle](https://gradle.org/install/)
   - [Node.js and npm](https://nodejs.org/)
   - [Git](https://git-scm.com/downloads)
   - [VS Code](https://code.visualstudio.com/) with extensions:
     - Extension Pack for Java
     - Spring Boot Extension Pack
     - ES7+ React/Redux/React-Native snippets
     - Tailwind CSS IntelliSense

2. **Start both applications:**
   - Backend: `./mvnw spring-boot:run` (Maven) or `./gradlew bootRun` (Gradle)
   - Frontend: `npm run dev`

3. **Install CORS browser extension:** For development, a CORS extension like [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) can be helpful.

## Project Structure

```
vehicle-registration-system/
├── src/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and type definitions
│   ├── pages/           # Page components
│   └── App.tsx          # Application entry point
├── public/              # Static assets
├── README.md            # This documentation
└── package.json         # Project dependencies
```

## Best Practices

1. **Environment Variables:** Use environment variables to configure API URLs and other environment-specific values.

2. **Error Handling:** Implement proper error handling for API requests using try/catch blocks or React Query's error handling.

3. **Validation:** Use schema validation (like Zod) for both form inputs and API responses.

4. **Authentication:** Implement JWT authentication for secure API access.

5. **Code Splitting:** Use React.lazy and Suspense for code splitting to improve load times.

6. **Caching:** Leverage React Query's caching capabilities to reduce API calls.

## Production Deployment

1. Build the frontend:
   ```
   npm run build
   ```

2. Build the backend:
   ```
   ./mvnw package -DskipTests
   ```

3. Deploy the frontend to a static hosting service like Netlify, Vercel, or AWS S3.

4. Deploy the backend to a Java-compatible hosting service like AWS Elastic Beanstalk, Heroku, or your own server.

5. Update CORS settings for production environments.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
