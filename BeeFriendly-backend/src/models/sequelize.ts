import { Sequelize} from "sequelize";
import initModels from "./init-models"

const sequelize = new Sequelize('beefriendly', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const models : any = initModels(sequelize);

export default models