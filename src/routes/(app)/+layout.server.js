
import { env } from '$env/dynamic/private';
const secret = env.AUTH_SECRET;

export const load = async (event) => {


  const session = await event.locals.auth()
  return {
    session,
    secret:secret
  }
}
