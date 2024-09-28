import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaArrowsUpDown } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { SlReload } from "react-icons/sl";

class FxPairCard extends Component {
  handleRemove = () => {
    this.props.removeFxPair(this.props.pair.id);
  };

  handleSwap = () => {
    this.props.swapFxPair(this.props.pair.id);
  };

  render() {
    const { pair } = this.props;
    return (
      <div className="fx-card">
        <Card>

          <Card.Body>
            <div className="d-flex justify-content-end align-items-center mb-3">
              <span> 
              {/* <Button variant="success"> */}
                <SlReload/>
              {/* </Button> */}
              </span>
              <span>
                <Button variant="danger">
                  <CiCircleRemove onClick={this.handleRemove} />
                </Button>
              </span>
            </div>

            <Card.Title className="text-center">
              <FaArrowsUpDown onClick={this.handleSwap}/>
            </Card.Title>

            <Card.Text className="text-center">
              Rate: {pair.rate}
            </Card.Text>

            <div className="text-center">
                <input type="number" value="1" readOnly/>
                <span>{pair.fromCurrency}</span>
                <input type="number" value={(1 * pair.rate).toFixed(2)} readOnly className="ms-2" />
                <span>{pair.toCurrency}</span>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default FxPairCard;
