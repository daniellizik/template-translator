import baseState from '~/test/stateFixtures/test'
import { basic } from '~/test/stateFixtures/clauses'
import reducer from '~/src/store/rootReducer'
import { reduceView } from '~/src/components/clause/reducers/util'

export default {
  ...baseState,
  activeClause: 0,
  clauses: reduceView(0, baseState.slave, basic)
}