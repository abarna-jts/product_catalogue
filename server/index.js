import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import catalogueRoutes from "./routes/catalogue.js";
import categoryRoutes from "./routes/category.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Define routes
app.use("/server/auth", authRoutes);
app.use("/server/catalogue", catalogueRoutes);
app.use("/server/category", categoryRoutes);

app.listen(8800, () => {
  console.log("Server connected on port 8800");
});
