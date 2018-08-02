import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { RootNavigator } from '../routes/RootNavigator';

// const initState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams('Splash'));

// export default (state = initState, action) => {
//    const newState = RootNavigator.router.getStateForAction(action, state);
//    return newState || state;
// };

export default createNavigationReducer(RootNavigator);
