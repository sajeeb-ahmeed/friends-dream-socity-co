
import React, { useState } from 'react';
import useStore from '../store/useStore';
import { ShoppingCart, Plus, Truck, Package, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const CreditPurchasePage = () => {
    const { creditPurchases, members, addCreditPurchase, calculatePenalty } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        memberId: '',
        category: 'Vehicle', // Option: Vehicle, Goods
        productName: '',
        model: '',
        marketValue: '',
        downPayment: '',
        installmentType: 'Monthly', // Daily, Monthly
        installments: '12',
        profitType: 'Percentage', // Percentage, Fixed
        profitValue: '10'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const marketValue = parseFloat(formData.marketValue) || 0;
        const downPayment = parseFloat(formData.downPayment) || 0;
        const principal = marketValue - downPayment;
        const profitValue = parseFloat(formData.profitValue) || 0;
        const installmentsCount = parseInt(formData.installments) || 1;

        let totalProfit = 0;
        if (formData.profitType === 'Percentage') {
            totalProfit = principal * (profitValue / 100);
        } else {
            // Fixed Amount
            totalProfit = profitValue;
        }

        const totalWithInterest = principal + totalProfit;
        const installmentAmount = Math.ceil(totalWithInterest / installmentsCount);

        const newPurchase = {
            id: `INV-${creditPurchases.length + 1}`, // Changed ID prefix to INV
            memberId: formData.memberId,
            category: formData.category,
            productName: formData.productName,
            model: formData.model,
            marketValue: marketValue,
            downPayment: downPayment,
            principalAmount: principal,
            profit: totalProfit,
            disbursedDate: new Date().toISOString().split('T')[0],
            installmentType: formData.installmentType,
            installmentsCount: installmentsCount,
            installmentAmount: installmentAmount,
            paid: 0,
            due: totalWithInterest,
            status: 'Active'
        };
        addCreditPurchase(newPurchase);
        setIsModalOpen(false);
        // Reset form...
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">বিনিয়োগ (Investment)</h2>
                    <p className="text-slate-500">Product & Vehicle Financing Only (No Cash Loans)</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-800 transition shadow-lg"
                >
                    <Plus size={20} />
                    নতুন বিনিয়োগ আবেদন
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {creditPurchases.map(cp => {
                    const member = members.find(m => m.id === cp.memberId);
                    // Mock overdue for demo purposes to show penalty logic
                    // In real app, this compares next installment date with today
                    const isOverdue = cp.id === "INV-1" || cp.id === "CP-1";
                    const dueDate = new Date();
                    dueDate.setDate(dueDate.getDate() - 5);

                    // Penalty: 1% daily if missed
                    const penalty = isOverdue ? calculatePenalty(dueDate, cp.installmentAmount) : 0;

                    return (
                        <div key={cp.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4 relative overflow-hidden">
                            <div className={clsx("absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl", cp.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}>
                                {cp.status}
                            </div>

                            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg">
                                    {cp.category === 'Goods' ? <Package size={24} /> : <Truck size={24} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{cp.productName}</h3>
                                    <p className="text-sm text-slate-500">{cp.model} • {cp.category}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                <span className="text-slate-500">সদস্য:</span>
                                <span className="font-medium text-right">{member?.name}</span>

                                <span className="text-slate-500">মার্কেট ভ্যালু:</span>
                                <span className="font-medium text-right">৳ {(cp.marketValue || 0).toLocaleString()}</span>

                                <span className="text-slate-500">বিনিয়োগ (Principal):</span>
                                <span className="font-medium text-right">৳ {(cp.principalAmount || 0).toLocaleString()}</span>

                                <span className="text-slate-500">লভ্যাংশ ({cp.profit > 0 ? 'Added' : '0'}):</span>
                                <span className="font-medium text-emerald-600 text-right">+ ৳ {(cp.profit || 0).toLocaleString()}</span>

                                <div className="col-span-2 border-t border-slate-100 my-1"></div>

                                <span className="text-slate-500">কিস্তি ({cp.installmentType}):</span>
                                <span className="font-bold text-slate-800 text-right">৳ {(cp.installmentAmount || 0).toLocaleString()} / {cp.installmentType === 'Daily' ? 'Day' : 'Month'}</span>

                                <span className="text-slate-500">মোট বকেয়া:</span>
                                <div className="text-right">
                                    <span className="font-bold text-red-600">৳ {(cp.due || 0).toLocaleString()}</span>
                                    {penalty > 0 && (
                                        <div className="text-xs text-red-500 mt-1 flex items-center justify-end gap-1">
                                            <span>⚠️ পেনাল্টি (1%/day): ৳ {penalty}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg rounded-xl p-6 space-y-4 animate-scaleIn max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Truck size={20} className="text-emerald-700" />
                            নতুন বিনিয়োগ আবেদন
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
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

                            <div className="col-span-2 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                <p className="text-xs font-bold text-amber-700 flex items-center gap-1 mb-1">
                                    <AlertTriangle size={14} /> নিয়মাবলী:
                                </p>
                                <p className="text-[10px] text-amber-800 leading-tight">
                                    শুধুমাত্র পণ্য বা গাড়ি ক্রয়ের জন্য বিনিয়োগ করা যাবে। নগদ লোন (Cash Out) সম্পূর্ণ নিষিদ্ধ।
                                    কিস্তি খেলাপি হলে দৈনিক ১% হারে জরিমানা যুক্ত হবে।
                                </p>
                            </div>

                            <div className="col-span-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <label className="block text-sm font-bold text-slate-700 mb-2">প্রোডাক্ট ক্যাটাগরি (Product Type)</label>
                                <div className="flex gap-4">
                                    {['Vehicle', 'Goods', 'Others'].map(type => (
                                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={type}
                                                checked={formData.category === type}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                className="text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span className="text-sm font-medium text-slate-700">{type === 'Vehicle' ? 'গাড়ি' : type === 'Goods' ? 'পণ্য' : 'অন্যান্য'}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">পণ্যের নাম</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.productName}
                                    onChange={e => setFormData({ ...formData, productName: e.target.value })}
                                    required
                                    placeholder="Ex: Auto Rickshaw"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">মডেল</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.model}
                                    onChange={e => setFormData({ ...formData, model: e.target.value })}
                                    required
                                    placeholder="Ex: 2024 Model"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">বাজার মূল্য</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.marketValue}
                                    onChange={e => setFormData({ ...formData, marketValue: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">ডাউন পেমেন্ট</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.downPayment}
                                    onChange={e => setFormData({ ...formData, downPayment: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="col-span-2 border-t pt-4 mt-2">
                                <h4 className="font-bold text-slate-700 mb-3">মেয়াদ ও লভ্যাংশ কনফিগারেশন</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">কিস্তির ধরণ</label>
                                        <select
                                            className="w-full p-2 border rounded-lg bg-emerald-50"
                                            value={formData.installmentType}
                                            onChange={e => setFormData({ ...formData, installmentType: e.target.value })}
                                        >
                                            <option value="Daily">দৈনিক (Daily)</option>
                                            <option value="Monthly">মাসিক (Monthly)</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            মেয়াদ ({formData.installmentType === 'Daily' ? '0-320 দিন' : '0-36 মাস'})
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border rounded-lg"
                                            value={formData.installments}
                                            onChange={e => setFormData({ ...formData, installments: e.target.value })}
                                            max={formData.installmentType === 'Daily' ? 320 : 36}
                                            required
                                        />
                                    </div>

                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">লভ্যাংশ ধরণ</label>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, profitType: 'Percentage' })}
                                                className={clsx("flex-1 py-2 rounded border text-sm", formData.profitType === 'Percentage' ? "bg-emerald-100 border-emerald-300 text-emerald-700 font-bold" : "bg-white border-slate-200")}
                                            >
                                                %
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, profitType: 'Fixed' })}
                                                className={clsx("flex-1 py-2 rounded border text-sm", formData.profitType === 'Fixed' ? "bg-emerald-100 border-emerald-300 text-emerald-700 font-bold" : "bg-white border-slate-200")}
                                            >
                                                Fixed
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            {formData.profitType === 'Percentage' ? 'শতকরা হার (%)' : 'ফিক্সড চাকা'}
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border rounded-lg"
                                            value={formData.profitValue}
                                            onChange={e => setFormData({ ...formData, profitValue: e.target.value })}
                                            required
                                            placeholder={formData.profitType === 'Percentage' ? "Ex: 10" : "Ex: 5000"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">বাতিল</button>
                            <button type="submit" className="flex-1 py-2 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800">আবেদন জমা দিন</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreditPurchasePage;
