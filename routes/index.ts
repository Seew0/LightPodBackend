import express from 'express';
import userRoutes from './user';
import serviceRoutes from "./services";
import logsRoutes from "./logs";
import apiRoutes from "./api"; 



const app = express.Router();

app.use("/user", userRoutes);

app.use("/services", serviceRoutes);
app.use("/logs",logsRoutes);
app.use("/v1",apiRoutes);



//servicesss
export default app;
