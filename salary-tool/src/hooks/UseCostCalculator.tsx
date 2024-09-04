import { useEffect, useState } from "react";
import { deductSocialFees } from "../utils/taxDeducter";

export const useCostCalculator = (income: number) => {
  const [amountToDistribute, setAmountToDistribute] = useState(income * 0.8);
  const [potentialSalary, setPotentialSalary] = useState(
    deductSocialFees(amountToDistribute)
  );
  const [fiveExtraVacay, setFiveExtraVacay] = useState(false);
  const [pension, setPension] = useState(0);

  const changeVacationdays = (extraDays: boolean) => {
    setFiveExtraVacay(extraDays);
  };

  useEffect(() => {
    const calculatedAmount = income * 0.8;
    setAmountToDistribute(calculatedAmount);
  }, [income]);

  useEffect(() => {
    setPotentialSalary(
      recalculatePotentialSalary(amountToDistribute, fiveExtraVacay, pension)
    );
  }, [amountToDistribute, pension, fiveExtraVacay]);

  return {
    potentialSalary,
    amountToDistribute,
    pension,
    fiveExtraVacay,
    changeVacay: changeVacationdays,
    setPension,
  };
};

const recalculatePotentialSalary = (
  totalCompensation: number,
  additionalVacation: boolean,
  pensionContribution: number
): number => {
    //Pension
  const grossPensionCost = pensionContribution * 1.2426;
  const remainingCompensation = totalCompensation - grossPensionCost;


  //Vacation
  const monthlyVacationSaving = calculateVacationSavingsPerMonth(
    deductSocialFees(remainingCompensation),
    additionalVacation ? 30 : 25
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
