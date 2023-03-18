import models from "../models/sequelize";

  type hivesModel = typeof models.beehive;
  type hivesImgModel = typeof models.beehive_img;
  

const hivesService = {
    getByID : async(id : number) : Promise<hivesModel> => {
        const hive : hivesModel = await models.beehive.findByPk(id)
        return hive
    },

    getAll :async () : Promise<hivesModel[]>=> {
        const hives : hivesModel[] = await models.beehive.findAll()
        return hives
    }, 

    add :async (info : any) : Promise<hivesModel>=> {
        const hive : hivesModel = await models.beehive.create(info)
        return hive
    }, 


    addImg :async (info : any) : (Promise<hivesImgModel>) => {
        const hive_img :  hivesImgModel = await models.beehive_img.create(info)
        return hive_img
    }, 

    predictState :async (info : any) : Promise<string>=> {
        return "health state determined by the classifier model"
    },

    updateImg : async (img : hivesImgModel, info : any) : Promise<hivesImgModel> => {
        console.log(img)
        console.log(info)
        await img.update(info)
        return img
    },

    update : async (info : any, id : Number) : Promise<hivesModel>=> {

        const hive : hivesModel = await models.beehive.findByPk(id)
        await hive.update(info)
        return hive
    }, 

    delete :  async(id : number) => {
        const hive : hivesModel = await models.beehive.findByPk(id)
        await hive.destroy()
    }
}

export default hivesService