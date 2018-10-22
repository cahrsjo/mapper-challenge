import { put, takeLatest } from 'redux-saga/effects';
import * as ACTIONS from '../actions/actions';

const addMapping = (to, selectedMapper) =>
  fetch(
    `http://localhost:3001/mappers/${selectedMapper}/mappings/${to.replace(
      /\./g,
      '-'
    )}`,
    {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    }
  ).then(response => response);

function* removeMappingFunction(action) {
  try {
    const { to, selectedMapper } = action.data;

    const res = yield addMapping(to, selectedMapper);

    if (res.status === 204) {
      console.log('REMOVE MAPPING SUCCESS!');
      yield put({ type: ACTIONS.GET_MAPPINGS, selectedMapper });
    }
  } catch (e) {
    console.log('Saga error', e);
    //TODO: Handle error. Dispatch action and set error state
    // yield put({ type: 'ACTION_TYPE_FAIL', message: e.message });
  }
}

function* removeMappingSaga() {
  yield takeLatest(ACTIONS.REMOVE_MAPPING, removeMappingFunction);
}

export default removeMappingSaga;
