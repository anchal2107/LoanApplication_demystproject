import { BalanceSheet } from '../models/business';
import * as fs from 'fs';
import * as path from 'path';

export class AccountingService {
  private static readonly dataPath = path.join(__dirname, '../../public/data.json');

  private static readData(): any {
    const rawData = fs.readFileSync(this.dataPath, 'utf-8');
    return JSON.parse(rawData);
  }

  static getBankNames(): string[] {
    const data = this.readData();
    return data.banks.map((bank: any) => ({ id: bank.id, name: bank.name, yearEstablished: bank.yearEstablished }));
  }

  static getBalanceSheet(bankId: number): BalanceSheet[] | null {
    const data = this.readData();
    const bank = data.banks.find((b: any) => b.id === bankId);
    return bank ? bank.balanceSheet : null;
  }
}


// // here I will write service for accouting and add some value in accoutingService class
// import { BalanceSheet } from '../models/business';

// export class AccountingService {
//   static fetchBalanceSheet(): BalanceSheet[] {
//     // Fetch data from databases can be done here.
//     // I am returning hardcode data here
//     return [
//       { year: 2020, month: 12, profitOrLoss: 250000, assetsValue: 1234 },
//       { year: 2020, month: 11, profitOrLoss: 1150, assetsValue: 5789 },
//       { year: 2020, month: 10, profitOrLoss: 2500, assetsValue: 22345 },
//       { year: 2020, month: 9, profitOrLoss: -187000, assetsValue: 223452 },
//     ];
//   }
// }