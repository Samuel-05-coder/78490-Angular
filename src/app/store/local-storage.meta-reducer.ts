import { ActionReducer } from '@ngrx/store';

const STORAGE_KEY = 'app_state_v1';

export function localStorageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    // On init (state === undefined) try to rehydrate
    if (state === undefined) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          // parsed should be an object with shape { auth: { ... } }
          return reducer(parsed, action);
        }
      } catch (e) {
        // ignore
      }
    }

    const nextState = reducer(state, action);

    try {
      const toSave = { auth: nextState?.auth };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      // ignore storage errors
    }

    return nextState;
  };
}
