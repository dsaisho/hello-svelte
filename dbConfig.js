import { dev } from '$app/environment';


const setupConfig = ()=>{
    const prodEnv = {
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        host: `${process.env.DB_HOST}`,
        database: `${process.env.DB_DATABASE}`,
    }
    const devEnv = {
        user: `${process.env.DB_USER_DEV}`,
        password: `${process.env.DB_PASSWORD_DEV}`,
        host: `${process.env.DB_HOST_DEV}`,
        database: `${process.env.DB_DATABASE_DEV}`,
    }
    //return prodEnv;
    return dev ? devEnv : prodEnv;
}
export default setupConfig();
