import { useMonthlyIncomeCalculator } from "./hooks/UseMonthlyIncomeCalculator";
import Income from "./components/Income";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { formatAmount } from "./utils/formatter";
import Expenses from "./components/Expenses";

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

  const incomeToDistribute = monthlyIncome * 0.8;

  return (
    <div className="App">
      <Container>
        <Row>
          <h1>Alphadev löneverktyg</h1>
        </Row>
        <Row>
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
          </Col>
          <Col>
            <h2>Utgifter</h2>
            <Expenses monthlyIncome={monthlyIncome}></Expenses>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
      <Container>
        <Stack gap={3}></Stack>
      </Container>
    </div>
  );
}

export default App;


