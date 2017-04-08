import * as constants from '../constants'

export default {
  activate: (clauseIndex) => ({
    type: constants.CLAUSE_ACTIVATE,
    clauseIndex
  }),
  add: () => ({
    type: constants.CLAUSE_ADD
  }),
  remove: (clauseIndex) => ({
    type: constants.CLAUSE_REMOVE,
    clauseIndex
  }),
  removeAll: () => ({
    type: constants.CLAUSE_REMOVE_ALL
  }),
  changeName: (clauseIndex, name) => ({
    type: constants.CLAUSE_CHANGE_NAME,
    clauseIndex,
    name
  })
}