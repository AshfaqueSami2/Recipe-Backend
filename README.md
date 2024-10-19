
# Recipe Management System

## Introduction

A user-friendly and responsive Recipe management system built with TypeScript. The system provides two dashboards: one for users to manage their recipe  and another for admins to manage recipe admin can publish unpublished recipe and statistics.

## Project Overview
This project allows users to easily learn cook with my website and view their own recipe  history. Administrators have access to a dedicated dashboard where they can add, edit, and delete recipe, as well as view how many upvote downvote. The system is built with a focus on responsiveness and ease of use.

## Features
 
 * **User Dashboard** : View and manage recipe etc.
 * **Admin Dashboard** : Add, edit, delete sports recipe etc.
 * **Booking Management** : Admins can view the total number of recipe .
 * **Responsive Design** : Optimized for mobile and desktop users..

 ## Technology Stack

 * **FrontEnd** : TypeScript, React, TailwindCSS
 * **State Management** : Redux Toolkit
 * **Backend** :Node.js, Express
 * **Database**:  MongoDB
 * **Payment Integration**: AmarPay for booking payments(Pending)

 ## Installation Guidelines(Backend)
Ensure you have the following installed on your system:
 * **Node.js**
 * **MongoDB**

### Backend Link
```
[ https://github.com/AshfaqueSami2/Recipe-Share-Backend/]

```


 ### Installation Steps

 1. Clone the repository:
 ```
 git clone https://github.com/AshfaqueSami2/Recipe-Share-Frontend/
 cd Recipe-Share-Frontend/
 ```
 2. Install dependencies:
 ```
 npm install 
 ```
 3. Create a .env file in the root directory and add the following:
 ```
PORT=5000
DB_URL=your_mongo_db_connection_uri
API_KEY=your_api_key_here
 ```
4. Start the development server:
```
npm run start:dev
```

## Configuration 
* Ensure the ```.env``` file is correctly configured for database connection and API keys.
* Admin and user roles are managed through role-based authentication.

## Usage

* **User Dashboard** : Log in to view your current bookings, check recipe upvaote downvote

* **Admin Dashboard**: Manage Recipe, Recipe statistics, and add/edit/delete REcipe.

# Installation Guidelines (Frontend)
 ## Prerequisites

 Before starting, ensure you have the following software installed on your machine:

 * **Node.js**: Download and install from [Node.js](https://nodejs.org/en)
 * **npm** or **yarn**: This comes with Node.js, but ensure it's up to date:

 ```
 npm install -g npm
```
or if you are using yarn: 
```
npm install -g yarn
```

## Installation Steps

1. **Clone the Repository** : First, clone the frontend repository to your local machine:


```
https://github.com/AshfaqueSami2/Recipe-Share-Frontend
cd Turf-FrontEnd
```

2. **Install Dependencies** : Once you're in the project directory, install the required dependencies:

```
npm install or npm i
```

or,if you are using yarn 

```
yarn install
```

3.**Running the Development Server**: Once the dependencies are installed and the environment is set up, start the development server:

```
npm run dev
```

or with yarn:
```
yarn dev
```

4. **Access the Application** : Open your browser and navigate to:

```
http://localhost:3000/
```

5. **Build for Production**:  To create an optimized build for production, run:

```
npm run build
```

or with yarn:

``` 
yarn build
```

## Contributing
 We welcome contributions! Please read our contributing guide for more details.

###  Contact
Project Maintainer: Sami


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
