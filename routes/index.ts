import express from 'express';
import userRoutes from './user';
import adminRoutes from './admin';
import serviceRoutes from "./services";



const app = express.Router();

app.use("/user", userRoutes);
app.use("/services", serviceRoutes);
app.use("/admin", adminRoutes);



//servicesss
export default app;
