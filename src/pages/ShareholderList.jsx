
import React from 'react';
import useStore from '../store/useStore';
import { Users, TrendingUp } from 'lucide-react';

const ShareholderList = () => {
    const { shareholders, settings, stats } = useStore();

    // Calculate Total Capital from Shareholders
    const totalCapital = shareholders.reduce((acc, s) => acc + s.totalAmount, 0);

    // Mock "Daily Profit" for demonstration - in real app this comes from daily transactions
    // The user asked for "Daily Dividend Accrual" based on 75% rule.
    // Let's assume stats.netProfit is the total distributable pool for now, 
    // or we can simulate a "Today's Profit" if available. 
    // stats.todayCollection is not profit.
    // Let's use a mock "Daily Profit" of 5000 for the visualization, or derive from netProfit/365 if that makes sense?
    // Let's use stats.netProfit as the pool for "Accrued Dividend"

    const distributableProfit = stats.netProfit * (settings?.dividendShareholderSplit / 100 || 0.75);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">শেয়ারহোল্ডার তালিকা</h2>
                    <p className="text-slate-500">Shareholder List & Accrued Dividends</p>
                </div>
                <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                    <TrendingUp size={20} />
                    Total Capital: ৳ {totalCapital.toLocaleString()}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold text-slate-600">Name & ID</th>
                            <th className="p-4 font-semibold text-slate-600">Address</th>
                            <th className="p-4 font-semibold text-slate-600 text-center">Shares</th>
                            <th className="p-4 font-semibold text-slate-600 text-right">Total Investment</th>
                            <th className="p-4 font-semibold text-emerald-600 text-right">Accrued Dividend (75%)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {shareholders.map(shareholder => {
                            // Dividend Calculation
                            const shareRatio = totalCapital > 0 ? (shareholder.totalAmount / totalCapital) : 0;
                            const accruedDividend = distributableProfit * shareRatio;

                            return (
                                <tr key={shareholder.id} className="hover:bg-slate-50 transition">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={shareholder.photo || "https://i.pravatar.cc/150"} alt="" className="w-10 h-10 rounded-full bg-slate-200" />
                                            <div>
                                                <p className="font-bold text-slate-800">{shareholder.name}</p>
                                                <p className="text-xs text-slate-500">{shareholder.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">
                                        {shareholder.address.village}, {shareholder.address.upazila}, {shareholder.address.district}
                                    </td>
                                    <td className="p-4 text-center font-bold text-slate-700">
                                        {shareholder.numberOfShares}
                                    </td>
                                    <td className="p-4 text-right font-bold text-slate-800">
                                        ৳ {shareholder.totalAmount.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-right font-bold text-emerald-600">
                                        ৳ {accruedDividend.toFixed(2)}
                                    </td>
                                </tr>
                            );
                        })}
                        {shareholders.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-500">No shareholders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-slate-400 text-center">
                * Accrued Dividend is calculated based on current Net Profit ({stats.netProfit.toLocaleString()}) and 75% Shareholder Split.
            </p>
        </div>
    );
};

export default ShareholderList;
