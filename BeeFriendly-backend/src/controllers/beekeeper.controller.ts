import { Request, Response } from "express";
import beekeeperService from "../services/beekeeper.service";





const beekeeperController = {
    create :async (req : Request, res : Response) => {
        try {
            
            const beekeeper = await beekeeperService.add(req.body)
            res.status(200).json(beekeeper)
        } catch (err : any){
            res.status(500).send('Internal server error')
        }
    },

    get :async (req : Request, res : Response) => {
            //the verification of credentials is done in the authentication
            res.status(500).send('Internal server error')
    }
}


export default beekeeperController