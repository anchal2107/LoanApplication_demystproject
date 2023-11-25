// this is Model for business so that it can be used in other files

export interface Business {
  id: number;
    name: string;
    yearEstablished: number;
    balanceSheet: BalanceSheet[];
  }
  
  export interface BalanceSheet {
    year: number;
    month: number;
    profitOrLoss: number;
    assetsValue: number;
  }