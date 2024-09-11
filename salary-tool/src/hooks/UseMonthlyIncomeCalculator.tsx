import { useEffect, useState } from "react";
import {
  INC_SETTINGS_STORAGE_KEY,
  WORK_HRS_IN_MONTH,
} from "../constants/constants";

export const useMonthlyIncomeCalculator = () => {
  const [billingRate, setBillingRate] = useState(() => {
    const storedData = localStorage.getItem(INC_SETTINGS_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).billingRate : 1;
  });

  const [hourlyRate, setHourlyRate] = useState(() => {
    const storedData = localStorage.getItem(INC_SETTINGS_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).hourlyRate : 1000;
  });

  const [monthlyIncome, setMonthlyIncome] = useState(
    calculateIncome(hourlyRate, billingRate)
  );

  useEffect(() => {
    setMonthlyIncome(calculateIncome(hourlyRate, billingRate));
    localStorage.setItem(
      INC_SETTINGS_STORAGE_KEY,
      JSON.stringify({
        hourlyRate,
        billingRate,
      })
    );
  }, [hourlyRate, billingRate]);

  const changeBillingRate = (rate: number) => {
    setBillingRate(rate / 100);
  };

  return {
    monthlyIncome,
    hourlyRate,
    billingRate,
    setHourlyRate,
    changeBillingRate,
  };
};

function calculateIncome(hourlyRate: number, billingRate: number): number {
  const income = WORK_HRS_IN_MONTH * hourlyRate * billingRate;
  return income;
}
