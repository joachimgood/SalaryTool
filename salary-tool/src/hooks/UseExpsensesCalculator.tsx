import { useEffect, useState } from "react";
import { deductSocialFees } from "../utils/taxDeducter";

interface additionalExpense {
  id: string;
  name: string;
  cost: number;
}

export const useExpensesCalculator = (income: number) => {
  const [amountToDistribute, setAmountToDistribute] = useState(income * 0.8);
  const [potentialSalary, setPotentialSalary] = useState(
    deductSocialFees(amountToDistribute)
  );
  const [vacationDays, setVacationDays] = useState(25);
  const [pension, setPension] = useState(0);
  const [savings, setSavings] = useState(0);
  const [additionalExpenses, setAdditionalExpenses] = useState<
    additionalExpense[]
  >([]);

  useEffect(() => {
    const calculatedAmount = income * 0.8;
    setAmountToDistribute(calculatedAmount);
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
  }, [amountToDistribute, pension, vacationDays, additionalExpenses, savings]);

  return {
    potentialSalary,
    amountToDistribute,
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

  remainingCompensation = remainingCompensation - savings
  
  additionalExpenses.forEach((exp) => {
    remainingCompensation = remainingCompensation - exp.cost;
  });
  
  //Pension
  remainingCompensation = remainingCompensation - (pensionContribution * 1.2426);

  //Vacation
  const monthlyVacationSaving = calculateMonthlVacaySaving(
    remainingCompensation,
    vacationDays
  );

  const ncompensationAfterVacationSavings =
    remainingCompensation - monthlyVacationSaving;

  //SocialFees on last remaining
  return deductSocialFees(ncompensationAfterVacationSavings);
};

const calculateMonthlVacaySaving = (
  remainingCompensation: number,
  amountOfDays: number
): number => {
  const potentialMonthlySalary = deductSocialFees(remainingCompensation);

  const extraMoneyPerVacayDay = potentialMonthlySalary * 0.0043;
  const salaryPerDay = potentialMonthlySalary / 21;
  const dailyVacationPay = salaryPerDay + extraMoneyPerVacayDay;

  const totalVacationAllowance = dailyVacationPay * amountOfDays * 1.3142;

  return totalVacationAllowance / 12;
};
