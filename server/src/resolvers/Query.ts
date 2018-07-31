import api from '../api/spotify';
import { Context } from '../utils'
import refresh from 'passport-oauth2-refresh';
import generateJwt from '../services/jwt/generateToken';
import { getUserDetailsForToken } from '../services/spotify/api';

const refreshToken = (fn, args, user, response) => {
  return new Promise((resolve, reject) => {
    refresh.requestNewAccessToken('spotify', user.refreshToken, async (err, accessToken, refreshToken) => {
      user.accessToken = accessToken;

      const newToken = generateJwt(getUserDetailsForToken(user));
      response.cookie('jwt', newToken);

      args[2] = { ...args[2], user };
      const result = await fn(...args);
      resolve(result);
    });
  });
}

function handleErrors(fn) {
  return async function(...args) {
    try {
      const result = await fn(...args);
      return result;
    } catch (e) {
      if (e.status === 401) {
        const { response, user = {} } = args[2];
        return refreshToken(fn, args, user, response);
      }
    }
  }
}

async function artist(parent, { id }, ctx: Context, info) {
  const result = await api.getArtist(ctx.user.accessToken, id);
  return result;
};

async function artists(parent, { ids }, ctx: Context, info) {
  const result = await api.getArtists(ctx.user.accessToken, ids);
  return result;
};

async function album(parent, { id }, ctx: Context, info) {
  const result = await api.getAlbum(ctx.user.accessToken, id);
  return result;
};

async function albums(parent, { ids }, ctx: Context, info) {
  const result = await api.getAlbums(ctx.user.accessToken, ids);
  return result;
};

async function track(parent, { id }, ctx: Context, info) {
  const track = await api.getTrack(ctx.user.accessToken, id);
  return track;
};

function tracks(parent, { ids }, ctx: Context, info) {
  return api.getTracks(ctx.user.accessToken, ids);
};

async function recentlyPlayed(parent, {}, ctx: Context, info) {
  const { items } = await api.getRecentlyPlayed(ctx.user.accessToken);

  const recent = items.map(i => i.track);

  return recent;
};

async function search(parent, { query }, ctx: Context, info) {
  return api.search(ctx.user.accessToken, query);
}
export const Query = { 
  search: handleErrors(search)
};
