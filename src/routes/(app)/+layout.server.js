
import { env } from '$env/dynamic/private';

export const ssr = false;

const secret = env.AUTH_SECRET;

export const load = async (event) => {

  const session = await event.locals.auth()
  return {
    session,
    secret:secret
  }
}
