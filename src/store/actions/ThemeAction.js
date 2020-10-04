import * as Types from './Types';

export const ChangeNavBarAction = (index) => (dispatch) => {
  dispatch({type: Types.CHANGE_BOTTOM_NAV, payload: index});
};

export const GetNavBarAction = (scene) => (dispatch) => {
  let sceneIndex = 0;
  switch (scene) {
    case 'dashboard':
      sceneIndex = 0;
      break;

    case 'manage':
      sceneIndex = 2;
      break;

    case 'menu':
      sceneIndex = 3;
      break;

    default:
      sceneIndex = 0;
  }
  console.log('scene', scene);
  console.log('sceneIndex', sceneIndex);
  dispatch({type: Types.GET_BOTTOM_NAV, payload: sceneIndex});
};
