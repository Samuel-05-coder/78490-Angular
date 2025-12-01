import { ActionReducer } from '@ngrx/store';

const STORAGE_KEY = 'app_state_v1';

export function localStorageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (state === undefined) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return reducer(parsed, action);
        }
      } catch (e) {
      }
    }

    const nextState = reducer(state, action);

    try {
      const toSave = { auth: { user: nextState?.auth?.user ?? null } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
    }

    return nextState;
  };
}
