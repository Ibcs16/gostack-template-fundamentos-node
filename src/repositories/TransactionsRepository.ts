import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = new Balance();
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    this.updateBalance(transaction);
    return transaction;
  }

  private updateBalance({ type, value }: Transaction): Balance {
    switch (type) {
      case 'income':
        this.balance.income += value;
        break;
      case 'outcome':
        this.balance.outcome += value;
        break;
      default:
        break;
    }
    this.balance.total = this.balance.income - this.balance.outcome;
    return this.balance;
  }
}

export default TransactionsRepository;
