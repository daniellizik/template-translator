import * as constants from '../constants'
import * as sourceSetterConstants from '~/src/containers/sourceSetter/constants'
import { defaultQuery, MUTATION } from '../settings/config'
import { reduceView, reduceMutated, reduceClauses, mapMutations } from './util'
import { bindConstantsToReducers } from '~/src/util'

export default bindConstantsToReducers({
  [constants.QUERY_ADD]: (state, {clauseIndex}) => ({ 
    ...state, 
    clauses: reduceView(
      clauseIndex, 
      state.slave, 
      state.clauses.map((c, i) => i !== clauseIndex ? c : {
        ...c, queries: [...c.queries, defaultQuery]
      })) 
  }),
  [constants.QUERY_REMOVE]: (state, {clauseIndex, ruleIndex}) => ({
    ...state,
    clauses: reduceView(
      clauseIndex, 
      state.slave, 
      state.clauses.reduce((acc, c, i) => i !== clauseIndex ? [...acc, c] : [...acc, {
        ...c, queries: c.queries.filter((query, r) => r !== ruleIndex)
      }], [])
    )
  }),
  [constants.QUERY_CHANGE_RULE]: (state, action) => reduceClauses(state, action, 'rule'),
  [constants.QUERY_CHANGE_RULE_VALUE]: (state, action) => reduceClauses(state, action, 'ruleValue'),
  [constants.QUERY_CHANGE_TARGET_VALUE]: (state, action) => reduceClauses(state, action, 'targetValue'),
  [constants.QUERY_CHANGE_RULE_VALUE_FLAGS]: (state, action) => reduceClauses(state, action, 'ruleValueFlags')
})