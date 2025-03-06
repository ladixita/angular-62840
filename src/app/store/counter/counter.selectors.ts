import { createFeatureSelector, createSelector } from '@ngrx/store';
import { counterFeatureKey, CounterState } from './counter.reducer';

export const selectCounterState =
  createFeatureSelector<CounterState>(counterFeatureKey);

export const selectCounterValue = createSelector(
  selectCounterState,
  (state) => state.value
);
