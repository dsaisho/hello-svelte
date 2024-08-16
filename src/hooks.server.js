import { handle as authHandle } from "./auth"
import { sequence } from '@sveltejs/kit/hooks';

const authorizationHandle = async ({ event, resolve })=>{
    const session = await event.locals.auth();
    console.log('sessiontest')
    return resolve(event);
}


export const handle = sequence(authHandle, authorizationHandle)