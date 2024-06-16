# Leonardo AI Challange

## Setting Up the Project

### Prerequisites

- Ensure you have PostgreSQL installed on your machine.

### Steps to Setup

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Update `.env` and `.env.test` files:**

   - Open `.env` file and replace `username` and `password` with your PostgreSQL username and password:

     ```dotenv
     DATABASE_URL="postgresql://your_username:your_password@localhost:5432/leonardo_ai_schedule"
     ```

   - Open `.env.test` file and replace `username` and `password` with your PostgreSQL username and password:
     ```dotenv
     DATABASE_URL="postgresql://your_username:your_password@localhost:5432/testdb"
     ```

3. **Create a `.env.test` file in the project root directory with the following variable:** (Replace with your username & password)

   ```dotenv
   DATABASE_URL="postgresql://username:password@localhost:5432/testdb"
   ```

4. **Apply database migrations:**

   ```bash
   npm install
   ```

5. **Install the necessary dependencies:**
   ```bash
   npx prisma migrate dev
   ```

### Running the Project

To run the project in development mode:

```bash
npm run dev
```

### Running Tests

To run unit and integration tests:

```bash
npm run test
```

![Tests Passing](./images/test-snapshot.png)

## Project Structure

![Project Structure](./images/project-structure.png)

### Notes

- Ensure PostgreSQL server is running and accessible with the provided credentials in the `.env` files.
- Adjust the `username` and `password` in the `DATABASE_URL` according to your PostgreSQL setup.
