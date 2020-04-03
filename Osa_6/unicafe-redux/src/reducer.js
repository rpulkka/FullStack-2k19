const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      let resultGood = initialState
      resultGood.good = state.good + 1
      resultGood.ok = state.ok
      resultGood.bad = state.bad
      return resultGood
    case 'OK':
      let resultOK = initialState
      resultOK.good = state.good
      resultOK.ok = state.ok + 1
      resultOK.bad = state.bad
      return resultOK
    case 'BAD':
      let resultBad = initialState
      resultBad.good = state.good
      resultBad.ok = state.ok
      resultBad.bad = state.bad + 1
      return resultBad
    case 'ZERO':
      let resultZero = initialState
      resultZero.good = 0
      resultZero.ok = 0
      resultZero.bad = 0
      return resultZero
    default: return state
  }
  
}

export default counterReducer