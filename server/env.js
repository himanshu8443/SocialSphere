require("dotenv").config();

// Load environment variables from .env file

const requiredEnvVariables = [
  "DATABASE_URL",
  "JWT_SECRET",
  // Add other required environment variables here
];

function checkEnvVariables() {
  const missingVariables = requiredEnvVariables.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVariables.length > 0) {
    console.error(
      `Error: Missing required environment variables: ${missingVariables.join(
        ", "
      )}`
    );
    process.exit(1); // Exit with a non-zero code to indicate failure
  } else {
    console.log(
      "All required environment variables present. Proceeding with the build..."
    );
  }
}

// Check environment variables before build
checkEnvVariables();
