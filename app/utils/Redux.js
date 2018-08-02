import {
   createReactNavigationReduxMiddleware,
   createNavigationPropConstructor,
} from 'react-navigation-redux-helpers';

const reduxMiddleware = createReactNavigationReduxMiddleware(
   'root',
   state => state.nav
);
const navigationPropConstructor = createNavigationPropConstructor('root');

export {
   reduxMiddleware,
   navigationPropConstructor
};
