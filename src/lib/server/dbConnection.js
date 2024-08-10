import mysql from 'mysql2/promise';
import dbconfig from '/dbConfig.js'

export default async () => await mysql.createPool(dbconfig);