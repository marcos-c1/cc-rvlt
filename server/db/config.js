import { config } from 'dotenv';
import mysql from 'mysql';

config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
})

export default function connectDB(){
    connection.connect((err) => {
        if(err){
            throw err;
        }
        console.log('Connected to mysql database');
    })
}