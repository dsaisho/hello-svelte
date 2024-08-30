import adapter from '@sveltejs/adapter-node';
import { sveltePreprocess } from 'svelte-preprocess';
import preprocessReact from 'svelte-preprocess-react/preprocessReact';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),

  },
  preprocess: preprocessReact({
    preprocess: sveltePreprocess({ sourceMap: true }),
  }),
};

export default config;