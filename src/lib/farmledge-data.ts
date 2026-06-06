// Mock data for Farmledge — Nigerian agricultural inventory finance platform.

export type TokenStatus = "active" | "locked" | "transferred" | "exited";

export interface Token {
  id: string;
  commodity: "White Maize" | "Yellow Maize" | "Sesame" | "Sorghum";
  grade: "Grade A" | "Grade B" | "Grade C";
  weightKg: number;
  valueNgn: number;
  warehouse: string;
  warehouseCity: string;
  depositDate: string; // DD MMM YYYY
  status: TokenStatus;
  farmerName: string;
  farmerPhone: string;
  custodianName: string;
  lockedBy?: string;
  loanRef?: string;
  loanAmount?: number;
  txHash: string;
}

export interface ActivityEvent {
  id: string;
  type: "deposit" | "transfer" | "lock" | "unlock" | "exit";
  tokenId: string;
  date: string;
  description: string;
  actor: string;
  txHash: string;
}

export const farmer = {
  name: "Amina Yusuf",
  phone: "+234 803 555 0142",
  village: "Garko, Kano State",
  joined: "12 Mar 2024",
};

export const tokens: Token[] = [
  {
    id: "KN-2026-000042",
    commodity: "White Maize",
    grade: "Grade A",
    weightKg: 5400,
    valueNgn: 1242000,
    warehouse: "Dawakin Tofa Grain Depot",
    warehouseCity: "Kano",
    depositDate: "04 Jun 2026",
    status: "active",
    farmerName: "Amina Yusuf",
    farmerPhone: "+234 803 555 0142",
    custodianName: "Ibrahim Garba",
    txHash: "GA3K7N…8FQ2R",
  },
  {
    id: "KN-2026-000038",
    commodity: "White Maize",
    grade: "Grade A",
    weightKg: 3200,
    valueNgn: 736000,
    warehouse: "Dawakin Tofa Grain Depot",
    warehouseCity: "Kano",
    depositDate: "22 May 2026",
    status: "locked",
    farmerName: "Amina Yusuf",
    farmerPhone: "+234 803 555 0142",
    custodianName: "Ibrahim Garba",
    lockedBy: "Karfi Microfinance Bank",
    loanRef: "LN-7741",
    loanAmount: 500000,
    txHash: "GB8M2P…4VK9X",
  },
  {
    id: "KD-2026-000031",
    commodity: "Sesame",
    grade: "Grade A",
    weightKg: 1800,
    valueNgn: 1080000,
    warehouse: "Zaria Central Warehouse",
    warehouseCity: "Kaduna",
    depositDate: "10 May 2026",
    status: "active",
    farmerName: "Amina Yusuf",
    farmerPhone: "+234 803 555 0142",
    custodianName: "Hauwa Bello",
    txHash: "GC1L4Q…7WT3Z",
  },
  {
    id: "KN-2026-000019",
    commodity: "Sorghum",
    grade: "Grade B",
    weightKg: 2100,
    valueNgn: 378000,
    warehouse: "Dawakin Tofa Grain Depot",
    warehouseCity: "Kano",
    depositDate: "18 Apr 2026",
    status: "transferred",
    farmerName: "Amina Yusuf",
    farmerPhone: "+234 803 555 0142",
    custodianName: "Ibrahim Garba",
    txHash: "GD5N8R…2YH6W",
  },
  {
    id: "KN-2026-000007",
    commodity: "White Maize",
    grade: "Grade A",
    weightKg: 4500,
    valueNgn: 1035000,
    warehouse: "Dawakin Tofa Grain Depot",
    warehouseCity: "Kano",
    depositDate: "02 Mar 2026",
    status: "exited",
    farmerName: "Amina Yusuf",
    farmerPhone: "+234 803 555 0142",
    custodianName: "Ibrahim Garba",
    txHash: "GE9P1S…5BJ4V",
  },
];

export const activity: ActivityEvent[] = [
  {
    id: "ev-1",
    type: "deposit",
    tokenId: "KN-2026-000042",
    date: "04 Jun 2026 • 09:42",
    description: "Your White Maize deposit was recorded at Dawakin Tofa Grain Depot.",
    actor: "Ibrahim Garba (Custodian)",
    txHash: "GA3K7N…8FQ2R",
  },
  {
    id: "ev-2",
    type: "lock",
    tokenId: "KN-2026-000038",
    date: "23 May 2026 • 14:11",
    description: "Token locked as collateral for loan LN-7741.",
    actor: "Karfi Microfinance Bank",
    txHash: "GB8M2P…4VK9X",
  },
  {
    id: "ev-3",
    type: "transfer",
    tokenId: "KN-2026-000019",
    date: "21 Apr 2026 • 11:03",
    description: "Ownership transferred to Chukwuemeka Okafor.",
    actor: "You",
    txHash: "GD5N8R…2YH6W",
  },
  {
    id: "ev-4",
    type: "exit",
    tokenId: "KN-2026-000007",
    date: "15 Mar 2026 • 16:28",
    description: "Goods released. Delivery note DN-2241.",
    actor: "Ibrahim Garba (Custodian)",
    txHash: "GE9P1S…5BJ4V",
  },
];

// Custodian dashboard mock data
export const custodian = {
  name: "Ibrahim Garba",
  warehouse: "Dawakin Tofa Grain Depot",
  city: "Kano",
  certification: "NAQS Certified • Tier 2",
  walletAddress: "GAXYZ…7PQRS",
};

export const todayDeposits = [
  { id: "KN-2026-000042", farmer: "Amina Yusuf", commodity: "White Maize", weightKg: 5400, time: "09:42" },
  { id: "KN-2026-000043", farmer: "Yusuf Abdullahi", commodity: "Sorghum", weightKg: 1850, time: "10:55" },
  { id: "KN-2026-000044", farmer: "Fatima Sani", commodity: "White Maize", weightKg: 3200, time: "12:18" },
  { id: "KN-2026-000045", farmer: "Ngozi Eze", commodity: "Sesame", weightKg: 900, time: "14:02" },
];

export const pendingSyncQueue = [
  { tempId: "PEND-091", farmer: "Abdullahi Musa", commodity: "White Maize", weightKg: 2700, savedAt: "13:24" },
  { tempId: "PEND-092", farmer: "Zainab Ahmed", commodity: "Sorghum", weightKg: 1450, savedAt: "13:47" },
];

export const inventoryRows: Token[] = [
  ...tokens,
  {
    id: "KN-2026-000043",
    commodity: "Sorghum",
    grade: "Grade B",
    weightKg: 1850,
    valueNgn: 333000,
    warehouse: "Dawakin Tofa Grain Depot",
    warehouseCity: "Kano",
    depositDate: "06 Jun 2026",
    status: "active",
    farmerName: "Yusuf Abdullahi",
    farmerPhone: "+234 805 221 8830",
    custodianName: "Ibrahim Garba",
    txHash: "GF2T6U…9CM1A",
  },
  {
    id: "KN-2026-000044",
    commodity: "White Maize",
    grade: "Grade A",
    weightKg: 3200,
    valueNgn: 736000,
    warehouse: "Dawakin Tofa Grain Depot",
    warehouseCity: "Kano",
    depositDate: "06 Jun 2026",
    status: "active",
    farmerName: "Fatima Sani",
    farmerPhone: "+234 807 119 4421",
    custodianName: "Ibrahim Garba",
    txHash: "GG7V3W…1DN8B",
  },
  {
    id: "KN-2026-000045",
    commodity: "Sesame",
    grade: "Grade A",
    weightKg: 900,
    valueNgn: 540000,
    warehouse: "Dawakin Tofa Grain Depot",
    warehouseCity: "Kano",
    depositDate: "06 Jun 2026",
    status: "active",
    farmerName: "Ngozi Eze",
    farmerPhone: "+234 802 776 5530",
    custodianName: "Ibrahim Garba",
    txHash: "GH4Y9X…6EP2C",
  },
];

// Lender data
export const lender = {
  name: "Karfi Microfinance Bank",
  officer: "Tunde Adekunle",
  email: "t.adekunle@karfimfb.ng",
};

export const farmerSearchResults = [
  { phone: "+234 803 555 0142", name: "Amina Yusuf", village: "Garko, Kano", activeTokens: 2, totalValue: 2322000 },
  { phone: "+234 805 221 8830", name: "Yusuf Abdullahi", village: "Wudil, Kano", activeTokens: 1, totalValue: 333000 },
  { phone: "+234 807 119 4421", name: "Fatima Sani", village: "Bichi, Kano", activeTokens: 3, totalValue: 1684000 },
  { phone: "+234 802 776 5530", name: "Ngozi Eze", village: "Zaria, Kaduna", activeTokens: 1, totalValue: 540000 },
];

export const auditEvents: ActivityEvent[] = [
  ...activity,
  {
    id: "ev-5",
    type: "deposit",
    tokenId: "KD-2026-000031",
    date: "10 May 2026 • 08:15",
    description: "Sesame deposit recorded at Zaria Central Warehouse.",
    actor: "Hauwa Bello (Custodian)",
    txHash: "GC1L4Q…7WT3Z",
  },
  {
    id: "ev-6",
    type: "deposit",
    tokenId: "KN-2026-000038",
    date: "22 May 2026 • 10:30",
    description: "White Maize deposit recorded at Dawakin Tofa Grain Depot.",
    actor: "Ibrahim Garba (Custodian)",
    txHash: "GB8M2P…4VK9X",
  },
];

export const apiKeys = [
  { id: "key_prod_a4f9", label: "Production — Loan Engine", lastUsed: "06 Jun 2026 • 09:11", created: "12 Jan 2026" },
  { id: "key_stg_2b71", label: "Staging — Reporting", lastUsed: "01 Jun 2026 • 16:42", created: "03 Mar 2026" },
];

export function formatNgn(n: number): string {
  return "₦" + n.toLocaleString("en-NG");
}
export function formatKg(n: number): string {
  return n.toLocaleString("en-NG") + " kg";
}
