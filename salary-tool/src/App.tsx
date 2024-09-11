import Income from "./components/Income";
import { Card, Col, Container, Row } from "react-bootstrap";
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
          <h1>Alphadev löneverktyg</h1>
        </Row>
        <hr />
        <Row>
          <Col>
            <h2>Utgifter</h2>
            <Expenses
              monthlyIncome={monthlyIncome}
              onPotentialSalaryChange={setPotentialSalary}
            />
          </Col>
          <Col>
            <h2>Intäkter</h2>
            <Income onMonthlyIncomeChange={setMonthlyIncome} />
            <br />
            <Card>
              <Card.Header as="h4">
                Bruttolön per månad: {formatAmount(potentialSalary)} kr
              </Card.Header>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
