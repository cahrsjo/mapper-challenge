/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMappings } from '../../redux/actions/actionCreators';

type Props = {
  mappers: Array,
  onChangeSelectedMapper: Function
};

type StateProps = {
  selectedMapper: string
};

const mapStateToProps = (state, ownProps = {}) => {
  return { mappers: state.mappers };
};

const mapDispatchToProps = dispatch => {
  return {
    getMappings: selectedMapper =>
      dispatch(getMappings({ type: 'GET_MAPPINGS', selectedMapper }))
  };
};

class Mappers extends Component {
  constructor() {
    super();

    this.state = {
      selectedMapper: 'vega'
    };
  }

  componentWillMount() {
    this.props.getMappings('vega');
  }

  onChangeMapper = e => {
    this.setState({ selectedMapper: e.target.value });
    this.props.onChangeSelectedMapper(e.target.value);
    this.props.getMappings(e.target.value);
  };

  render() {
    const { mappers }: Props = this.props;
    const { selectedMapper }: StateProps = this.state;

    const selected =
      (mappers.length &&
        mappers.filter(m => {
          return m.id === selectedMapper;
        })[0]) ||
      '';

    return (
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            margin: '0 auto',
            width: '968px',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h1 style={{ textAlign: 'center' }}>Select mapper</h1>
          <select
            name="mappers"
            style={{
              backgroundColor: 'aliceblue',
              color: 'hotpink',
              fontSize: '20px',
              border: '5px solid cadetblue',
              width: '200px'
            }}
            onChange={this.onChangeMapper}
            defaultValue="vega"
          >
            {mappers.length &&
              mappers.map((mapper, i) => {
                return (
                  <option key={i} value={mapper.id}>
                    {mapper.id}
                  </option>
                );
              })}
          </select>
          {selected && (
            <React.Fragment>
              <div style={{ margin: '20px 0' }}>
                <b>Input Format:</b>
                <pre>{JSON.stringify(selected.inputFormat, null, 2)}</pre>
              </div>
              <div>
                <b>Output Format:</b>{' '}
                <pre>{JSON.stringify(selected.outputFormat, null, 2)}</pre>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mappers);
