import { useEffect, useState } from "react";
import {
  ALPHADEV_SHARE,
  EXP_STORAGE_KEY,
  PENSION_SOCIAL_FEE,
  SOCIAL_FEE_PERCENTAGE,
} from "../constants/constants";

interface additionalExpense {
  id: string;
  name: string;
  cost: number;
}

export const useExpensesCalculator = (income: number) => {
  const [amountToDistribute, setAmountToDistribute] = useState(
    income * ALPHADEV_SHARE
  );
  const [potentialSalary, setPotentialSalary] = useState(
    amountToDistribute * (1 - SOCIAL_FEE_PERCENTAGE)
  );
  const [vacationDays, setVacationDays] = useState(() => {
    const storedData = localStorage.getItem(EXP_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).vacationDays : 25;
  });

  const [pension, setPension] = useState(() => {
    const storedData = localStorage.getItem(EXP_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).pension : 0;
  });
  const [savings, setSavings] = useState(() => {
    const storedData = localStorage.getItem(EXP_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).savings : 0;
  });

  const [additionalExpenses, setAdditionalExpenses] = useState<
    additionalExpense[]
  >(() => {
    const storedData = localStorage.getItem(EXP_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).additionalExpenses : [];
  });

  useEffect(() => {
    setAmountToDistribute(income * ALPHADEV_SHARE);
  }, [income]);

  useEffect(() => {
    setPotentialSalary(
      calculatePotentialSalary(
        amountToDistribute,
        vacationDays,
        pension,
        additionalExpenses,
        savings
      )
    );
    localStorage.setItem(
      "expenses",
      JSON.stringify({
        pension,
        vacationDays,
        additionalExpenses,
        savings,
      })
    );
  }, [amountToDistribute, pension, vacationDays, additionalExpenses, savings]);

  return {
    potentialSalary,
    pension,
    vacationDays,
    additionalExpenses,
    savings,
    setSavings,
    setAdditionalExpenses,
    setVacationDays,
    setPension,
  };
};

const calculatePotentialSalary = (
  totalCompensation: number,
  vacationDays: number,
  pensionContribution: number,
  additionalExpenses: additionalExpense[],
  savings: number
): number => {
  let remainingCompensation = totalCompensation;

  //Savings
  remainingCompensation = remainingCompensation - savings;

  //Expenses
  additionalExpenses.forEach((exp) => {
    remainingCompensation = remainingCompensation - exp.cost;
  });

  //Pension
  remainingCompensation =
    remainingCompensation - pensionContribution * PENSION_SOCIAL_FEE;

  //Vacation
  const monthlyVacationSaving = calculateMonthlVacaySaving(
    remainingCompensation,
    vacationDays
  );

  const compensationAfterVacationSavings =
    remainingCompensation - monthlyVacationSaving;

  //SocialFees on last remaining
  return compensationAfterVacationSavings * (1 - SOCIAL_FEE_PERCENTAGE);
};

const calculateMonthlVacaySaving = (
  avalableCompensationInMonth: number,
  amountOfDays: number
): number => {
  const dailyVacationPay = avalableCompensationInMonth / 21; //avg. of 21 work days in a month.
  const vacationAllowanceNeeded = dailyVacationPay * amountOfDays;

  return vacationAllowanceNeeded / 11;
};
