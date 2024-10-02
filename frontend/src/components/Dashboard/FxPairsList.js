import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import FxPairCard from "./FxPairCard";

class FxPairsList extends Component {
  render() {
    const {
      fxPairs,
      removeFxPair,
      swapFxPair,
      reloadFxPair,
      updateDateFxPair,
    } = this.props;

    return (
      <div>
        <Row>
          {fxPairs.map((pair) => (
            <Col key={pair.id} xs={12} sm={6} md={4} className="mb-4">
              <FxPairCard
                pair={pair}
                removeFxPair={removeFxPair}
                swapFxPair={swapFxPair}
                reloadFxPair={reloadFxPair}
                updateDateFxPair={updateDateFxPair}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default FxPairsList;
