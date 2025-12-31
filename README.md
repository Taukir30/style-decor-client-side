# Project: Smart Home & Ceremony Decoration Booking System

## Purpose:
    StyleDecor is a full-stack appointment management and booking platform designed to modernize local decoration businesses. It bridges the gap between clients and creative professionals by replacing manual scheduling with an automated digital ecosystem. The application streamlines the entire workflow—from browsing decoration packages and checking decorator availability to secure payments and real-time on-site service tracking—ensuring a hassle-free experience for users and efficient operation management for business owners.

## Live URL: https://style-decor-client-side.netlify.app

## Key features:

    For Users (Clients):

       1. Smart Scheduling System: Browse decoration packages and book specific date slots for both in-studio consultations and on-site ceremonies.

       2. Real-Time Service Tracking: Track the exact status of on-site services through a 6-stage workflow (Assigned → Planning → Materials Prepared → On the Way → Setup in Progress → Completed).

       3. Decorator Availability Check: View decorator profiles, specialties, and real-time availability before booking.

       4. Secure Payment Integration: Seamlessly pay for packages and services online.

       5. Personalized Dashboard: Manage bookings, view history, and receive status updates.

       6. Receive payment automated receipt 

    For Admins (Business Management):

        1. Comprehensive Admin Dashboard: Visual analytics for revenue monitoring and service demand (histograms & charts).

        2. Service Coordination: Assign specific decorators or teams to paid on-site bookings.

        3. Resource Management: Full CRUD capabilities for managing decorators, services, and pricing packages.

        4. Financial Oversight: Track payment statuses and monitor business growth metrics.

    For Decorators (Staff):

        1. Dedicated Decorator Dashboard: A centralized hub to view "My Assigned Projects" and "Today's Schedule" at a glance.

        2. Project Status Management: Update the on-site service status step-by-step (e.g., mark as "On the Way" or "Setup Completed") which instantly notifies the client.

        3. Earnings & Payment History: Track personal earnings from completed services and view a detailed history of payments received.

        4. Schedule Overview: View upcoming appointments to manage workload effectively.

## NPM Packages Used:
    1. Tailwind CSS
    2. Tankstack Queries
    3. Axios
    4. Firebase
    5. Motion
    6. React Leaflet
    7. React Hook Form
    8. React Icons
    9. React Router
    10.Recharts
    11.Sweetalert2

## How to Run StyleDecor Locally

    1. Make sure Node.js (v16+) and Git are installed
    2. Clone the repository:
        git clone https://github.com/Taukir30/style-decor-client-side
    3. Go to the project folder:
        cd style-decor-client-side
    4. Install dependencies:
        npm install
    5. Create a .env file if required and add environment variables (see .env.example)
    6. Start the development server:
        npm run dev
    7. Open your browser and visit:
        http://localhost:5173
