import mongoose from "mongoose";

export default function dbConnect() {
  const databaseUrl = process.env.DATABASE_URL || "";
  if (!databaseUrl) {
    console.log("Invalid Database Url");
    process.exit(0);
  }
  mongoose
    .connect(databaseUrl)
    .then(() => console.log("Mongo Connected Successfully"))
    .catch((err) => {
      console.log("Some Issue Connecting to Data");
      process.exit(0);
    });
}
