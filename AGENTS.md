# Generate Production-Ready React Frontend
**Name:** Parkathon
**Description:** Parkathon uses AI to predict parking availability within a specified radius, providing users with a color-coded map indicating open spaces. It also utilizies voice command for safe navigation, cause finding to park can be a sprint and not a marathon!

## Input Sources (Priority Order)
1. **Mockups/Wireframes** (PRIMARY) - Visual structure & layout
2. **OpenAPI Spec** - API endpoints & data models
3. **User Stories** - User flows & interactions
4. **Activity Diagrams** - User journeys

SOURCE ARTIFACTS
1. MOCKUPS (for page structure and navigation):
Mockups are located at parkathon-frontend/agents/mockups.
You can find the structure of the mockups at parkathon-frontend/agents/mockups/diagrams-info.json
2. OPENAPI/SWAGGER SPECIFICATION (PRIMARY SOURCE for API/backend):
Can be found at parkathon-frontend/agents/openapi.yaml
3. USER STORIES (for UI features and user flows):
Can be found at parkathon-frontend/agents/user-stories.json

##FRONTEND STRUCTURE
package.json - Dependencies
.env.example - Environment variables
.gitignore - Git ignore rules
README.md - Documentation
public/*.* - Static assets & index.html
src/index.js - App entry point
src/App.js - Root component
src/index.css - Global styles
src/api/*.js - API client & methods for each resource
src/components/*.jsx - Reusable UI components
src/pages/*.jsx - Page components
src/hooks/*.js - Custom React hooks
src/context/*.jsx - React Context providers
src/router/*.jsx - Route definitions & protected routes
src/utils/*.js - Validators, formatters, constants, helpers

## Output Requirements
Generate complete React app with:
- Components from mockups
- Pages/routes from user flows
- API service layer (axios)
- State management
- Form validation
- Responsive design
- package.json with all deps
- Fetching data using backend endpoints (described in OpenAPI Spec)
- Use basic authentication
- Use create-react-app
- Use tailwindcss
