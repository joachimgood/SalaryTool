import Income from "./components/Income";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { formatAmount } from "./utils/formatter";
import Expenses from "./components/Expenses";
import { useState } from "react";

function App() {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [potentialSalary, setPotentialSalary] = useState(0);

  return (
    <div className="App">
      <Container>
        <br />
        <Row>
          <img src="/logo.png" alt="Logo" className="alphalogo" />
        </Row>
        <hr />
        <Row>
          <Col>
            <h3 className="background-header-alpha">Intäkter</h3>
            <Income onMonthlyIncomeChange={setMonthlyIncome} />
            <br />
            <Card>
              <Card.Header as="h4">
                Bruttolön per månad:{" "}
                <Badge bg="secondary" className="badge-salary">
                  {formatAmount(potentialSalary)} kr
                </Badge>
              </Card.Header>
            </Card>
          </Col>
          <Col>
            <h3 className="background-header-alpha">Utgifter</h3>
            <Expenses
              monthlyIncome={monthlyIncome}
              onPotentialSalaryChange={setPotentialSalary}
            />
          </Col>
        </Row>
      <br></br>
      </Container>
    </div>
  );
}

export default App;
