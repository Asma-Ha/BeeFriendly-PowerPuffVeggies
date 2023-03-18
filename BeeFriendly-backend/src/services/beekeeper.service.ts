import models from "../models/sequelize";
import bcrypt, { hash } from 'bcrypt'

    type beekeeperModel = typeof models.beekeeper;
    import { v4 as uuidv4 } from 'uuid';

const beekeeperService = {
    getByUsername : async(username : string) : Promise<beekeeperModel> => {
        console.log("username is ", username)
        const beekeeper : beekeeperModel  = await models.beekeeper.findOne({
            where : {
                username
            }
        })
        console.log("beekepperr", beekeeper)
        return beekeeper
    },

    add :async (info : any) : Promise<beekeeperModel>=> {
        
        //hashing the password 
        const hashed = await bcrypt.hash(info.password, 10)
        info.password = hashed

        
        const account : beekeeperModel = {
            id_beekeeper : uuidv4(),
            ...info
        }
        console.log(account)
        const beekeeper : beekeeperModel = await models.beekeeper.create(account)
        return beekeeper
    }
}

export default beekeeperService