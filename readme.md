# Blogs Backend
## Description
This project is a simple blogging platform that utilizes TypeScript, Sequelize, PostgreSQL, Docker, and Node.js. It allows users to create and update blog posts through a server built with Node.js.

## Features
<li>Create new blog posts
<li>Update existing blog posts
<li>PostgreSQL database for data storage
<li>Docker for containerized database deployment
<li>TypeScript for type-safe JavaScript development
<li>Sequelize as the ORM for database interactions

## Requirements
Ensure you have the following installed on your machine:
<li>Node.js
<li>Docker

## Installation
1. Clone the repository
```bash
git clone https://github.com/vasudeogaichor/blogs-api
cd blogs-api
```

2. Install dependencies
```bash
npm install
```
3. Set up the PostgreSQL docker container
```bash
docker-compose up -d
```

## Configuration
Update the .env.sample file to your PORT numbers and credentials and save it as .env

## Usage
1. Run the server
```bash
npm run dev
```
Access the endpoint at http://localhost:3000
