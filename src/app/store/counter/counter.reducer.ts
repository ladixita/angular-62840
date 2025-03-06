import { createReducer, on } from '@ngrx/store';
import { add, substract } from './counter.actions';

export const counterFeatureKey = 'counter';

// Estado del contador
export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterReducer = createReducer(
  // Primero definimos el estado inicial
  initialState,
  // Segundo vamos a atrapar las acciones...
  on(add, (state) => {
    return {
      ...state,
      value: state.value + 1,
    };
  }),
  on(substract, (state) => {
    return {
      ...state,
      value: state.value - 1,
    };
  })
);
