import { Request, Response } from "express";
import hivesService from "../services/hives.service";


const hivesController = {
    getAll : async(req : Request, res : Response) => {
        try {
            const hives = await hivesService.getAll()
            res.status(200).json(hives)
        } catch (err : any){
            res.status(500).send('Internal server error')
        }
    },
    getById : async(req : Request, res : Response) => {
        try {
            const hive = await hivesService.getByID(Number(req.params.id))
            if(!hive) {
                res.status(404).send("Hive not found")
            }
            res.status(200).json(hive)
        } catch (err : any){
            console.log(err)
            res.status(500).send('Internal server error')
        }
    },

    create : async(req : Request, res : Response) => {
        try {
            console.log(req.body)
            //save the img to the db
            const img = await hivesService.addImg({hive_img_path : req.body.img})

            //pass to the model to get the health state label
            const prediction = await hivesService.predictState(req.body.img)

            //save hive to db
            let hive = {
                state : prediction, 
                desc_hive : req.body.desc_hive,
                location : req.body.location,
                time_listed : new Date(req.body.time_listed),
            }
            const hiveInstance = await hivesService.add(hive)

            //add hive id to img : 
            hivesService.updateImg(img, {"id_hive" : hiveInstance.id_hive})


            res.status(201).send("hive created successfully")
        } catch (err : any){
            res.status(500).send('Internal server error')
        }
    },
    updateById : async(req : Request, res : Response) => {
        try {
            const hive = await hivesService.update(req.body, Number(req.params.id))
            res.status(201).json(hive)
        } catch (err : any){
            res.status(500).send('Internal server error')
        }
    },

    deleteById : async(req : Request, res : Response) => {
        try {
            await hivesService.delete(Number(req.params.id))
            res.status(200).send(`deleted`)
        } catch (err : any){
            res.status(500).send('Internal server error')
        }
    },
}

export default hivesController