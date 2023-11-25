
import { Business } from '../models/business';

export class DecisionEngineService {
  static applyRules(business: Business): number {
    const hasProfit = business.balanceSheet.some((entry) => entry.profitOrLoss > 0);
    const averageAssets = business.balanceSheet.reduce((sum, entry) => sum + entry.assetsValue, 0) / business.balanceSheet.length;

    if (hasProfit) {
      return 60;
    } else if (averageAssets > 0) {
      return 100;
    } else {
      return 20; // Default value
    }
  }
}
