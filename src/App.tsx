import Income from "./components/Income";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { formatAmount } from "./utils/formatter";
import Expenses from "./components/Expenses";
import { useEffect, useState } from "react";
import { SOCIAL_FEE_PERCENTAGE } from "./constants/constants";

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

  const afterExpesnes = income - expenses;
  const availableMonthlyAmount = afterExpesnes / 12;
  const potentialSalary = calculatePotentialSalaryInMonth(availableMonthlyAmount);

  return (
    <div className="App">
      <Container>
        <br />
        <Row>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo"
            className="alphalogo"
          />
        </Row>
        <hr />
        <Row>
          <Col>
            <h3 className="background-header-alpha mobile-padding">Intäkter</h3>
            <Income onIncomeChange={setIncome} vacationDays={vacationDays} />
            <br />
            <Card>
              <Card.Header as="h5">
                Bruttolön per månad:{" "}
                <Badge bg="secondary" className="badge-salary">
                  {formatAmount(potentialSalary)} kr
                </Badge>{" "}
                <br></br>
                {/* income: {formatAmount(income)}
                <br></br>
                expenses: {formatAmount(expenses)}
                <br></br>
                to spend on salary each month: {(income - expenses) / 12}
                <br></br> */}
              </Card.Header>
            </Card>
          </Col>
          <Col>
            <h3 className="background-header-alpha mobile-padding">Utgifter</h3>
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
  availableMonthlyAmount: number
): number => {

  const factor = 1 + SOCIAL_FEE_PERCENTAGE / 100;

  // Dividera totalbeloppet med den faktorn för att få bruttolönen
  const grossSalary = availableMonthlyAmount / factor;

  return grossSalary;
};
