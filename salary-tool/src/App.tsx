import { useMonthlyIncomeCalculator } from "./hooks/UseMonthlyIncomeCalculator";
import Income from "./components/Income";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { formatAmount } from "./utils/formatter";
import Expenses from "./components/Expenses";
import { useState } from "react";

function App() {
  const {
    hourlyRate,
    billingRate,
    workHoursInMonth,
    monthlyIncome,
    changeHourlyRate,
    changeBillingRate,
    changeWorkHours,
  } = useMonthlyIncomeCalculator();

  const [potentialSalary, setPotentialSalary] = useState(0);

  return (
    <div className="App">
      <Container>
        <br/>
        <Row>
          <h1>Alphadev löneverktyg</h1>
          <ul>
            <b>Todo:</b>
            <li>Fixa local storage</li>
            <li>branding</li>
            <li>Sjuk/frånvarodagar?</li>
            <li>bugg testa</li>
          </ul>
        </Row>
        <hr/>
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
            <Income
              billingRate={billingRate}
              hourlyRate={hourlyRate}
              workHoursInMonth={workHoursInMonth}
              monthlyIncome={monthlyIncome}
              changeBillingRate={changeBillingRate}
              changeHourlyRate={changeHourlyRate}
              changeWorkHours={changeWorkHours}
            />
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
