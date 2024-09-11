import { useEffect, useState } from "react";

export const useMonthlyIncomeCalculator = () => {
  const [billingRate, setBillingRate] = useState(1);
  const [hourlyRate, setHourlyRate] = useState(1000);
  const workHoursInMonth = 167;

  const [monthlyIncome, setMonthlyIncome] = useState(
    calculateIncome(hourlyRate, workHoursInMonth, billingRate)
  );

  useEffect(() => {
    setMonthlyIncome(
      calculateIncome(hourlyRate, workHoursInMonth, billingRate)
    );
  }, [hourlyRate, billingRate]);

  const changeHourlyRate = (rate: number) => {
    if (rate < 0) {
      rate = 0;
    }
    setHourlyRate(rate);
  };

  const changeBillingRate = (rate: number) => {
    setBillingRate(rate / 100);
  };

  return {
    monthlyIncome,
    hourlyRate,
    billingRate,
    changeHourlyRate,
    changeBillingRate,
  };
};

function calculateIncome(
  hourlyRate: number,
  workHoursInMonth: number,
  billingRate: number
): number {
  const income = workHoursInMonth * hourlyRate * billingRate;
  return income;
}
