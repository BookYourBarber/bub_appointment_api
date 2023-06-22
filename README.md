# Appointment API

This is an API for managing appointments built with Node.js and Express.js.

## Table of Contents

- [Appointment API](#appointment-api)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Starting the Server](#starting-the-server)
    - [API Endpoints](#api-endpoints)
  - [Testing](#testing)
  - [Contributing](#contributing)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Change to the project directory:

   ```bash
   cd appointment
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

### Starting the Server

To start the API server, run the following command:

```bash
npm start
```

The server will start running on `http://localhost:5003`.

### API Endpoints

- **GET /appointments** - Get a list of all appointments.
- **GET /appointments/:id** - Get details of a specific appointment.
- **POST /appointments** - Create a new appointment.
- **DELETE /appointments** - Delete an appointment.

Make sure to replace `:id` with the actual ID of the appointment in the above endpoints.

## Testing

To run the automated tests, use the following command:

```bash
npm run test
```

The tests are located in the `tests` directory and are implemented using a testing framework Jest.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the functionality of the API, please submit a pull request.
