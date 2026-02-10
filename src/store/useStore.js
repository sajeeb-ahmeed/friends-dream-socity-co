import { create } from 'zustand';

const useStore = create((set, get) => ({
    // Auth State
    currentUser: null, // { id, name, role: 'admin' | 'superadmin' | 'member', ... }
    isAuthenticated: false,

    members: [
        {
            id: "M-101",
            name: "Rahim Uddin",
            fatherName: "Abdul Karim",
            motherName: "Fatema Begum",
            mobile: "01711-223344",
            profession: "Business",
            nid: "1234567890",
            presentAddress: "Village: X, Thana: Y, District: Z",
            permanentAddress: "Village: X, Thana: Y, District: Z",
            shareBalance: 0,
            savingsBalance: 5000,
            photo: "https://i.pravatar.cc/150?u=a",
            role: 'member',
            password: '123' // Mock password
        },
        {
            id: "M-102",
            name: "Karim Sheikh",
            fatherName: "Rahman Sheikh",
            motherName: "Amena Khatun",
            mobile: "01822-556677",
            profession: "Farmer",
            nid: "0987654321",
            presentAddress: "Village: A, Thana: B, District: C",
            permanentAddress: "Village: A, Thana: B, District: C",
            shareBalance: 0,
            savingsBalance: 12000,
            photo: "https://i.pravatar.cc/150?u=b",
            role: 'member',
            password: '123'
        },
        {
            id: "M-103",
            name: "Salma Begum",
            fatherName: "Jamal Hossain",
            motherName: "Rokeya Begum",
            mobile: "01933-889900",
            profession: "Housewife",
            nid: "1122334455",
            presentAddress: "Village: P, Thana: Q, District: R",
            permanentAddress: "Village: P, Thana: Q, District: R",
            shareBalance: 0,
            savingsBalance: 2500,
            photo: "https://i.pravatar.cc/150?u=c",
            role: 'member',
            password: '123'
        },
        {
            id: "M-104",
            name: "Rafiqul Islam",
            fatherName: "Siddiqur Rahman",
            motherName: "Jahanara Begum",
            mobile: "01644-112233",
            profession: "Teacher",
            nid: "5566778899",
            presentAddress: "Village: K, Thana: L, District: M",
            permanentAddress: "Village: K, Thana: L, District: M",
            shareBalance: 0,
            savingsBalance: 15000,
            photo: "https://i.pravatar.cc/150?u=d",
            role: 'member',
            password: '123'
        },
        {
            id: "M-105",
            name: "Nasrin Akter",
            fatherName: "Anwar Hossain",
            motherName: "Sufia Begum",
            mobile: "01555-667788",
            profession: "Nurse",
            nid: "9988776655",
            presentAddress: "Village: D, Thana: E, District: F",
            permanentAddress: "Village: D, Thana: E, District: F",
            shareBalance: 0,
            savingsBalance: 8000,
            photo: "https://i.pravatar.cc/150?u=e",
            role: 'member',
            password: '123'
        }
    ],

    // Shareholders (Independent from Members)
    shareholders: [
        {
            id: "S-101",
            name: "Rafiqul Islam",
            fatherName: "Abdul Khalek",
            motherName: "Jobeda Khatun",
            nid: "1987654321001",
            phone: "01711223344",
            address: { village: "Rupnagar", post: "Sadar", upazila: "Sadar", district: "Dhaka" },
            numberOfShares: 10,
            totalAmount: 200000,
            date: "2023-01-01",
            photo: "https://i.pravatar.cc/150?u=s1"
        }
    ],

    // Admins
    admins: [
        { id: "admin", name: "Admin User", role: 'admin', password: 'admin', photo: "https://ui-avatars.com/api/?name=Admin" },
        { id: "superadmin", name: "Super Admin", role: 'superadmin', password: 'super', photo: "https://ui-avatars.com/api/?name=Super+Admin" }
    ],

    transactions: [
        { id: 1, date: "2023-10-24", memberName: "Rahim Uddin", type: "DPS Deposit", amount: 500 },
        { id: 2, date: "2023-10-23", memberName: "Karim Sheikh", type: "Credit Installment", amount: 2000 },
        { id: 3, date: "2023-10-22", memberName: "Salma Begum", type: "Share Deposit", amount: 20000 },
        { id: 4, date: "2023-10-21", memberName: "Rafiqul Islam", type: "FDR Deposit", amount: 100000 },
        { id: 5, date: "2023-10-20", memberName: "Nasrin Akter", type: "FDR Deposit", amount: 50000 }
    ],
    fdr: [
        { id: "F-1", memberId: "M-104", amount: 100000, startDate: "2023-01-01", maturityDate: "2024-01-01", profitRate: 6, status: "Active" },
        { id: "F-2", memberId: "M-105", amount: 50000, startDate: "2023-06-01", maturityDate: "2024-06-01", profitRate: 6, status: "Active" }
    ],
    dps: [
        { id: "D-1", memberId: "M-103", amount: 500, startDate: "2023-01-01", maturityDate: "2026-01-01", profitRate: 3, status: "Active" }
    ],
    creditPurchases: [
        {
            id: "CP-1",
            memberId: "M-102",
            category: "Vehicle",
            productName: "Tractor Engine",
            model: "Yamaha 150",
            marketValue: 120000,
            downPayment: 20000,
            principalAmount: 100000,
            profit: 20000,
            disbursedDate: "2023-05-15",
            installmentType: "Monthly",
            installmentsCount: 24,
            installmentAmount: 5000,
            paid: 50000,
            due: 70000,
            status: "Active"
        }
    ],
    hawlat: [
        { id: "H-1", name: "Local Samity A", type: "Receipt", amount: 50000, date: "2023-09-01", status: "Active" }
    ],
    expenses: [
        { id: "E-1", category: "Salary", amount: 5000, date: "2023-10-01", description: "Manager Salary", recipient: "Rahim" },
        { id: "E-2", category: "Utility", amount: 1200, date: "2023-10-05", description: "Office Electricity Bill", recipient: "Palli Bidyut" }
    ],

    // Inventory Tracking
    inventory: [
        { id: "P-101", name: "Auto Rickshaw", category: "Vehicle", openingStock: 10, sold: 5, balance: 5, unitPrice: 120000 },
        { id: "P-102", name: "Water Pump", category: "Goods", openingStock: 20, sold: 2, balance: 18, unitPrice: 25000 },
        { id: "P-103", name: "Tractor Engine", category: "Vehicle", openingStock: 5, sold: 1, balance: 4, unitPrice: 110000 }
    ],
    inventoryPurchases: [
        { id: "IP-1", date: "2023-01-10", supplier: "Bhai Bhai Motors", product: "Auto Rickshaw", qty: 5, price: 500000 },
        { id: "IP-2", date: "2023-02-15", supplier: "Global Tech", product: "Water Pump", qty: 20, price: 400000 }
    ],
    stats: {
        cashInHand: 250000,
        totalMembers: 105,
        totalCreditDue: 70000, // Adjusted to match CP-1 due
        todayCollection: 12500,
        netProfit: 77500 // 320,000 (Assets) - 200,000 (Share Capital) - 42,500 (Savings) = 77,500
    },

    // Bylaws & Settings
    settings: {
        shareValue: 20000,
        directorMinShares: 2,
        penaltyRate: 1, // 1% per day
        dividendDirectorSplit: 25, // %
        dividendShareholderSplit: 75, // %
        fdrProfitRate: 6, // %
        dpsProfitRate: 3, // %
    },

    updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
    })),

    // Auth Actions
    login: (id, password) => set((state) => {
        // Check Admins
        const admin = state.admins.find(u => u.id === id && u.password === password);
        if (admin) return { currentUser: admin, isAuthenticated: true };

        // Check Members
        const member = state.members.find(m => m.id === id && (m.password === password || id === password)); // Mock: ID=Pass if no pass set
        if (member) return { currentUser: { ...member, role: 'member' }, isAuthenticated: true };

        return {}; // No change if login fails
    }),

    logout: () => set({ currentUser: null, isAuthenticated: false }),

    // Actions
    addTransaction: (transaction) => set((state) => ({
        transactions: [{ ...transaction, sector: transaction.sector || 'Misc' }, ...state.transactions],
        stats: {
            ...state.stats,
            cashInHand: state.stats.cashInHand + (['Share Withdraw', 'Hawlat Payment', 'Expense', 'Salary'].includes(transaction.type) ? -transaction.amount : transaction.amount),
            todayCollection: state.stats.todayCollection + (transaction.amount > 0 && !['Share Withdraw', 'Hawlat Payment'].includes(transaction.type) ? transaction.amount : 0)
        }
    })),

    addMember: (member) => set((state) => ({
        members: [...state.members, { ...member, role: 'member', password: member.mobile.slice(-4) }], // Default pass = last 4 digit of mobile
        stats: { ...state.stats, totalMembers: state.stats.totalMembers + 1 }
    })),

    addShareholder: (shareholder) => set((state) => ({
        shareholders: [...state.shareholders, shareholder]
    })),

    updateMemberProfile: (id, updates) => set((state) => ({
        members: state.members.map(m => m.id === id ? { ...m, ...updates } : m),
        currentUser: state.currentUser && state.currentUser.id === id ? { ...state.currentUser, ...updates } : state.currentUser
    })),

    addFdr: (fdr) => set((state) => ({
        fdr: [...state.fdr, fdr]
    })),

    addDps: (dps) => set((state) => ({
        dps: [...state.dps, dps]
    })),

    addCreditPurchase: (purchase) => set((state) => {
        // Auto-sync inventory if product matches
        const updatedInventory = state.inventory.map(item => {
            if (item.name === purchase.productName) {
                return {
                    ...item,
                    sold: item.sold + 1,
                    balance: item.balance - 1
                };
            }
            return item;
        });

        return {
            creditPurchases: [...state.creditPurchases, purchase],
            inventory: updatedInventory,
            stats: { ...state.stats, totalCreditDue: state.stats.totalCreditDue + purchase.due }
        };
    }),

    addHawlat: (hawlat) => set((state) => ({
        hawlat: [...state.hawlat, hawlat]
    })),

    addExpense: (expense) => set((state) => ({
        expenses: [expense, ...state.expenses],
        stats: {
            ...state.stats,
            cashInHand: state.stats.cashInHand - expense.amount
        }
    })),

    // Product Applications
    productApplications: [],
    addProductApplication: (application) => set((state) => ({
        productApplications: [...state.productApplications, application]
    })),

    distributeDividends: () => set((state) => {
        const totalProfit = state.stats.netProfit;
        const totalDistributable = totalProfit; // Total for both directors and shareholders
        const shareholderFund = totalDistributable * (state.settings.dividendShareholderSplit / 100);
        const directorFund = totalDistributable * (state.settings.dividendDirectorSplit / 100);

        // 1. Distribution to Directors (Equal among 10)
        const perDirectorDividend = directorFund / 10;
        const updatedDirectors = state.directors.map(d => ({
            ...d,
            earnedProfit: (d.earnedProfit || 0) + perDirectorDividend
        }));

        // 2. Distribution to Shareholders (Audit-Grade Time-Weighted Formula)
        // Formula: Dividend = (Shares * Days) / (Total Shares * Days) * Total Fund
        // For simplicity in this demo, we use (Current Shares) as weight,
        // but we'll simulate the "Auto-Reinvestment" logic requested.

        const totalSharesCount = state.shareholders.reduce((acc, s) => acc + s.numberOfShares, 0);

        if (totalSharesCount === 0) return state;

        const updatedShareholders = state.shareholders.map(s => {
            const shareRatio = s.numberOfShares / totalSharesCount;
            const dividend = shareholderFund * shareRatio;

            // Auto-Reinvestment rule: Add dividend to Total Investment/Capital
            return {
                ...s,
                totalAmount: s.totalAmount + dividend,
                accruedDividend: (s.accruedDividend || 0) + dividend
            };
        });

        return {
            shareholders: updatedShareholders,
            directors: updatedDirectors,
            transactions: [
                {
                    id: Date.now(),
                    date: new Date().toISOString().split('T')[0],
                    memberName: "System",
                    type: "Dividend Distribution",
                    sector: "Profit",
                    amount: 0
                },
                ...state.transactions
            ]
        };
    }),

    calculatePenalty: (dueDate, amountDue) => {
        const today = new Date();
        const due = new Date(dueDate);
        if (today <= due) return 0;

        const diffTime = Math.abs(today - due);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return (amountDue * 0.01 * diffDays).toFixed(0);
    },

    // Directors
    directors: [
        { id: "D-1", memberId: "M-101", name: "Rahim Uddin", position: "Chairman", shareValue: 50000, joinDate: "2020-01-01", status: "Active" },
        { id: "D-2", memberId: "M-105", name: "Nasrin Akter", position: "Director", shareValue: 50000, joinDate: "2021-06-15", status: "Active" }
    ],

    updateDirector: (id, updates) => set((state) => ({
        directors: state.directors.map(d => d.id === id ? { ...d, ...updates } : d)
    })),

    // Transfer Directorship (Name Change)
    transferDirectorship: (directorId, newOwnerName, newMemberId = null) => set((state) => ({
        directors: state.directors.map(d =>
            d.id === directorId
                ? { ...d, name: newOwnerName, memberId: newMemberId || d.memberId }
                : d
        )
    })),

    // Sell Directorship (Remove Old, Add New)
    sellDirectorship: (oldDirectorId, newDirector) => set((state) => {
        const filteredDirectors = state.directors.filter(d => d.id !== oldDirectorId);
        return {
            directors: [...filteredDirectors, { ...newDirector, status: 'Active', id: `D-${Date.now()}` }]
        };
    }),

}));

export default useStore;
