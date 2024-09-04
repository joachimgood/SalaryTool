import React from "react";
import { Form } from "react-bootstrap";
import { formatAmount } from "../utils/formatter";
interface IncomeProps {
  hourlyRate: number;
  billingRate: number;
  workHoursInMonth: number;
  monthlyIncome: number;
  changeHourlyRate: (rate: number) => void;
  changeBillingRate: (rate: number) => void;
  changeWorkHours: (hours: number) => void;
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
        <Form.Group>
          <Form.Label>Timtaxa: {hourlyRate.toString() + " kr"}</Form.Label>
          <Form.Range
            min={500}
            max={2000}
            step={10}
            value={hourlyRate}
            onChange={(e) => changeHourlyRate(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Debiteringsgrad: {billingRateDisplay.toString() + "%"}
          </Form.Label>
          <Form.Range
            min={0}
            step={5}
            max={100}
            value={billingRateDisplay}
            onChange={(e) => changeBillingRate(Number(e.target.value))}
          />
        </Form.Group>
        {/* <Form.Group>
            <Form.Label>
              Arbetade timmar i månaden: {workHoursInMonth.toString() + "h"}
            </Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={workHoursInMonth}
              onChange={(e) => changeWorkHours(Number(e.target.value))}
            />
          </Form.Group> */}
        <br />
        <h4>Fakturerad summa: {formatAmount(monthlyIncome)} kr</h4> <i>Baserat på månad med 160 arbetstimmar</i>
      </Form>
    </div>
  );
};

export default Income;
