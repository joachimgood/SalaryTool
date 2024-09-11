import React from "react";
import { Card, Form } from "react-bootstrap";
import { formatAmount } from "../utils/formatter";
interface IncomeProps {
  hourlyRate: number;
  billingRate: number;
  monthlyIncome: number;
  changeHourlyRate: (rate: number) => void;
  changeBillingRate: (rate: number) => void;
}

const Income: React.FC<IncomeProps> = ({
  hourlyRate,
  billingRate,
  monthlyIncome,
  changeHourlyRate,
  changeBillingRate,
}) => {
  const billingRateDisplay = billingRate * 100;

  return (
    <div>
      <Form>
        <Card>
          <Card.Header as="h5">
            Timtaxa: {formatAmount(hourlyRate).toString() + " kr"}
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Range
                min={500}
                max={2000}
                step={10}
                value={hourlyRate}
                onChange={(e) => changeHourlyRate(Number(e.target.value))}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header as="h5">
            Debiteringsgrad: {billingRateDisplay.toString() + "%"}
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
        <Card.Header as="h5">
          Summa
        </Card.Header>
        <Card.Body>
          <p><b>Fakturerat: </b>{formatAmount(monthlyIncome)} kr</p>
          <p><b>Egen intäkt att fördela: </b>{formatAmount(monthlyIncome * 0.8)} kr</p>
          <i>Baserat på månad med 167 arbetstimmar</i>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Income;
