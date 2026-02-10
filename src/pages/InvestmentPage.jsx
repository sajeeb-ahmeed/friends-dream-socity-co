
import React, { useState } from 'react';
import useStore from '../store/useStore';
import { Search, Plus, AlertTriangle, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

const InvestmentPage = () => {
    const { investments, members, addInvestment } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ memberId: '', amount: '', type: 'Business', installAmount: '' });

    // Penalty Calculation: 1% of Due per day overdue (simplified logic for demo)
    // For demo: Randomly assigning 'overdue' status to some items
    const calculatePenalty = (dueAmount, isOverdue) => {
        if (!isOverdue) return 0;
        const daysOverdue = 5; // Mock days
        return (dueAmount * 0.01 * daysOverdue).toFixed(0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newInvestment = {
            id: `INV-${investments.length + 1}`,
            memberId: formData.memberId,
            type: formData.type,
            amount: parseInt(formData.amount),
            disbursedDate: new Date().toISOString().split('T')[0],
            installmentAmount: parseInt(formData.installAmount),
            paid: 0,
            due: parseInt(formData.amount),
            status: 'Active'
        };
        addInvestment(newInvestment);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">বিনিয়োগ / ঋণ কার্যক্রম</h2>
                    <p className="text-slate-500">Investment Disbursement & Collection</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-800 transition shadow-lg"
                >
                    <Plus size={20} />
                    নতুন বিনিয়োগ
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold text-slate-600">ID</th>
                            <th className="p-4 font-semibold text-slate-600">সদস্য</th>
                            <th className="p-4 font-semibold text-slate-600">ধরণ</th>
                            <th className="p-4 font-semibold text-slate-600 text-right">ঋণ পরিমাণ</th>
                            <th className="p-4 font-semibold text-slate-600 text-right">আদায়</th>
                            <th className="p-4 font-semibold text-slate-600 text-right">বকেয়া</th>
                            <th className="p-4 font-semibold text-slate-600 text-center">অবস্থা</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {investments.map(inv => {
                            const member = members.find(m => m.id === inv.memberId);
                            const isOverdue = inv.id === "INV-2"; // Mock overdue
                            const penalty = calculatePenalty(inv.due, isOverdue);

                            return (
                                <tr key={inv.id} className="hover:bg-slate-50">
                                    <td className="p-4 text-slate-500 text-xs font-medium">{inv.id}</td>
                                    <td className="p-4 font-semibold text-slate-800">
                                        {member?.name}
                                        <span className="block text-xs text-slate-400">{inv.memberId}</span>
                                    </td>
                                    <td className="p-4 text-slate-600">{inv.type}</td>
                                    <td className="p-4 text-right font-bold text-slate-800">৳ {inv.amount.toLocaleString()}</td>
                                    <td className="p-4 text-right text-emerald-600 font-medium">৳ {inv.paid.toLocaleString()}</td>
                                    <td className="p-4 text-right text-red-600 font-bold">
                                        ৳ {inv.due.toLocaleString()}
                                        {penalty > 0 && (
                                            <span className="block text-[10px] text-red-500 bg-red-50 px-1 rounded mt-1">
                                                জরিমানা: +{penalty}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={clsx(
                                            "px-2 py-1 rounded text-xs font-bold",
                                            isOverdue ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                                        )}>
                                            {isOverdue ? "Overdue" : "Active"}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleSubmit} className="bg-white w-full max-w-md rounded-xl p-6 space-y-4 animate-scaleIn">
                        <h3 className="text-lg font-bold text-slate-800">নতুন বিনিয়োগ প্রদান form</h3>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">সদস্য নির্বাচন</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={formData.memberId}
                                onChange={e => setFormData({ ...formData, memberId: e.target.value })}
                                required
                            >
                                <option value="">সদস্য নির্বাচন করুন...</option>
                                {members.map(m => <option key={m.id} value={m.id}>{m.name} ({m.id})</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">ঋণের ধরণ</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Business">ব্যবসায়িক ঋণ</option>
                                <option value="Personal">ব্যক্তিগত ঋণ</option>
                                <option value="Emergency">জরুরি ঋণ</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">পরিমাণ</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.amount}
                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">কিস্তির পরিমাণ</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.installAmount}
                                    onChange={e => setFormData({ ...formData, installAmount: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">বাতিল</button>
                            <button type="submit" className="flex-1 py-2 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800">বিনিয়োগ দিন</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default InvestmentPage;
