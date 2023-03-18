import express, { Request, Response, Router, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import beekeeperService from "../services/beekeeper.service";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //input : username and password
        const {username, password} = req.body

        //look for username in db 
        const beekeeper = await beekeeperService.getByUsername(username)
        
        if(!beekeeper) {
            res.status(401).send("Invalid credentials")
        }

        //decrypt password and check if it matches the password
        console.log("password : ", password)
        
        console.log("cruyptess : ", beekeeper.password)
        const matching = await bcrypt.compare(password, beekeeper.password)
        console.log("AMBT : ", matching)
        if(!matching) {
            res.status(401).send("Invalid credentials")
        }


        //if credentials are valid : create token
        const secret : Secret = process.env.JWT_SECRET as Secret
        const token = jwt.sign({userId : beekeeper.id_beekeeper}, secret, {expiresIn : '1h'})

        res.status(200).send(token)
    } catch(err : any) {
        console.error(err);
        res.status(500).send('Internal server error')
    }
}

export default authenticate