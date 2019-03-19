import {createStore} from "redux";
import addressReducer from "../reducers/addressReducer";
import {loadState, saveState} from '../utils/localStorage';

const persistedState = loadState();

const store = createStore(
    addressReducer,
    persistedState
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
