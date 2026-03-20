# InternConnect - Full-Stack Internship Matching Platform

InternConnect is a professional internship discovery and management platform designed to bridge the gap between students and opportunities. The platform features a robust matching engine that aligns student skills with internship requirements, providing a personalized career discovery experience.

## 🚀 Features

### 👨‍🎓 Student Portal
- **Skill-Based Matching**: Personalized dashboard showing internships that match your specific skill set.
- **Internship Discovery**: Browse and search a comprehensive database of internship opportunities.
- **Profile Management**: Update your professional details and manage your skill list.
- **Save for Later**: Bookmark interesting opportunities to review or apply to later.
- **Graceful Fallbacks**: Core student discovery pages are designed to be resilient, utilizing mock data fallbacks to ensure availability even during database maintenance.

### 🛠️ Admin Dashboard
- **Real-time Analytics**: High-level overview of user registration, internship postings, and saving activities.
- **Database-Driven Insights**: Direct integration with the production database for accurate system health monitoring.
- **Activity Tracking**: Monitor recent platform activities including new user registrations and internship saves.
- **System Management**: Robust control over internship data and user roles.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS & Material UI (MUI)
- **State/Routing**: React Router 7
- **Icons**: Lucide React & MUI Icons
- **Animations**: Framer Motion
- **HTTP Client**: Axios

### Backend
- **Framework**: Spring Boot 4.0.2 (Java 17)
- **Security**: Spring Security with JWT (JSON Web Tokens)
- **Data Access**: Spring Data JPA / Hibernate
- **Database**: PostgreSQL (Hosted on Neon)
- **Utilities**: Lombok, Jackson, Slf4j

## 📂 Project Structure

```text
├── backend/
│   ├── src/main/java/jar/
│   │   ├── controllers/      # REST Endpoints (Auth, Internships, Admin, etc.)
│   │   ├── services/         # Business Logic & External API Integrations
│   │   ├── repositories/     # JPA Data Access Layers
│   │   ├── dto/             # Data Transfer Objects
│   │   └── User/Skill/etc.  # JPA Entities
│   └── src/main/resources/   # Application properties & config
└── Frontend/
    ├── src/
    │   ├── app/
    │   │   ├── pages/       # React components for various routes
    │   │   ├── data/        # Mock data for fallback scenarios
    │   │   └── types.ts     # TypeScript interface definitions
    │   └── services/        # Axios API service wrappers
    └── tailwind.config.js   # Tailwind CSS configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register`: Create a new account.
- `POST /api/auth/login`: Authenticate and receive a JWT.

### Student Features
- `GET /api/dashboard`: Aggregated endpoint for user skills and matched internships.
- `GET /api/users/{id}/skills`: Retrieve skills for a specific user.
- `POST /api/users/{userId}/skills`: Add new skills to a profile.
- `GET /api/internships`: List all available internships.
- `GET /api/internships/matches`: Get prioritized internship matches.
- `GET /api/saved-internships`: Retrieve bookmarked opportunities.

### Admin Features
- `GET /api/admin/dashboard`: Secure stats and activity feed (Admin role required).
- `GET /api/internships/fetch`: Trigger external API sync for new internship data.

## 🗄️ Database Schema

The system uses a relational schema with the following core tables:
- `users`: Stores account information and roles (`STUDENT`, `ADMIN`, `USER`).
- `skills`: Repository of professional skill tags.
- `user_skills`: Many-to-Many mapping between users and their skills.
- `internships`: Detailed internship posting data.
- `internship_skills`: Many-to-Many mapping between internships and required skills.
- `saved_internships`: User bookmarks for internships.

## ⚙️ Setup Instructions

### Backend Setup
1. Ensure Java 17+ and Maven are installed.
2. Configure your PostgreSQL credentials in `backend/src/main/resources/application.properties`.
3. Run the application:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Ensure Node.js is installed.
2. Install dependencies:
   ```bash
   cd Frontend
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## ⚠️ Known Issues & Notes
- **Enum Consistency**: The system supports `STUDENT`, `ADMIN`, and legacy `USER` roles. An automatic migration script runs on startup to align roles.
- **Mock Data Fallbacks**: Student-facing pages (Matches, Internships) are designed to fall back to static data if the backend is unreachable to ensure a consistent user experience.
- **API Keys**: External internship fetching requires a valid RapidAPI key for the JSearch API, which should be configured in `InternshipService.java`.

## 🔮 Future Improvements
- **Real-time Notifications**: Notify students when new matches are found.
- **Enhanced Matching**: AI-driven matching based on internship descriptions.
- **Direct Applications**: Integrated application tracking system within the platform.
