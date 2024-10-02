import React, { Component } from "react";
import { Container, Button, Dropdown, Row, Col } from "react-bootstrap";
import topToolBarStrings from "../../constants/TopToolBarStrings.json";
import "../../styles/TopToolbar.css"; // Ensure this imports your CSS

class TopToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromCurrency: "",
      toCurrency: "",
    };
  }

  handleAddFxPair = () => {
    const { fromCurrency, toCurrency } = this.state;
    if (fromCurrency && toCurrency) {
      this.props.addFxPair(fromCurrency, toCurrency);
      this.setState({
        fromCurrency: "",
        toCurrency: "",
      });
    }
  };

  handleDeleteAllFxPairs = () => {
    this.props.removeFxPairs();
  };

  handleFromCurrencyChange = (currency) => {
    this.setState({ fromCurrency: currency });
  };

  handleToCurrencyChange = (currency) => {
    this.setState({ toCurrency: currency });
  };

  render() {
    const { availableCurrencies } = this.props;
    const { fromCurrency, toCurrency } = this.state;

    return (
      <div className="top-toolbar mt-3">
        <Container className="bg-light p-3">
          <Row className="align-items-center">
            <Col md="auto">
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  {fromCurrency || topToolBarStrings.fromCurrency}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-scroll">
                  {" "}
                  {availableCurrencies.map((currency) => (
                    <Dropdown.Item
                      key={currency}
                      onClick={() => this.handleFromCurrencyChange(currency)}
                    >
                      {currency}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col md="auto">
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  {toCurrency || topToolBarStrings.toCurrency}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-scroll">
                  {" "}
                  {availableCurrencies.map((currency) => (
                    <Dropdown.Item
                      key={currency}
                      onClick={() => this.handleToCurrencyChange(currency)}
                    >
                      {currency}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col md="auto">
              <Button
                variant="primary"
                onClick={this.handleAddFxPair}
                aria-label="Add Card"
              >
                {topToolBarStrings.addCard}
              </Button>
            </Col>

            <Col md="auto">
              <Button variant="danger" onClick={this.handleDeleteAllFxPairs}>
                {topToolBarStrings.deleteAllCards}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TopToolbar;
