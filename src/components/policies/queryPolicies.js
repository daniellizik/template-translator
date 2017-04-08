import React from 'react'
import {
  TargetSetter,
  TargetValueSetter,
  ChangeRule,
  RegexBodySetter,
  RegexFlagsSetter,
  AttrKeySetter,
  AttrValSetter,
  AddAttrSetter,
  AddAttrMutator,
  RemoveAttrByKeyMutator,
  RemoveAttrByValueMutator,
  RemoveAllAttrsMutator
} from '~/src/components/clause/clauses'


/**
 * policy
 * @prop {array<string>} target - refers to html AST node property
 * @prop {array<string>} rules - refers to homebrew rules, see ~/src/components/clause/rules
 * @prop {function} structure - structure to render if target and rules pass
 */

export default [
  {
    target: ['TEXT'], 
    rules: ['EQUALS', 'NOT_EQUALS', 'LIKE', 'NOT_LIKE'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <ChangeRule {...props} />
        </div>
        <div class="col-12 mt-2">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['TEXT'],
    rules: ['REGEX'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <ChangeRule {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexBodySetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexFlagsSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['NODE_NAME'],
    rules: ['EQUALS', 'NOT_EQUALS', 'LIKE', 'NOT_LIKE'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <ChangeRule {...props} />
        </div>
        <div class="col-12 mt-2">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['NODE_NAME'],
    rules: ['REGEX'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <ChangeRule {...props} />
        </div>
        <div class="col-12 mt-2">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['ATTR_KEY'],
    rules: ['EQUALS', 'NOT_EQUALS', 'LIKE', 'NOT_LIKE'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <ChangeRule {...props} />
        </div>
        <div class="col-12 mt-2">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['ATTR_KEY'],
    rules: ['REGEX'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <ChangeRule {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexBodySetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexFlagsSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['ATTR_VAL'],
    rules: ['EQUALS', 'NOT_EQUALS', 'LIKE', 'NOT_LIKE'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <ChangeRule {...props} />
        </div>
        <div class="col-12 mt-2">
          <TargetValueSetter {...props} />
        </div>
      </div>
    )
  },
  {
    target: ['ATTR_VAL'],
    rules: ['REGEX'],
    structure: (props) => (
      <div class="row pt-2 m-0">
        <div class="col-6">
          <TargetSetter {...props} />
        </div>
        <div class="col-6">
          <ChangeRule {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexBodySetter {...props} />
        </div>
        <div class="col-6 mt-2">
          <RegexFlagsSetter {...props} />
        </div>
      </div>
    )
  }
]