import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaArrowsUpDown } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { SlReload } from "react-icons/sl";

class FxPairCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: this.props.pair.rate, // Initialize with the provided rate
    };
  }

  handleRemove = () => {
    this.props.removeFxPair(this.props.pair.id);
  };

  handleSwap = async () => {
    // Call the swap function, which returns the updated pair with new rates and swapped currencies
    const updatedPairs = await this.props.swapFxPair(this.props.pair.id);
    const updatedPair = updatedPairs[0]; // Get the updated pair after swap

    // Update the state with the new rate and render the updated currencies
    this.setState({
      rate: updatedPair.rate,
    });
  };

  handleReload = async () => {
    const updatedPairs = await this.props.reloadFxPair([this.props.pair], this.props.pair.id);
    const updatedPair = updatedPairs[0]; // Since we're updating only one pair, get the first element
    this.setState({ rate: updatedPair.rate }); // Update the state with the new rate
  };

  render() {
    const { pair } = this.props;
    const { rate } = this.state;

    return (
      <div className="fx-card">
        <Card>
          <Card.Body>
            {/* Top icons for reload and remove with proper spacing */}
            <div className="d-flex justify-content-end align-items-center mb-3">
              <Button variant="link" onClick={this.handleReload} className="me-2">
                <SlReload size={20} />
              </Button>
              <Button variant="danger" onClick={this.handleRemove}>
                <CiCircleRemove size={20} />
              </Button>
            </div>

            {/* Swap Icon */}
            <Card.Title className="text-center">
              <FaArrowsUpDown onClick={this.handleSwap}s />
            </Card.Title>

            {/* Rate Display */}
            <Card.Text className="text-center">
              Rate: {rate}
            </Card.Text>

            {/* Currency Inputs */} 
            {/* work pending */}
            <div className="text-center">
              <input type="number" value="1" readOnly />
              <span className="ms-2">{pair.fromCurrency}</span>
              <input
                type="number"
                value={(1 * rate).toFixed(2)}
                readOnly
                className="ms-2"
              />
              <span className="ms-2">{pair.toCurrency}</span>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default FxPairCard;
