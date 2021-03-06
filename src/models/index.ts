const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
import config from "config";

const db_host = config.get("db_host") as string;
const db_user = config.get("db_user") as string;
const db_database = config.get("db_database") as string;
const db_password = config.get("db_password") as string;
const db_port = config.get("db_port") as string;
const db_connection_string = config.get("db_connection_string") as string;

const db: any = {};

const sequelize = new Sequelize({
    database: db_database,
    username: db_user,
    password: db_password,
    host: db_host,
    port: db_port,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
    }
})

fs
    .readdirSync(__dirname)
    .filter((file: string) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach((file: any) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;