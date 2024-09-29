import React, { Component } from 'react';
import FxPairCard from './FxPairCard';

class FxPairsList extends Component {
  render() {
    const { fxPairs, removeFxPair, swapFxPair, reloadFxPair} = this.props;
    return (
      <div>
        <div className="fx-pairs-list">
          {fxPairs.map(pair => (
            <FxPairCard
              key={pair.id}
              pair={pair}
              removeFxPair={removeFxPair}
              swapFxPair={swapFxPair}
              reloadFxPair={reloadFxPair}
            />
          ))}
        </div>
      </div>
    );
  }
}


export default FxPairsList;
