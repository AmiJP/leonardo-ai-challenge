# Leonardo AI Challange

## Setting Up the Project

### Prerequisites

- Ensure you have PostgreSQL installed on your machine.

### Steps to Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AmiJP/leonardo-ai-challenge.git
   cd leonardo-ai-challenge
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

3. **Apply database migrations:**

   ```bash
   npx prisma migrate dev
   ```

4. **Install the necessary dependencies:**

   ```bash
   npm install
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
