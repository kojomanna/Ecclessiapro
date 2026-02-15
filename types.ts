
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  PASTOR = 'PASTOR',
  FINANCE_OFFICER = 'FINANCE_OFFICER',
  MEMBER = 'MEMBER'
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum TransactionCategory {
  TITHE = 'TITHE',
  OFFERING = 'OFFERING',
  PLEDGE = 'PLEDGE',
  SALARY = 'SALARY',
  MAINTENANCE = 'MAINTENANCE',
  MISSION = 'MISSION',
  UTILITIES = 'UTILITIES',
  OTHER = 'OTHER'
}

export interface Church {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  logo: string;
  createdAt: string;
}

export interface Member {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'MALE' | 'FEMALE';
  baptismDate?: string;
  membershipStatus: 'ACTIVE' | 'INACTIVE' | 'VISITOR';
  role: string;
  ministries: string[];
  address: string;
  customFields: Record<string, string>;
}

export interface Ministry {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  leaderId: string;
}

export interface Transaction {
  id: string;
  tenantId: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  description: string;
  memberId?: string; // Optional: linked to a member for tithes/pledges
}

export interface SMSLog {
  id: string;
  tenantId: string;
  recipient: string;
  message: string;
  status: 'SENT' | 'FAILED';
  timestamp: string;
}

export interface AppState {
  currentChurch: Church | null;
  currentUser: any | null;
  members: Member[];
  ministries: Ministry[];
  transactions: Transaction[];
  smsLogs: SMSLog[];
}
