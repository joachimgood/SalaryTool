import { useEffect, useState } from "react";
import { deductSocialFees } from "../utils/taxDeducter";

export const useCostCalculator = (income: number) => {
  const [amountToDistribute, setAmountToDistribute] = useState(income * 0.8);
  const [potentialSalary, setPotentialSalary] = useState(
    deductSocialFees(amountToDistribute)
  );
  const [vacationDays, setVacationDays] = useState(25);
  const [pension, setPension] = useState(0);

  const changeVacationdays = (days: number) => {
    setVacationDays(days);
  };

  useEffect(() => {
    const calculatedAmount = income * 0.8;
    setAmountToDistribute(calculatedAmount);
  }, [income]);

  useEffect(() => {
    setPotentialSalary(
      recalculatePotentialSalary(amountToDistribute, vacationDays, pension)
    );
  }, [amountToDistribute, pension, vacationDays]);

  return {
    potentialSalary,
    amountToDistribute,
    pension,
    vacationDays,
    changeVacationdays,
    setPension,
  };
};

const recalculatePotentialSalary = (
  totalCompensation: number,
  vacationDays: number,
  pensionContribution: number
): number => {
  //Pension
  const grossPensionCost = pensionContribution * 1.2426;
  const remainingCompensation = totalCompensation - grossPensionCost;

  //Vacation
  const potentialSalaryBeforeVacation = deductSocialFees(remainingCompensation); //Should make some deduction here. This will save too much vacay.
  const monthlyVacationSaving = calculateVacationSavingsPerMonth(
    potentialSalaryBeforeVacation,
    vacationDays
  );

  const netCompensationAfterVacationSavings =
    remainingCompensation - monthlyVacationSaving;

  //SocialFees on last remaining
  return deductSocialFees(netCompensationAfterVacationSavings);
};

const calculateVacationSavingsPerMonth = (
  monthlySalary: number,
  amountOfDays: number
): number => {
  const extraMoneyPerVacayDay = monthlySalary * 0.0043;
  const salaryPerDay = monthlySalary / 21;
  const dailyVacationPay = salaryPerDay + extraMoneyPerVacayDay;

  const totalVacationAllowance = dailyVacationPay * amountOfDays * 1.3142;

  return totalVacationAllowance / 12;
};
