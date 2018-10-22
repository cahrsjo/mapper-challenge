import { put, takeLatest } from 'redux-saga/effects';
import * as ACTIONS from '../actions/actions';

const getMappers = () =>
  fetch('http://localhost:3001/mappers', {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(response => response.json());

function* fetchMappers() {
  try {
    const payload = yield getMappers();

    yield put({ type: ACTIONS.GET_MAPPERS_SUCCESS, payload });
  } catch (e) {
    console.log('Saga error', e);
    //TODO: Handle error
    // yield put({ type: '', message: e.message });
  }
}

function* getMappersSaga() {
  yield takeLatest(ACTIONS.GET_MAPPERS, fetchMappers);
}

export default getMappersSaga;
