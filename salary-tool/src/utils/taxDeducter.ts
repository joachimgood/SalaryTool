export const deductSocialFees = (amount: number): number => {
    const deductionRate = 0.3142;
    return amount * (1 - deductionRate);
  }