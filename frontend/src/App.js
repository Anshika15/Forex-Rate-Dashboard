import React, { Component } from 'react';
import TopToolbar from './components/TopToolBar/TopToolbar';
import FxPairsList from './components/Dashboard/FxPairsList';
import { fetchAvailableCurrencies } from './api/currencyApi';
import { addFxPair, removeFxPairById, swapFxPairById, sortFxPairs, removeAllFxPairs } from './services/FxPairService';
import { Container, Row, Col } from 'react-bootstrap';
import SortToolBar from './components/Dashboard/SortToolBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fxPairs: [],
      availableCurrencies: [],
      sortField: 'createdAt',
      sortDirection: 'asc',
    };
  }

  componentDidMount() {
    this.loadCurrencies();
  }

  loadCurrencies = async () => {
    const currencies = await fetchAvailableCurrencies();
    this.setState({ availableCurrencies: currencies });
  };

  handleAddFxPair = async (fromCurrency, toCurrency) => {
    const newPairs = await addFxPair(this.state.fxPairs, fromCurrency, toCurrency);
    this.setState((prevState) => ({
      fxPairs: sortFxPairs(newPairs, prevState.sortField, prevState.sortDirection),
    }));
  };

  handleRemoveFxPair = (id) => {
    const updatedPairs = removeFxPairById(this.state.fxPairs, id);
    this.setState({ fxPairs: updatedPairs });
  };

  handleSwapFxPair = (id) => {
    const updatedPairs = swapFxPairById(this.state.fxPairs, id);
    this.setState({ fxPairs: updatedPairs });
  };

  handleSortChange = (sortField) => {
    const sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
    this.setState((prevState) => ({
      sortField,
      sortDirection,
      fxPairs: sortFxPairs(prevState.fxPairs, sortField, sortDirection),
    }));
  };

  handleDeleteAllFxPairs = () => {
    const updatedPairs = removeAllFxPairs(this.state.fxPairs);
    this.setState({fxPairs : updatedPairs});
  };

  render() {
    const { fxPairs, availableCurrencies, sortField, sortDirection } = this.state;
    return (
      <Container>
        <Row>
          <Col md="auto mt-4">
            <TopToolbar
              availableCurrencies={availableCurrencies}
              addFxPair={this.handleAddFxPair}
              removeFxPairs={this.handleDeleteAllFxPairs}
            />
          </Col>
        </Row>
          { fxPairs.length != 0 && 
          <Row>
            <Col md="auto mt-4">
              <SortToolBar
                handleSortChange={this.handleSortChange}
                sortField={sortField}
                sortDirection={sortDirection}
              />
            </Col>
          </Row>
          }
          <Row>
            <Col md="auto mt-4">
              <FxPairsList
                fxPairs={fxPairs}
                removeFxPair={this.handleRemoveFxPair}
                swapFxPair={this.handleSwapFxPair}
              />
            </Col>
          </Row>
      </Container>
    );
  }
}

export default App;
