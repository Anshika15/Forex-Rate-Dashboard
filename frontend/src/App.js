import React, { Component } from "react";
import TopToolbar from "./components/Dashboard/TopToolbar";
import FxPairsList from "./components/Dashboard/FxPairsList";
import { fetchAvailableCurrencies } from "./api/currencyApi";
import {
  addFxPair,
  removeFxPairById,
  swapFxPairById,
  sortFxPairs,
  removeAllFxPairs,
  reloadFxPairById,
  updateFxPairTimestampById,
} from "./services/FxPairService";
import { Container, Row, Col, Modal, Button } from "react-bootstrap"; // Added Modal and Button
import SortToolBar from "./components/Dashboard/SortToolBar";
import ErrorBoundary from "./components/Dashboard/ErrorBoundary";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fxPairs: [], // List of FX pairs
      availableCurrencies: [], // List of available currencies from API
      currencyMap: {}, // A map that stores the rates of currencies
      sortField: "createdAt", // Default sort field
      sortDirection: "asc", // Default sort direction
      showErrorModal: false, // To control error modal visibility
      errorMessage: "", // Error message to display in modal
    };
  }

  componentDidMount() {
    this.loadCurrencies();
  }

  // Load currencies and store them in a map
  loadCurrencies = async () => {
    try {
      const currencyMap = await fetchAvailableCurrencies();
      const currencies = Object.keys(currencyMap);
      this.setState({ availableCurrencies: currencies, currencyMap });
    } catch (error) {
      this.handleError(error, "Failed to load available currencies.");
    }
  };

  handleAddFxPair = async (fromCurrency, toCurrency) => {
    try {
      const newPairs = await addFxPair(
        this.state.fxPairs,
        fromCurrency,
        toCurrency,
        this.state.currencyMap
      );

      this.setState((prevState) => ({
        fxPairs: sortFxPairs(
          newPairs,
          prevState.sortField,
          prevState.sortDirection
        ),
      }));
    } catch (error) {
      this.handleError(error, "Failed to add FX pair.");
    }
  };

  handleRemoveFxPair = (id) => {
    try {
      const updatedPairs = removeFxPairById(this.state.fxPairs, id);
      this.setState((prevState) => ({
        fxPairs: sortFxPairs(
          updatedPairs,
          prevState.sortField,
          prevState.sortDirection
        ),
      }));
    } catch (error) {
      this.handleError(error, "Failed to remove FX pair.");
    }
  };

  handleSwapFxPair = (id) => {
    try {
      const updatedPairs = swapFxPairById(
        this.state.fxPairs,
        id,
        this.state.currencyMap
      );
      this.setState((prevState) => ({
        fxPairs: sortFxPairs(
          updatedPairs,
          prevState.sortField,
          prevState.sortDirection
        ),
      }));

      return updatedPairs;
    } catch (error) {
      this.handleError(error, "Failed to swap FX pair.");
    }
  };

  handleReloadFxPair = async (id) => {
    try {
      const updatedCurrencyMap = await fetchAvailableCurrencies(); // Fetch updated currency data

      const updatedPairs = reloadFxPairById(
        this.state.fxPairs,
        id,
        updatedCurrencyMap
      );
      this.setState((prevState) => ({
        fxPairs: sortFxPairs(
          updatedPairs,
          prevState.sortField,
          prevState.sortDirection
        ),
        currencyMap: updatedCurrencyMap,
      }));

      return updatedPairs;
    } catch (error) {
      this.handleError(error, "Failed to reload FX pair.");
    }
  };

  handleSortChange = (sortField) => {
    try {
      const sortDirection = this.state.sortDirection === "asc" ? "desc" : "asc";
      this.setState((prevState) => ({
        sortField,
        sortDirection:
          prevState.sortField !== sortField ? "asc" : sortDirection,
        fxPairs: sortFxPairs(prevState.fxPairs, sortField, sortDirection),
      }));
    } catch (error) {
      this.handleError(error, "Failed to sort FX pairs.");
    }
  };

  handleDeleteAllFxPairs = () => {
    try {
      const updatedPairs = removeAllFxPairs(this.state.fxPairs);
      this.setState({ fxPairs: updatedPairs });
    } catch (error) {
      this.handleError(error, "Failed to delete all FX pairs.");
    }
  };

  handleUpdateDateFxPair = (id) => {
    try {
      const updatedPairs = updateFxPairTimestampById(this.state.fxPairs, id);
      this.setState((prevState) => ({
        fxPairs: sortFxPairs(
          updatedPairs,
          prevState.sortField,
          prevState.sortDirection
        ),
      }));
      return updatedPairs;
    } catch (error) {
      this.handleError(error, "Failed to update FX pair timestamp.");
    }
  };

  handleError = (error, userMessage) => {
    console.error(error); // Log error for debugging
    this.setState({ showErrorModal: true, errorMessage: userMessage });
  };

  closeErrorModal = () => {
    this.setState({ showErrorModal: false, errorMessage: "" });
  };

  render() {
    const {
      fxPairs,
      availableCurrencies,
      sortField,
      sortDirection,
      showErrorModal,
      errorMessage,
    } = this.state;

    return (
      <ErrorBoundary>
        <Container>
          {/* Modal to display error */}
          <Modal show={showErrorModal} onHide={this.closeErrorModal}>
            <Modal.Header closeButton>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeErrorModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Row>
            <Col md="auto mt-4">
              <TopToolbar
                availableCurrencies={availableCurrencies}
                addFxPair={this.handleAddFxPair}
                removeFxPairs={this.handleDeleteAllFxPairs}
              />
            </Col>
          </Row>

          {fxPairs.length !== 0 && (
            <Row>
              <Col md="auto mt-4">
                <SortToolBar
                  handleSortChange={this.handleSortChange}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </Col>
            </Row>
          )}

          <Row>
            <Col md="auto mt-4">
              <FxPairsList
                fxPairs={fxPairs}
                removeFxPair={this.handleRemoveFxPair}
                swapFxPair={this.handleSwapFxPair}
                reloadFxPair={this.handleReloadFxPair}
                updateDateFxPair={this.handleUpdateDateFxPair}
              />
            </Col>
          </Row>
        </Container>
      </ErrorBoundary>
    );
  }
}

export default App;
