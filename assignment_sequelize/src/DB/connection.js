import {Sequelize} from "sequelize";

export const sequelize= new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    host:process.env.DB_URL,
    port:process.env.DB_PORT,
    dialect:"mysql"
});

export const testConnection= async ()=>{
    try {
        await sequelize.authenticate()
        console.log("connection on DB successfully");
        
    } catch (error) {
        console.error("unable connect on DB",error)
    }
}
export const asyncTables= async ()=>{
    try {
        await sequelize.sync({force:false,alter:false})
        console.log("All model where async successfully");
        
    } catch (error) {
        console.error("Unable where async",error)
    }
}