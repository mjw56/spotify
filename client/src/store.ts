import createState from 'react-copy-write';

export interface SearchGroup {
  items: object[];
}

interface IAppState {
  albumViewingLoaded: boolean;
  artistViewing: ArtistPage;
  authorized: boolean;
  currentPlayingTrack: object | null;
  playlistViewing: Playlist;
  searchResultsLoaded: boolean;
  sessionEnded: boolean;
  showHiddenMenu: boolean;
  showPlayer: boolean;
  trackDetails: object | null;
  theme: string;
  user: object | null;
}

export const defaultState = {
  artistViewing: {
    images: [{ url: '' }],
    name: '',
    tracks: [],
  },
  playlistViewing: {
    description: '',
    images: [{ url: '' }],
    name: '',
    tracks: {
      items: [],
    },
    uri: '',
  },
  theme: 'dark',
  trackDetails: {
    context: {
      metadata: {
        context_description: '',
      },
      uri: '',
    },
    duration: 0,
    paused: true,
    track_window: {
      current_track: {
        album: { images: [{ url: '' }] },
        artists: [{ name: '' }],
        name: '',
        uri: '',
      },
    },
  },
};

const appState: IAppState = {
  albumViewingLoaded: false,
  artistViewing: defaultState.artistViewing,
  authorized: false,
  currentPlayingTrack: null,
  playlistViewing: defaultState.playlistViewing,
  searchResultsLoaded: false,
  sessionEnded: false,
  showHiddenMenu: false,
  showPlayer: false,
  theme: defaultState.theme,
  trackDetails: defaultState.trackDetails,
  user: null,
};

export const { Provider, Consumer, createSelector, mutate } = createState(
  appState
);

/* ACTIONS */

export const showHiddenMenu = () =>
  mutate(draft => {
    draft.showHiddenMenu = true;
  });

export const hideHiddenMenu = () =>
  mutate(draft => {
    draft.showHiddenMenu = false;
  });

export const authorize = (authorized: boolean) =>
  mutate(draft => {
    draft.authorized = authorized;
  });

export const setUser = (user: object) =>
  mutate(draft => {
    draft.user = user;
  });

export const showPlayer = () =>
  mutate(draft => {
    draft.showPlayer = true;
  });

export const hidePlayer = () =>
  mutate(draft => {
    draft.showPlayer = false;
  });

export const playTrack = (track: any) =>
  mutate(draft => {
    draft.currentPlayingTrack = track;
  });

// @TODO
export const playAlbum = (album: any) =>
  mutate(draft => {
    draft.currentPlayingTrack = album;
  });

export const setTrackDetails = (trackDetails: any) =>
  mutate(draft => {
    if (trackDetails === null) {
      draft.trackDetails = defaultState.trackDetails;
    } else {
      draft.trackDetails = trackDetails;
    }
  });

export const setArtistViewing = (artist: any) =>
  mutate(draft => {
    draft.artistViewing = { ...draft.artistViewing, ...artist };
  });
export const setArtistViewingTopTracks = (tracks: any) =>
  mutate(draft => {
    draft.artistViewing.tracks = tracks;
  });
export const resetArtistViewing = () =>
  mutate(draft => {
    draft.artistViewing = defaultState.artistViewing;
  });

export const setPlaylistViewing = (playlist: any) =>
  mutate(draft => {
    draft.playlistViewing = playlist;
  });
export const resetPlaylistViewing = () =>
  mutate(draft => {
    draft.playlistViewing = defaultState.playlistViewing;
  });

export const setTheme = (theme = '') =>
  mutate(draft => {
    theme = theme.toLowerCase();
    draft.theme = theme;

    if (window.localStorage) {
      window.localStorage.setItem('wavves-theme', theme);
    }
  });

export const endSession = () =>
  mutate(draft => {
    draft.sessionEnded = true;
  });

export const setLoggedOut = () => {
  mutate(draft => {
    draft.sessionEnded = true;
    draft.authorized = false;
  });
};

/* SELECTORS */

const selectShowHiddenMenuFn: any = (state: IAppState) => state.showHiddenMenu;
export const selectShowHiddenMenu = createSelector(selectShowHiddenMenuFn);

const selectUserFn: any = (state: IAppState) => state.user;
export const selectUser = createSelector(selectUserFn);

const selectAuthorizedFn: any = (state: IAppState) => state.authorized;
export const selectAuthorized = createSelector(selectAuthorizedFn);

const selectShowPlayerFn: any = (state: IAppState) => state.showPlayer;
export const selectShowPlayer = createSelector(selectShowPlayerFn);

const selectCurrentPlayingTrackFn: any = (state: IAppState) =>
  state.currentPlayingTrack;
export const selectCurrentPlayingTrack = createSelector(
  selectCurrentPlayingTrackFn
);

const selectTrackDetailsFn: any = (state: IAppState) => state.trackDetails;
export const selectTrackDetails = createSelector(selectTrackDetailsFn);

const selectArtistViewingFn: any = (state: IAppState) => state.artistViewing;
export const selectArtistViewing = createSelector(selectArtistViewingFn);

const selectPlaylistViewingFn: any = (state: IAppState) =>
  state.playlistViewing;
export const selectPlaylistViewing = createSelector(selectPlaylistViewingFn);

const selectThemeFn: any = (state: IAppState) => state.theme;
export const selectTheme = createSelector(selectThemeFn);

const selectSessionEndedFn: any = (state: IAppState) => state.sessionEnded;
export const selectSessionEnded = createSelector(selectSessionEndedFn);
