import * as types from './authActions';
import * as Actions from '../actions/constants';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  isReloading: false,
  loaded: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    // @UTOPIAN
    case Actions.GET_USER_REPOS_GITHUB_SUCCESS: {
      const repos = action.response || [];
      const { loggedUser } = action.additionalParams;

      if (loggedUser) {
        return {
          ...state,
          user: {
            ...state.user,
            repos,
          }
        };
      }
      return state;
    }
    // @UTOPIAN
    case Actions.GET_USER_SUCCESS: {
      const userData = action.response;

      return {
        ...state,
        user: {
          ...state.user,
          ...userData,
        }
      };
    }
    case types.LOGIN_START:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        loaded: false,
        user: {},
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        loaded: true,
        user: action.payload.account,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        loaded: true,
      };
    case types.RELOAD_START:
      return {
        ...state,
        isReloading: true,
      };
    case types.RELOAD_SUCCESS:
    case types.RELOAD_ERROR:
      return {
        ...state,
        isReloading: false,
      };
    case types.LOGOUT_START:
      return {
        ...state,
        isFetching: true,
        loaded: false,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        loaded: true,
        user: {},
      };
    default:
      return state;
  }
};

export const getIsAuthenticated = state => state.isAuthenticated;
export const getIsAuthFetching = state => state.isFetching;
export const getIsLoaded = state => state.loaded;
export const getIsReloading = state => state.isReloading;
export const getAuthenticatedUser = state => state.user;
export const getAuthenticatedUserName = state => state.user.name;
