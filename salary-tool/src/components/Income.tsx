import React, { useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { formatAmount } from "../utils/formatter";
import { useMonthlyIncomeCalculator } from "../hooks/UseMonthlyIncomeCalculator";
import { ALPHADEV_SHARE, WORK_HRS_IN_MONTH } from "../constants/constants";
interface IncomeProps {
  onMonthlyIncomeChange: (income: number) => void;
}

const Income: React.FC<IncomeProps> = ({ onMonthlyIncomeChange }) => {
  const {
    hourlyRate,
    billingRate,
    monthlyIncome,
    setHourlyRate,
    changeBillingRate,
  } = useMonthlyIncomeCalculator();

  const billingRateDisplay = billingRate * 100;

  useEffect(() => {
    onMonthlyIncomeChange(monthlyIncome);
  }, [monthlyIncome]);

  return (
    <div>
      <Form>
        <Card>
          <Card.Header as="h5">
            {`Timtaxa: ${formatAmount(hourlyRate)} kr`}
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Range
                min={500}
                max={2000}
                step={10}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header as="h5">
            {`Debiteringsgrad: ${billingRateDisplay}%`}
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Range
                min={0}
                step={5}
                max={100}
                value={billingRateDisplay}
                onChange={(e) => changeBillingRate(Number(e.target.value))}
              />
            </Form.Group>
          </Card.Body>
        </Card>
      </Form>
      <br />
      <Card>
        <Card.Header as="h5">Summa</Card.Header>
        <Card.Body>
          <p>
            <b>Fakturerat: </b>
            {formatAmount(monthlyIncome)} kr
          </p>
          <p>
            <b>Egen intäkt att fördela: </b>
            {formatAmount(monthlyIncome * ALPHADEV_SHARE)} kr
          </p>
          <i>{`Baserat på månad med ${WORK_HRS_IN_MONTH} arbetstimmar`}</i>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Income;
