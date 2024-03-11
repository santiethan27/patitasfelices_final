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
import paymentRoutes from "./routes/payment.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { FRONT_URL, PORT } from "./config.js";
//INICIALIZACIONES
const app = express();

//CONFIGURACIONES

app.use(
  cors({
    origin: `${FRONT_URL}`,
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
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);
app.set("port", PORT);

export default app;
