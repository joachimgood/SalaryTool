import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { formatAmount } from "../utils/formatter";
import {
  ALPHADEV_SHARE,
  INC_SETTINGS_STORAGE_KEY,
  WORK_HRS_IN_MONTH,
  WORK_HRS_IN_YEAR,
} from "../constants/constants";
interface IncomeProps {
  onIncomeChange: (income: number) => void;
  vacationDays: number;
}

const Income: React.FC<IncomeProps> = ({ onIncomeChange, vacationDays }) => {
  const [billingRate, setBillingRate] = useState(() => {
    const storedData = localStorage.getItem(INC_SETTINGS_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).billingRate : 1;
  });

  const [hourlyRate, setHourlyRate] = useState(() => {
    const storedData = localStorage.getItem(INC_SETTINGS_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).hourlyRate : 1000;
  });

  useEffect(() => {
    const newIncome = calculateIncome(hourlyRate, billingRate, vacationDays);
    onIncomeChange(newIncome);
    localStorage.setItem(
      INC_SETTINGS_STORAGE_KEY,
      JSON.stringify({
        hourlyRate,
        billingRate,
      })
    );
  }, [hourlyRate, billingRate, vacationDays]);
  
  const billingRateDisplay = billingRate * 100;
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
                onChange={(e) => setBillingRate(Number(e.target.value) / 100)}
              />
            </Form.Group>
          </Card.Body>
        </Card>
      </Form>
      <br />
      <Card>
        <Card.Header as="h5">Fakturering:</Card.Header>
        <Card.Body>
          <p>
            <b>Månadsfaktura till kund: </b>
            {formatAmount(calculateMonthlyBill(hourlyRate, billingRate))} kr
          </p>
          <p>
            <b>Egen intäkt att fördela per månad: </b>
            {formatAmount(
              calculateMonthlyBill(hourlyRate, billingRate) * ALPHADEV_SHARE
            )}{" "}
            kr
          </p>
          <i>{`Baserat på månad med ${WORK_HRS_IN_MONTH} arbetstimmar`}</i>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Income;

function calculateIncome(
  hourlyRate: number,
  billingRate: number,
  vacationDays: number
): number {
  const workHrs = WORK_HRS_IN_YEAR - vacationDays * 8;
  const income = workHrs * hourlyRate * billingRate;
  return income * ALPHADEV_SHARE;
}

function calculateMonthlyBill(hourlyRate: number, billingRate: number): number {
  return WORK_HRS_IN_MONTH * hourlyRate * billingRate;
}
