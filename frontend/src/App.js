import React, { Component } from 'react';
import TopToolbar from './components/TopToolBar/TopToolbar';
import FxPairsList from './components/Dashboard/FxPairsList';
import { fetchAvailableCurrencies } from './api/currencyApi';
import { 
  addFxPair, 
  removeFxPairById, 
  swapFxPairById, 
  sortFxPairs, 
  removeAllFxPairs, 
  reloadFxPairById 
} from './services/FxPairService';
import { Container, Row, Col } from 'react-bootstrap';
import SortToolBar from './components/Dashboard/SortToolBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fxPairs: [], // List of FX pairs
      availableCurrencies: [], // List of available currencies from API
      sortField: 'createdAt', // Default sort field
      sortDirection: 'asc', // Default sort direction
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
    this.setState((prevState) => ({
      fxPairs: sortFxPairs(updatedPairs, prevState.sortField, prevState.sortDirection),
    }));
  };

  handleSwapFxPair = (id) => {
    const updatedPairs = swapFxPairById(this.state.fxPairs, id);
    this.setState((prevState) => ({
      fxPairs: sortFxPairs(updatedPairs, prevState.sortField, prevState.sortDirection),
    }));
  };

  handleSortChange = (sortField) => {
    const sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
    this.setState((prevState) => ({
      sortField,
      sortDirection,
      fxPairs: sortFxPairs(prevState.fxPairs, sortField, sortDirection),
    }));
  };

  // Remove all FX pairs
  handleDeleteAllFxPairs = () => {
    const updatedPairs = removeAllFxPairs(this.state.fxPairs);
    this.setState({ fxPairs: updatedPairs });
  };

  // Reload FX pair by ID (refresh rate) and maintain sort order
  handleReloadFxPair = async (id) => {
    const updatedPairs = await reloadFxPairById(this.state.fxPairs, id);
    this.setState((prevState) => ({
      fxPairs: sortFxPairs(updatedPairs, prevState.sortField, prevState.sortDirection),
    }));
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

        {/* Show Sort ToolBar only if there are FX pairs */}
        { fxPairs.length !== 0 && 
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

        {/* Display FX Pairs List */}
        <Row>
          <Col md="auto mt-4">
            <FxPairsList
              fxPairs={fxPairs}
              removeFxPair={this.handleRemoveFxPair}
              swapFxPair={this.handleSwapFxPair}
              reloadFxPair={this.handleReloadFxPair}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
