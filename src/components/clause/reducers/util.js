import * as constants from '../constants'
import * as targets from '../settings/targets'
import * as rules from '../settings/rules'
import * as behaviors from '../settings/behaviors'
import { targetMap } from '../settings/config'

export const errorHandler = ({message}) => {
  return message
}

export const setQueryProp = (state, action, key) => ({
  ...state,
  clauses: state.clauses.map((clause, clauseIndex) => {
    return clauseIndex !== action.clauseIndex ? clause : {
      ...clause,
      queries: clause.queries.map((query, ruleIndex) => {
        return ruleIndex !== action.ruleIndex 
        ? query 
        : key ? { ...query, [key]: action[key] } : query
      })
    }
  })
})

export const mutateList = (collection = [], view = []) => {
  return collection.reduce(({list, count}, node) => {
    return view.indexOf(node.id) === -1
      ? {
          list: [...list, {...node, viewed: false}],
          count
        }
      : {
          list: [...list, {...node, viewed: true, viewIndex: count}],
          count: count + 1
        }
  }, {list: [], count: 0}).list
}

// take view, mutations and apply them to FULL LIST, not open
// this makes it easier for xml tree to consume (it just spits out entire list)
export const mutationDenormalizer = (clause, list = []) => {
  const { target, view, mutations } = clause
  // mutations might have to mutate entire list, so give a copy to keep it immutable
  return list.reduce((acc, node, i, arr) => {
    // only mutate items in view
    return view.indexOf(node.id) < 0 ? [...acc, node] : [
      ...acc,
      // this needs to account for mutation behavior
      mutations.reduce((mutatedNode, mutation) => {
        const targetProp = targetMap[target]
        const params = {...mutation, before: mutatedNode[targetProp]}
        const ruleResult = rules[mutation.rule](params)
        // todo: implement this
        // const behaviorResult = behaviors[mutation.behavior](mutatedNode, mutation, arr, ruleResult)
        return {
          ...mutatedNode,
          [targetProp]: ruleResult
        }
      }, {...node})
    ] 
  }, [])
}

export const reduceRuleProp = (ruleType, state, action, prop) => {
  return {
    ...state,
    clauses: state.clauses.map((c, i) => (
      i !== action.clauseIndex ? c : {
        ...c,
        [ruleType]: c[ruleType].map((r, j) => (
          j !== action.ruleIndex ? r : {
            ...r,
            [prop]: action[prop]
          }
        ))
      }
    ))
  }
}

// notes 1
export const reduceView = (clauseIndex, {list, presort}, clauses) => {
  return clauses.reduce((acc, clause, index) => {
    if (index !== clauseIndex)
      return [...acc, clause]
    // const view = presort[clause.target].reduce((ids, node) => {
    const view = list.open.reduce((ids, node) => {
      const clauseResult = clause.queries.reduce((bool, obj) => {
        const targetResult = targets.query[clause.target](node, {...obj, rule: rules[obj.rule]})
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

export const reduceClauses = (state, action, key) => {
  let nextState
  const clauses = state.clauses.map((clause, clauseIndex) => {
    return clauseIndex !== action.clauseIndex ? clause : {
      ...clause,
      queries: clause.queries.map((query, ruleIndex) => {
        return ruleIndex !== action.ruleIndex 
        ? query 
        : key ? { ...query, [key]: action[key] } : query
      })
    }
  })
  try {
    nextState = {
      ...state,
      clauses: reduceView(action.clauseIndex, state.slave, clauses)
    }
  }
  catch(e) {
    process.env.NODE_ENV === 'development' && console.warn('error', e)
    return {
      ...state,
      clauses,
      error: errorHandler(e)
    }
  }
  return nextState
}