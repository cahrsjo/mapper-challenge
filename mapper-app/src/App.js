import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getMappers,
  addMapping,
  removeMapping
} from './redux/actions/actionCreators';

import './App.css';
import Mapper from './components/mapper/Mapper.jsx';
import Mappers from './components/mapper/Mappers.jsx';

const mapStateToProps = (state, ownProps = {}) => {
  return { mappers: state.mappers || [], mappings: state.mappings };
};

const mapDispatchToProps = dispatch => {
  return {
    getStuff: () => dispatch(getMappers({ type: 'GET_MAPPERS' })),
    addStuff: (mapping, selectedMapper) =>
      dispatch(
        addMapping({
          type: 'ADD_MAPPING',
          data: {
            mapping,
            selectedMapper
          }
        })
      ),
    removeStuff: (to, selectedMapper) => {
      dispatch(
        removeMapping({
          type: 'REMOVE_MAPPING',
          data: {
            to,
            selectedMapper
          }
        })
      );
    }
  };
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      inputFormat: {},
      outputFormat: {},
      selectedMapper: 'vega'
    };
  }

  componentWillMount() {
    this.props.getStuff();
  }

  addMapping = mapping => {
    this.props.addStuff(mapping, this.state.selectedMapper);
  };

  removeMapping = (to: string) => {
    this.props.removeStuff(to, this.state.selectedMapper);
  };

  onChangeSelectedMapper = mapper => {
    this.setState({ selectedMapper: mapper });
  };

  render() {
    const { inputFormat, outputFormat } = this.state;
    const { mappers = [], mappings = [] } = this.props;
    const { addMapping, removeMapping, onChangeSelectedMapper } = this;

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">☆ Map the stars ☆</h1>
        </header>
        <Mappers
          mappers={mappers}
          onChangeSelectedMapper={onChangeSelectedMapper}
        />
        <Mapper
          inputFormat={inputFormat}
          outputFormat={outputFormat}
          add={addMapping}
          remove={removeMapping}
          mappings={mappings}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
