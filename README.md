# Parkathon Frontend

**AI-Powered Parking Availability Prediction**

Parkathon predicts parking availability within a specified radius, providing users with a color-coded map indicating open spaces. It also utilizes voice command for safe navigation, because finding a place to park can be a sprint and not a marathon!

## Features

### Core Functionality
- 🎯 **Smart Destination Setting**: Set destinations via typing, voice command, or frequent locations
- 🗺️ **AI-Powered Parking Prediction**: View color-coded parking availability on an interactive map
- 🎤 **Voice Commands**: Hands-free navigation for safer driving
- 📍 **Active Parking Management**: Track and manage your current parking locations
- ⭐ **Frequent Locations**: Save and quickly access your most-visited destinations
- 🚙 **Multi-Car Support**: Manage multiple vehicles and their parking history
- ♿ **Accessibility Support**: Special features for accessible parking spots
- 📊 **Parking History**: View your complete parking history

## Tech Stack

- **Framework**: React 19 (RC)
- **Routing**: React Router 7
- **Styling**: Tailwind CSS
- **Maps**: Leaflet & React Leaflet
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Create React App

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd parkathon-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and configure your environment variables (see [Environment Setup](#environment-setup))

4. **Start the development server**
   ```bash
   npm start
   ```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
API_BASE_URL=http://localhost:3001/api
```

## Project Structure

```
parkathon-frontend/
├── public/              # Static assets & index.html
├── src/
│   ├── api/            # API client & methods for each resource
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React Context providers
│   ├── router/         # Route definitions & protected routes
│   ├── utils/          # Validators, formatters, constants, helpers
│   ├── App.js          # Root component
│   ├── index.js        # App entry point
│   └── index.css       # Global styles (Tailwind)
├── .env.example        # Environment variables template
├── package.json        # Dependencies
└── README.md           # This file
```

## License

MIT

## Contributors

Parkathon Team - Software Engineering II Course
