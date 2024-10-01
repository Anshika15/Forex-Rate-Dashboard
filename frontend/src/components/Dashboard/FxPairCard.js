import React, { Component } from "react";
import { Button, Card, Alert } from "react-bootstrap"; // Import Alert for error display
import { FaArrowsUpDown } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { SlReload } from "react-icons/sl";
import "../../styles/FxPairCard.css";

class FxPairCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: this.props.pair.rate,
      fromAmount: "1",
      toAmount: (1 * this.props.pair.rate).toFixed(2),
      originalFromAmount: "1", // Track the initial input values
      originalToAmount: (1 * this.props.pair.rate).toFixed(2),
      precision: 2,
      hasChanged: false, // Track if any input has changed
      error: null, // Track error state
    };
  }

  handleRemove = () => {
    this.props.removeFxPair(this.props.pair.id);
  };

  handleSwap = async () => {
    try {
      const updatedPairs = await this.props.swapFxPair(this.props.pair.id);
      const updatedPair = updatedPairs.find(
        (pair) => pair.id === this.props.pair.id
      );

      this.setState((prevState) => ({
        fromAmount: prevState.toAmount || "", // Retain empty string if no value
        toAmount: prevState.fromAmount || "", // Retain empty string if no value
        rate: updatedPair.rate,
        error: null, // Clear any previous errors
      }));
    } catch (error) {
      this.setState({ error: "Failed to swap currency pair." });
      console.error("Swap error:", error);
    }
  };

  handleReload = async () => {
    try {
      const updatedPairs = await this.props.reloadFxPair(this.props.pair.id);
      const updatedPair = updatedPairs.find(
        (pair) => pair.id === this.props.pair.id
      );

      this.setState({
        rate: updatedPair.rate,
        toAmount: (this.state.fromAmount * updatedPair.rate).toFixed(2) || "", // Maintain as string
        error: null, // Clear any previous errors
      });
    } catch (error) {
      this.setState({ error: "Failed to reload currency pair." });
      console.error("Reload error:", error);
    }
  };

  getMaxPrecision = (value1, value2) => {
    const precision1 = (value1.split(".")[1] || "").length;
    const precision2 = (value2.split(".")[1] || "").length;
    return Math.max(precision1, precision2);
  };

  handleFromAmountChange = (e) => {
    const newFromAmount = e.target.value;

    // Allow only digits and decimal point, disallow negative
    const isValidInput = /^[0-9]*\.?[0-9]*$/.test(newFromAmount);
    if (!isValidInput) return;

    const parsedFromAmount = parseFloat(newFromAmount) || ""; // Allow empty input
    const newToAmount =
      parsedFromAmount !== ""
        ? (parsedFromAmount * this.state.rate).toFixed(this.state.precision)
        : ""; // Update if not empty

    const newPrecision = this.getMaxPrecision(newFromAmount, newToAmount);

    // Mark as changed if the fromAmount has changed from the original
    const hasChanged =
      newFromAmount !== this.state.originalFromAmount ||
      newToAmount !== this.state.originalToAmount;

    this.setState({
      fromAmount: newFromAmount,
      toAmount: newToAmount,
      precision: newPrecision,
      hasChanged, // Track if there is a change
    });
  };

  handleToAmountChange = (e) => {
    const newToAmount = e.target.value;

    // Allow only digits and decimal point, disallow negative
    const isValidInput = /^[0-9]*\.?[0-9]*$/.test(newToAmount);
    if (!isValidInput) return;

    const parsedToAmount = parseFloat(newToAmount) || ""; // Allow empty input
    const newFromAmount =
      parsedToAmount !== ""
        ? (parsedToAmount / this.state.rate).toFixed(this.state.precision)
        : ""; // Update if not empty

    const newPrecision = this.getMaxPrecision(newFromAmount, newToAmount);

    // Mark as changed if the toAmount has changed from the original
    const hasChanged =
      newToAmount !== this.state.originalToAmount ||
      newFromAmount !== this.state.originalFromAmount;

    this.setState({
      toAmount: newToAmount,
      fromAmount: newFromAmount,
      precision: newPrecision,
      hasChanged, // Track if there is a change
    });
  };

  handleBlur = () => {
    // Only update if there's a real change in either fromAmount or toAmount
    if (this.state.hasChanged) {
      this.setState(
        {
          // After update, set the original values to the current ones
          originalFromAmount: this.state.fromAmount,
          originalToAmount: this.state.toAmount,
          hasChanged: false, // Reset the change tracker
        },
        () => {
          this.props.updateDateFxPair(this.props.pair.id);
        }
      );
    }
  };

  render() {
    const { pair } = this.props;
    const { rate, fromAmount, toAmount, error } = this.state;

    return (
      <div className="fx-card">
        <Card className="fx-card-container">
          <Card.Body>
            {/* Display error message if there's an error
            {error && (
              <Alert
                variant="danger"
                onClose={() => this.setState({ error: null })}
                dismissible
              >
                {error}
              </Alert>
            )} */}

            <div className="d-flex justify-content-end align-items-center mb-3">
              <Button
                variant="link"
                onClick={this.handleReload}
                className="me-2"
              >
                <SlReload size={20} />
              </Button>
              <Button variant="danger" onClick={this.handleRemove}>
                <CiCircleRemove size={20} />
              </Button>
            </div>

            {/* Rate Display */}
            <Card.Text
              className="text-center"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              {rate.toFixed(this.state.precision)}
            </Card.Text>

            {/* Currency Inputs */}
            <div className="text-center">
              <span className="d-block">{pair.fromCurrency}</span>
              <input
                type="text"
                value={fromAmount}
                onChange={this.handleFromAmountChange}
                onBlur={this.handleBlur}
                className="mb-2"
                style={{ width: "100%", textAlign: "center" }}
              />
              <FaArrowsUpDown
                onClick={this.handleSwap}
                style={{ margin: "1rem 0" }}
              />
              <span className="d-block">{pair.toCurrency}</span>
              <input
                type="text"
                value={toAmount}
                onChange={this.handleToAmountChange}
                onBlur={this.handleBlur}
                className="mb-2"
                style={{ width: "100%", textAlign: "center" }}
              />
              <p>updated at: {new Date(pair.updatedAt).toString()}</p>
              <p>created at: {new Date(pair.createdAt).toString()}</p>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default FxPairCard;
