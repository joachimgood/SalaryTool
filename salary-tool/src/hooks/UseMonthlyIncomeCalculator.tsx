import { useState } from "react";

export const useMonthlyIncomeCalculator = () => {
  const [billingRate, setBillingRate] = useState(1);
  const [hourlyRate, setHourlyRate] = useState(1000);
  const [workHoursInMonth, setWorkHoursInMonth] = useState(167);

  const [monthlyIncome, setMonthlyIncome] = useState(
    calculateIncome(hourlyRate, workHoursInMonth, billingRate)
  );

  const changeHourlyRate = (rate: number) => {
    if (rate < 0) {
      rate = 0;
    }
    setHourlyRate(rate);
    setMonthlyIncome(calculateIncome(rate, workHoursInMonth, billingRate));
  };

  const changeBillingRate = (rate: number) => {
    if (rate < 0) {
      rate = 0;
    }
    if (rate > 100) {
      rate = 100;
    }
    setBillingRate(rate / 100);
    setMonthlyIncome(calculateIncome(hourlyRate, workHoursInMonth, rate / 100));
  };

  const changeWorkHours = (hrs: number) => {
    if (hrs < 0) {
        hrs = 0;
    }
    setWorkHoursInMonth(hrs);
    setMonthlyIncome(calculateIncome(hourlyRate, hrs, billingRate));
  };

  return { monthlyIncome, hourlyRate, billingRate, workHoursInMonth ,changeHourlyRate, changeBillingRate, changeWorkHours };
};

function calculateIncome(
  hourlyRate: number,
  workHoursInMonth: number,
  billingRate: number
): number {
  const income = workHoursInMonth * hourlyRate * billingRate;
  return income;
}
