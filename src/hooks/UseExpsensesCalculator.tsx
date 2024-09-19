import { useEffect, useState } from "react";
import { EXP_STORAGE_KEY, PENSION_SOCIAL_FEE } from "../constants/constants";

export interface IAdditionalMonthlyExpense {
  id: string;
  name: string;
  cost: number;
}

export interface IEquipment {
  id: string;
  name: string;
  yearlyCost: number;
  selected: boolean;
}

export const useExpensesCalculator = () => {
  const [expenses, setExpenses] = useState(0);
  const [monthlyPension, setMonthlyPension] = useState(() => {
    const storedData = localStorage.getItem(EXP_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).monthlyPension : 0;
  });

  const [monthlySavings, setMonthlySavings] = useState(() => {
    const storedData = localStorage.getItem(EXP_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).monthlySavings : 0;
  });

  const [additionalMotnhlyExpenses, setAdditionalMonthlyExpense] = useState<
    IAdditionalMonthlyExpense[]
  >(() => {
    const storedData = localStorage.getItem(EXP_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).additionalMotnhlyExpenses : [];
  });

  const [equipment, setEquipment] = useState<IEquipment[]>(() => {
    const storedData = localStorage.getItem(EXP_STORAGE_KEY);
    return storedData ? JSON.parse(storedData).equipment : standardEquipment;
  });

  useEffect(() => {
    setExpenses(
      calculateYearlyExpenses(
        monthlyPension,
        additionalMotnhlyExpenses,
        monthlySavings,
        equipment
      )
    );
    localStorage.setItem(
      "expenses",
      JSON.stringify({
        monthlyPension,
        additionalMotnhlyExpenses,
        monthlySavings,
        equipment,
      })
    );
  }, [monthlyPension, additionalMotnhlyExpenses, monthlySavings, equipment]);

  return {
    expenses,
    monthlyPension,
    additionalMotnhlyExpenses,
    monthlySavings,
    equipment,
    setMonthlySavings,
    setAdditionalMonthlyExpense,
    setMonthlyPension,
    setEquipment,
  };
};

function calculateYearlyExpenses(
  monthlyPension: number,
  additionalExpenses: IAdditionalMonthlyExpense[],
  monthlySavings: number,
  equipment: IEquipment[]
): number {
  let yearlyExpenses = monthlyPension * PENSION_SOCIAL_FEE * 12;
  yearlyExpenses = yearlyExpenses + monthlySavings * 12;
  additionalExpenses.forEach((exp) => {
    yearlyExpenses = yearlyExpenses + exp.cost * 12;
  });

  equipment.forEach((eq) => {
    if (eq.selected) {
      yearlyExpenses = yearlyExpenses + eq.yearlyCost;
    }
  });

  return yearlyExpenses;
}

const standardEquipment = [
  {
    id: "phone",
    name: "Iphone 16 Pro / Samsung Galaxy S24",
    selected: true,
    yearlyCost: 9000,
  },
  {
    id: "dator",
    name: "MacBook Pro 14 / Surface Laptop 7",
    selected: true,
    yearlyCost: 12000,
  },
  {
    id: "Healthcare",
    name: "Friskvård 5000 kr",
    selected: true,
    yearlyCost: 5000,
  }
] as IEquipment[];
