import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaArrowsUpDown } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { SlReload } from "react-icons/sl";
import "../../styles/FxPairCard.css"

class FxPairCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: this.props.pair.rate, // Initialize with the provided rate
      fromAmount: 1, // Default amount for the 'from' currency
      toAmount: (1 * this.props.pair.rate).toFixed(2), // Calculate the initial amount for 'to' currency
    };
  }

  handleRemove = () => {
    this.props.removeFxPair(this.props.pair.id);
  };

  handleSwap = async () => {
    const updatedPairs = await this.props.swapFxPair(this.props.pair.id);
    const updatedPair = updatedPairs.find(pair => pair.id === this.props.pair.id);
    
    this.setState((prevState) => ({
      fromAmount: prevState.toAmount || '', // Retain empty string if no value
      toAmount: prevState.fromAmount || '', // Retain empty string if no value
      rate: updatedPair.rate,
    }));
  };

  handleReload = async () => {
    const updatedPairs = await this.props.reloadFxPair(this.props.pair.id);
    const updatedPair = updatedPairs.find(pair => pair.id === this.props.pair.id);
    
    this.setState({
      rate: updatedPair.rate,
      toAmount: (this.state.fromAmount * updatedPair.rate).toFixed(2) || '', // Maintain as string
    });
  };

  handleFromAmountChange = (e) => {
    const newFromAmount = e.target.value;
    const parsedFromAmount = parseFloat(newFromAmount) || ''; // Allow empty input
    const newToAmount = parsedFromAmount !== '' ? (parsedFromAmount * this.state.rate).toFixed(2) : ''; // Update if not empty

    this.setState({
      fromAmount: newFromAmount,
      toAmount: newToAmount,
    });
  };

  handleToAmountChange = (e) => {
    const newToAmount = e.target.value;
    const parsedToAmount = parseFloat(newToAmount) || ''; // Allow empty input
    const newFromAmount = parsedToAmount !== '' ? (parsedToAmount / this.state.rate).toFixed(2) : ''; // Update if not empty

    this.setState({
      toAmount: newToAmount,
      fromAmount: newFromAmount,
    });
  };

  render() {
    const { pair } = this.props;
    const { rate, fromAmount, toAmount } = this.state;

    return (
      <div className="fx-card">
        <Card className="fx-card-container">
          <Card.Body>
            <div className="d-flex justify-content-end align-items-center mb-3">
              <Button variant="link" onClick={this.handleReload} className="me-2">
                <SlReload size={20} />
              </Button>
              <Button variant="danger" onClick={this.handleRemove}>
                <CiCircleRemove size={20} />
              </Button>
            </div>

            {/* Rate Display */}
            <Card.Text className="text-center" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {rate.toFixed(3)}
            </Card.Text>

            {/* Currency Inputs */}
            <div className="text-center">
              <span className="d-block">{pair.fromCurrency}</span>
              <input
                type="number"
                value={fromAmount}
                onChange={this.handleFromAmountChange}
                className="mb-2"
                style={{ width: '100%', textAlign: 'center' }}
                min="0" // Prevent negative values
                step="0.01" // Allow decimal values
              />
              <FaArrowsUpDown 
                onClick={this.handleSwap} 
                style={{  margin: '1rem 0' }} 
              />
              <span className="d-block">{pair.toCurrency}</span>
              <input
                type="number"
                value={toAmount}
                onChange={this.handleToAmountChange}
                className="mb-2"
                style={{ width: '100%', textAlign: 'center' }}
                min="0" // Prevent negative values
                step="0.01" // Allow decimal values
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default FxPairCard;
