
import { useMonthlyIncomeCalculator } from "./hooks/UseMonthlyIncomeCalculator";
import { Container, Header, Segment } from "semantic-ui-react";
import Income from "./components/Income";

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
        <Segment.Group>
          <Segment>
            <Header as="h3" textAlign="center" content="Intäkt" />
            <Income
              billingRate={billingRate}
              hourlyRate={hourlyRate}
              workHoursInMonth={workHoursInMonth}
              changeBillingRate={changeBillingRate}
              changeHourlyRate={changeHourlyRate}
              changeWorkHours={changeWorkHours}
            />
          </Segment>
          <Segment>
            <h4>Fakturerad summa: {formatAmount(monthlyIncome)} kr</h4>
            <h4>
              Egen intäkt att fördela: {formatAmount(incomeToDistribute)} kr
            </h4>
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Header as="h3" textAlign="center" content="Sparande till kst" />
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Header as="h3" textAlign="center" content="Kostnader på kst" />
            <h4>
              Tjänstepension
            </h4>
            <h4>
              Semesterbuffert
            </h4>
            <h4>
              Övriga utgifter
            </h4>
            <Header as="h3" textAlign="right" content={`Möjlig bruttolön: ${formatAmount(deductSocialFees(incomeToDistribute))} kr`} />
          </Segment>
        </Segment.Group>
      </Container>
    </div>
  );
}

export default App;

const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US", { useGrouping: true })
    .format(amount)
    .replace(/,/g, " ");
};


function deductSocialFees(amount: number): number {
  const deductionRate = 0.3142;
  return amount * (1 - deductionRate);
}