import { router } from '../navigation';

export default(state, action) => {
  const newState = router.getStateForAction(action, state);
  return newState || state;
};
