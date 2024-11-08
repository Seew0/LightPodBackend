import express from 'express';
import userRoutes from './user';
import serviceRoutes from "./services";



const app = express.Router();

app.use("/user", userRoutes);
app.use("/services", serviceRoutes);



//servicesss
export default app;
