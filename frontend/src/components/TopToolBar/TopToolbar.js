import React, { Component } from 'react';
import { Container, Button, Dropdown, Row, Col } from 'react-bootstrap';
import topToolBarStrings from '../../local/TopToolBarStrings.json'

class TopToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromCurrency: '',
      toCurrency: '',
    };
  }

  handleAddFxPair = () => {
    const { fromCurrency, toCurrency } = this.state;
    // if (fromCurrency && toCurrency) {
      this.props.addFxPair(fromCurrency, toCurrency);
      this.setState({
        fromCurrency: '',
        toCurrency: '',
      });
    // }
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
      <div>
        <Container className="bg-light p-3">
        <Row className="align-items-center justify-content-between">
          <Col md="auto">
                <Dropdown onSelect={this.handleFromCurrencyChange}>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  {fromCurrency || topToolBarStrings.fromCurrency}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {availableCurrencies.map((currency) => (
                      <Dropdown.Item key={currency} eventKey={currency}>
                        {currency}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col md="auto">
                <Dropdown onSelect={this.handleToCurrencyChange}>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  { toCurrency || topToolBarStrings.toCurrency}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {availableCurrencies.map((currency) => (
                      <Dropdown.Item key={currency} eventKey={currency}>
                        {currency}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col md="auto">
                <Button variant="primary" onClick={this.handleAddFxPair}>
                  Add Card
                </Button>
              </Col>

          <Col md="auto">
            <Button variant="danger" onClick={this.handleDeleteAllFxPairs}>
              Delete All Cards
            </Button>
          </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

export default TopToolbar;
