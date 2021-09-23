import {
  TypedUseSelectorHook,
  useSelector as originalUseSelector
} from 'react-redux'
import { combineReducers } from 'redux'

import { reducer as personReducer } from './person'

export const rootReducer = combineReducers({
  person: personReducer
})

type StoreState = {
  person: ReturnType<typeof personReducer>
}

export const useSelector: TypedUseSelectorHook<StoreState> = originalUseSelector
