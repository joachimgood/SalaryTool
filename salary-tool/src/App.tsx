import Income from "./components/Income";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { formatAmount } from "./utils/formatter";
import Expenses from "./components/Expenses";
import { useEffect, useState } from "react";
import {
  SOCIAL_FEE_PERCENTAGE,
} from "./constants/constants";

function App() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [vacationDays, setVacationDays] = useState(() => {
    const storedData = localStorage.getItem("vacation");
    return storedData ? JSON.parse(storedData).vacationDays : 25;
  });

  useEffect(() => {
    localStorage.setItem(
      "vacation",
      JSON.stringify({
        vacationDays,
      })
    );
  }, [vacationDays]);

  const potentialSalary = calculatePotentialSalaryInMonth(income, expenses);

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
            <Income onIncomeChange={setIncome} vacationDays={vacationDays} />
            <br />
            <Card>
              <Card.Header as="h4">
                Bruttolön per månad:{" "}
                <Badge bg="secondary" className="badge-salary">
                  {formatAmount(potentialSalary)} kr
                </Badge>{" "}
              </Card.Header>
            </Card>
          </Col>
          <Col>
            <h3 className="background-header-alpha">Utgifter</h3>
            <Expenses
              vacationDays={vacationDays}
              onExpensesChange={setExpenses}
              onVacationChange={setVacationDays}
            />
          </Col>
        </Row>
        <br></br>
      </Container>
    </div>
  );
}

export default App;

const calculatePotentialSalaryInMonth = (
  yearlyCompensation: number,
  expenses: number
): number => {
  //Expenses
  const compensationRemaining = yearlyCompensation - expenses;

  //SocialFees on last remaining
  return (compensationRemaining * (1 - SOCIAL_FEE_PERCENTAGE)) / 12;
};
