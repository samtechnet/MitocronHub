# Cinema Ticket Booking System

This project is a simplified ticket booking system for a cinema, implemented using Express.js (TypeScript). It provides an API for customers to request and book seats in the cinema, while ensuring that the maximum capacity is respected and preventing overbooking through the use of semaphores.

## Features

- Booking API endpoint to allow customers to book seats in the cinema.
- Proper synchronization using semaphores to handle concurrent ticket bookings.
- Display appropriate messages to customers indicating the success or failure of their booking.
- Configurable maximum capacity of the cinema.

## Technologies Used

- Express.js: A web application framework for building APIs using Node.js.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- MongoDB: A NoSQL database for storing cinema and booking information.
- Mongoose: An object modeling tool for MongoDB to interact with the database.
- Async Mutex: A library for creating mutex locks to manage concurrent access.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/samtechnet/MitocronHub.git
