import { chainReducers } from '~/src/util'
import initialState from './state'
import sourceSetter from '~/src/containers/sourceSetter/reducer'
import builder from '~/src/components/clause/reducers/builderReducer'
import clause from '~/src/components/clause/reducers/clauseReducer'
import mutation from '~/src/components/clause/reducers/mutationReducer'
import query from '~/src/components/clause/reducers/queryReducer'
import view from '~/src/components/clause/reducers/viewReducer'
import xml from '~/src/components/xml/xmlReducer'
import { reducer as overlay } from '~/src/containers/overlay'
import { reducer as navigation } from '~/src/components/navigator'
import { composedReducer as onboarding } from '~/src/containers/onboarder/reducer'

export default (state = initialState, action) => {
  if (state.onboarding.step > -1)
    return onboarding(state, action)
  return chainReducers(
    state,
    action,
    sourceSetter,
    builder,
    clause,
    mutation,
    query,
    view,
    xml,
    overlay,
    navigation
  )
}