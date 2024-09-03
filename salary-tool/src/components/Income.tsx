import React from "react";
import { Input } from "semantic-ui-react";
interface IncomeProps {
  hourlyRate: number;
  billingRate: number;
  workHoursInMonth: number;
  changeHourlyRate: (rate: number) => void;
  changeBillingRate: (rate: number) => void;
  changeWorkHours: (hours: number) => void;
}

const Income: React.FC<IncomeProps> = ({
  hourlyRate,
  billingRate,
  workHoursInMonth,
  changeHourlyRate,
  changeBillingRate,
  changeWorkHours,
}) => {
  const billingRateDisplay = billingRate * 100;

  return (
    <div>
      <h4>Timtaxa</h4>
      <Input
        label={{ basic: true, content: "kr" }}
        labelPosition="right"
        value={hourlyRate}
        onChange={(e) => changeHourlyRate(Number(e.target.value))}
      />
      <h4>Debiteringsgrad</h4>
      <Input
        type="range"
        min={0}
        max={100}
        label={{
          basic: true,
          content: billingRateDisplay.toString() + "%",
        }}
        labelPosition="right"
        value={billingRateDisplay}
        onChange={(e) => changeBillingRate(Number(e.target.value))}
      />
      <h4>Arbetade timmar i månaden</h4>
      <Input
        min="0"
        label={{ basic: true, content: "h" }}
        labelPosition="right"
        value={workHoursInMonth}
        onChange={(e) => changeWorkHours(Number(e.target.value))}
      />
    </div>
  );
};

export default Income;
