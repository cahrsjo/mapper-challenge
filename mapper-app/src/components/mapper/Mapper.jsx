/* @flow */
import React, { Component } from 'react';
import type { Mapping } from '../../types';

type Props = {
  add: Mapping => void,
  remove: Mapping => void,
  mappings: Array
};

class Mapper extends Component {
  constructor() {
    super();

    this.state = { from: '', to: '' };
  }

  onChangeFrom = e => {
    this.setState({ from: e.target.value });
  };

  onChangeTo = e => {
    this.setState({ to: e.target.value });
  };

  render() {
    const { add, remove, mappings = [] }: Props = this.props;

    const { from, to } = this.state;

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
          <h1 style={{ textAlign: 'center' }}>Add a mapping</h1>
          <div style={{ margin: '20px 0' }}>
            <input
              style={{
                padding: '20px',
                fontSize: '20px',
                marginRight: '20px'
              }}
              type="text"
              placeholder="from"
              onChange={this.onChangeFrom}
            />
            ⇨
            <input
              style={{
                padding: '20px',
                fontSize: '20px',
                marginLeft: '20px'
              }}
              type="text"
              placeholder="to"
              onChange={this.onChangeTo}
            />
          </div>
          <button
            style={{
              padding: '30px',
              border: '10px solid cadetblue',
              borderRadius: '20px',
              background: 'aliceblue',
              fontSize: '20px',
              color: 'hotpink',
              fontWeight: '700'
            }}
            onClick={() => {
              add({ from, to });
            }}
          >
            Add mapping
          </button>

          <h2 style={{ textAlign: 'center' }}>Existing mappers</h2>
          {!mappings.length && <h3>No mappings yet. Add one!</h3>}

          {mappings.length > 0 &&
            mappings.map((mapping, i) => {
              return (
                <div
                  key={i}
                  style={{
                    width: '50%',
                    border: '1px solid black',
                    padding: '10px',
                    margin: '10px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>
                    {mapping.from} ⇨ {mapping.to}
                  </span>
                  <button
                    style={{
                      padding: '5px 10px',
                      border: '5px solid hotpink',
                      borderRadius: '20px',
                      background: 'aliceblue',
                      fontSize: '20px',
                      color: 'cadetblue',
                      fontWeight: '300',
                      margin: '0 0 0 20px'
                    }}
                    onClick={() => remove(mapping.to)}
                  >
                    Remove mapping
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Mapper;
