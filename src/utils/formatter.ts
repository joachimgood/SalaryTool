export const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat("sv-SE", { 
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, 
     })
      .format(amount)
      .replace(/,/g, " ");
  };