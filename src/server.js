import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import publicationRoutes from "./routes/publication.routes.js";
import productRoutes from "./routes/product.routes.js";
import adoptionRoutes from "./routes/adoption.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import reportRoutes from "./routes//report.routes.js";
//INICIALIZACIONES
const app = express();

//CONFIGURACIONES

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", publicationRoutes);
app.use("/api", productRoutes);
app.use("/api", adoptionRoutes);
app.use("/api", interviewRoutes);
app.use("/api", reportRoutes);
app.set("port", process.env.PORT || 3000);

export default app;
