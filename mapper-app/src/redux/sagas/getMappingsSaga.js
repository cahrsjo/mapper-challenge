import { put, takeLatest } from 'redux-saga/effects';
import * as ACTIONS from '../actions/actions';

const getMappings = selectedMapper =>
  fetch(`http://localhost:3001/mappers/${selectedMapper}/mappings`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(response => response.json());

function* fetchMappings(action) {
  try {
    const { selectedMapper } = action;
    const payload = yield getMappings(selectedMapper);

    yield put({ type: ACTIONS.GET_MAPPINGS_SUCCESS, payload });
  } catch (e) {
    console.log('Saga error', e);
    // yield put({ type: 'ACTION_TYPE_FAIL', message: e.message });
  }
}

function* getMappingsSaga() {
  yield takeLatest(ACTIONS.GET_MAPPINGS, fetchMappings);
}

export default getMappingsSaga;
