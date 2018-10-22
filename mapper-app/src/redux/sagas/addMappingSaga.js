import { put, takeLatest } from 'redux-saga/effects';
import * as ACTIONS from '../actions/actions';

const addMapping = (mapping, selectedMapper) =>
  fetch(
    `http://localhost:3001/mappers/${selectedMapper}/mappings/${mapping.to.replace(
      /\./g,
      '-'
    )}`,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ from: mapping.from })
    }
  ).then(response => response);

function* addMappingFunction(action) {
  try {
    const { mapping, selectedMapper } = action.data;

    const res = yield addMapping(mapping, selectedMapper);

    if (res.status === 204) {
      console.log('ADD MAPPING SUCCESS!');
      yield put({ type: ACTIONS.GET_MAPPINGS, selectedMapper });
    }
  } catch (e) {
    console.log('Saga error', e);
    // yield put({ type: 'ACTION_TYPE_FAIL', message: e.message });
  }
}

function* addMappingSaga() {
  yield takeLatest(ACTIONS.ADD_MAPPING, addMappingFunction);
}

export default addMappingSaga;
