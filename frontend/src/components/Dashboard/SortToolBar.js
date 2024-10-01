import { Component } from "react";
import sortToolBarStrings from "../../constants/SortToolBarStrings.json";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import "../../styles/SortToolBar.css";

class SortToolBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSortChange, sortField, sortDirection } = this.props;
    return (
      <div className="sort-controls">
        <Container>
          <Row className="justify-content-center">
            <Col md="auto">
              <Button
                variant={sortField === "createdAt" ? "success" : "light"} // Highlight active button
                onClick={() => handleSortChange("createdAt")}
                className="sort-button"
              >
                {sortToolBarStrings.sortByCreatedDate}
                <span className="ms-2">
                  {sortField === "createdAt" &&
                    (sortDirection === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    ))}
                  {sortField !== "createdAt" && <TiArrowUnsorted />}{" "}
                  {/* Show default icon if not active */}
                </span>
              </Button>
            </Col>
            <Col md="auto">
              <Button
                variant={sortField === "rate" ? "success" : "light"} // Highlight active button
                onClick={() => handleSortChange("rate")}
                className="sort-button"
              >
                {sortToolBarStrings.sortByFxRate}
                <span className="ms-2">
                  {sortField === "rate" &&
                    (sortDirection === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    ))}
                  {sortField !== "rate" && <TiArrowUnsorted />}{" "}
                  {/* Show default icon if not active */}
                </span>
              </Button>
            </Col>
            <Col md="auto">
              <Button
                variant={sortField === "updatedAt" ? "success" : "light"} // Highlight active button
                onClick={() => handleSortChange("updatedAt")}
                className="sort-button"
              >
                {sortToolBarStrings.sortByUpdatedDate}
                <span className="ms-2">
                  {sortField === "updatedAt" &&
                    (sortDirection === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    ))}
                  {sortField !== "updatedAt" && <TiArrowUnsorted />}{" "}
                  {/* Show default icon if not active */}
                </span>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SortToolBar;
