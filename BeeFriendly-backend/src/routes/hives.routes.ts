import express, { Request, Response, Router } from "express";
import hivesController from "../controllers/hives.controller";
import handleFileUpload from "../middlewares/image";
const hivesRouter = express.Router();

//Retrieve the list of the hives 
hivesRouter.get("/hives", hivesController.getAll)

//Retrieve the hive with the id
hivesRouter.get("/hives/:id", hivesController.getById)

//Add a new hive
hivesRouter.post("/hives", handleFileUpload)

//Modify the information  of the hive that has the identifier id
hivesRouter.put("/hives/:id", hivesController.updateById)

//Delete the hive that has the identifier id
hivesRouter.delete("/distributeurs/:id", hivesController.deleteById)


export default hivesRouter 