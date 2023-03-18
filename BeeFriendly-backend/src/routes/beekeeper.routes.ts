import express, { Request, Response, Router } from "express";
import beekeeperController from "../controllers/beekeeper.controller";
import authenticate from "../middlewares/authentication";


const userRouter = express.Router();

//add a new user
userRouter.post("/register", beekeeperController.create)

//check if user exists, and then generate token
userRouter.post("/login", authenticate, beekeeperController.get)


export default userRouter 