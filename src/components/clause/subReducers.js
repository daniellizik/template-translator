import * as actions from './actions'
import * as targets from './targets'
import * as rules from './rules'

// take view, mutations and apply them to list 
export const mutationDenormalizer = (view = [], open = [], mutations = []) => {
  return open.reduce((acc, node) => {
    // only mutate items in view
    return view.indexOf(node.id) < 0 ? [...acc, node] : [
      ...acc,
      {
        ...node,
        value: mutations.reduce((mutated, m) => {
          // this is where the before api stuff gets set
          const params = {...m, before: mutated}
          return rules[m.rule](params)
        }, node.value)
      }
    ] 
  }, [])
}

export const reduceView = ({clauseIndex}, clauses, {list}) => {
  return clauses.reduce((acc, clause, index) => {
    if (index !== clauseIndex)
      return [...acc, clause]
    const view = list.open.reduce((ids, node) => {
      const clauseResult = clause.queries.reduce((bool, obj) => {
        const targetResult = targets.query[obj.target](node, {...obj, rule: rules[obj.rule]})
        if (targetResult === false || bool === false)
          return false
        else if (targetResult === true)
          return true
      }, null)
      return !clauseResult ? ids : [...ids, node.id]
    }, [])
    return [
      ...acc,
      { ...clause, view }
    ]
  }, [])
}

export const reduceClauses = (state, action, type, key) => {
  let nextState
  const nextClauses = state.clauses.map((clause, clauseIndex) => {
    return clauseIndex !== action.clauseIndex ? clause : {
      ...clause,
      queries: clause.queries.map((query, queryIndex) => {
        return queryIndex !== action.queryIndex ? query : { ...query, [key]: action[key] }
      })
    }
  })
  let clauses = nextClauses
  try {
    nextState = {
      ...state,
      clauses: reduceView(action, nextClauses, state.slave)
    }
  }
  catch(e) {
    console.warn('error', e)
    return {
      ...state,
      clauses,
      // todo: this needs work, use declarative config
      // this should be result of validation error methods
      // validation reducers should dispatch actions
      // that form UI will react to
      error: (() => {
        if (e.message.includes('Invalid regular expression'))
          return actions.CLAUSE_INVALID_REGEXP
        else if (e.message.includes('Attribute key cannot contain spaces'))
          return actions.CLAUSE_INVALID_ATTRKEY
      })()
    }
  }
  return nextState
}