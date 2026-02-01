# Hotel Reservation System (API)

Backend API for a hotel reservation system built with NestJS + TypeORM + Postgres.

## Features

- **Authentication**
  - Signup + login
  - JWT-protected routes
  - Role-based authorization (e.g. `staff`)
- **Hotels (staff)**
  - Create / update / delete hotels
  - Get hotel by id
- **Room Types (staff)**
  - CRUD room types scoped to a hotel
- **Rooms**
  - Create/update/delete rooms (staff)
  - Fetch room by id
- **Reservations (guest, JWT)**
  - Create reservation with inventory checks
  - List reservations for logged-in guest
  - Get reservation by id
  - Cancel reservation

## Tech stack

- NestJS
- TypeORM
- Postgres (`pg`)
- Passport (local + JWT)
- `class-validator` / `class-transformer`

## API versioning

The API uses **URI versioning**, so all routes are under:

`/v1/...`

Example:

`GET /v1/hotels/1`

## Setup

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment variables

Copy the example env file and fill the values:

```bash
cp .env.example .env
```

Required variables (see `.env.example`):

- `ENABLE_DB=true`
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `DATABASE_NAME`
- `PORT`
- `JWT_SECRET`
- `JWT_EXPIRE_IN`

### 3) Run migrations

```bash
pnpm run migration:run
```

### 4) Start the API

```bash
pnpm run start:dev
```

Default URL:

`http://localhost:<PORT>/v1`

## Postman

An importable Postman collection is included:

`postman/hotel-reservation-system.postman_collection.json`

Collection variables:

- `{{baseUrl}}` (e.g. `http://localhost:3000`)
- `{{token}}` (JWT)
- `{{hotelId}}`, `{{roomId}}`, `{{roomTypeId}}`, `{{reservationId}}`

## Typical workflow (end-to-end)

### 1) Bootstrap users (Guest / Staff)

- **Guest**
  - Signup: `POST /v1/auth/signup`
  - Login: `POST /v1/auth/login` -> receive JWT token
- **Staff**
  - Create / use a user that has role `staff`
  - Login to get a JWT token (used for staff-only endpoints)

### 2) Staff sets up the hotel catalog

- Create a hotel (staff): `POST /v1/hotels`
- Create room types for the hotel (staff): `POST /v1/hotels/:hotelId/room-types`
- Create rooms mapped to a room type (staff): `POST /v1/hotels/:hotelId/rooms`

### 3) Seed `room_type_inventory` (required for reservations)

Reservation creation depends on `room_type_inventory` being present for every date in the requested range.

If inventory is missing for any date, the API returns a 400 like:

`Inventory not configured for dates: YYYY-MM-DD, ...`

### 4) Guest makes reservations

- Create reservation (guest JWT): `POST /v1/reservations`
- View reservations: `GET /v1/reservations` and `GET /v1/reservations/:id`
- Cancel reservation: `DELETE /v1/reservations/:id`

## Endpoints (high level)

### Auth

- `POST /v1/auth/signup`
- `POST /v1/auth/login`

### Users

- `POST /v1/users`

### Hotels

- `POST /v1/hotels` (staff)
- `GET /v1/hotels/:id`
- `PUT /v1/hotels/:id` (staff)
- `DELETE /v1/hotels/:id` (staff)

### Room Types (staff)

- `POST /v1/hotels/:hotelId/room-types`
- `GET /v1/hotels/:hotelId/room-types`
- `GET /v1/hotels/:hotelId/room-types/:id`
- `PUT /v1/hotels/:hotelId/room-types/:id`
- `DELETE /v1/hotels/:hotelId/room-types/:id`

### Rooms

- `POST /v1/hotels/:hotelId/rooms` (staff)
- `GET /v1/hotels/:hotelId/rooms/:id`
- `PUT /v1/hotels/:hotelId/rooms/:id` (staff)
- `DELETE /v1/hotels/:hotelId/rooms/:id` (staff)

### Reservations (JWT)

- `GET /v1/reservations`
- `GET /v1/reservations/:id`
- `POST /v1/reservations`
- `DELETE /v1/reservations/:id`

## Inventory note (important)

Reservation creation depends on `room_type_inventory` being configured for every date in the requested range. If inventory is missing for any date, the API will return a 400 with an error like:

`Inventory not configured for dates: YYYY-MM-DD, ...`

