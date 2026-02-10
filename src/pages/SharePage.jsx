
import React, { useState } from 'react';
import useStore from '../store/useStore';
import { PiggyBank, TrendingUp, History, Plus, Minus, ArrowRightLeft } from 'lucide-react';
import clsx from 'clsx';

const SharePage = () => {
    const { members, addTransaction, settings } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('buy'); // 'buy', 'sell', 'transfer'
    const [selectedMemberId, setSelectedMemberId] = useState('');
    const [targetMemberId, setTargetMemberId] = useState(''); // For transfer
    const [shareCount, setShareCount] = useState(1);

    const SHARE_PRICE = settings?.shareValue || 20000;

    const handleTransaction = () => {
        if (!selectedMemberId) return;
        if (modalType === 'transfer' && !targetMemberId) return;

        const member = members.find(m => m.id === selectedMemberId);
        const amount = shareCount * SHARE_PRICE;

        if (modalType === 'transfer') {
            const targetMember = members.find(m => m.id === targetMemberId);
            // Deduct from Source
            addTransaction({
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                memberId: selectedMemberId,
                memberName: member.name,
                type: 'Share Transfer Out',
                amount: -amount,
                description: `Transfer to ${targetMember.name} (${targetMember.id})`
            });
            // Add to Target
            addTransaction({
                id: Date.now() + 1,
                date: new Date().toISOString().split('T')[0],
                memberId: targetMemberId,
                memberName: targetMember.name,
                type: 'Share Transfer In',
                amount: amount,
                description: `Transfer from ${member.name} (${member.id})`
            });
        } else {
            addTransaction({
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                memberId: selectedMemberId,
                memberName: member.name,
                type: modalType === 'buy' ? 'Share Deposit' : 'Share Withdraw',
                amount: modalType === 'buy' ? amount : -amount
            });
        }

        setIsModalOpen(false);
        setShareCount(1);
        setSelectedMemberId('');
        setTargetMemberId('');
    };

    const totalShareCapital = members.reduce((acc, m) => acc + m.shareBalance, 0);

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-900 text-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-emerald-200 font-medium mb-1">বর্তমান শেয়ার মূল্য</h3>
                    <p className="text-3xl font-bold">৳ ২০,০০০</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-medium mb-1">মোট শেয়ার মূলধন</h3>
                    <p className="text-3xl font-bold text-emerald-700">৳ {totalShareCapital.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-slate-500 font-medium mb-1">শেয়ারহোল্ডার</h3>
                        <p className="text-3xl font-bold text-slate-800">{members.filter(m => m.shareBalance > 0).length}</p>
                    </div>
                    <div className="bg-emerald-100 p-3 rounded-full text-emerald-700">
                        <Users size={24} />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={() => { setModalType('buy'); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-xl hover:bg-emerald-800 shadow-lg shadow-emerald-700/20 active:scale-95 transition"
                >
                    <Plus size={20} />
                    শেয়ার ক্রয়
                </button>
                <button
                    onClick={() => { setModalType('sell'); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-red-100 text-red-700 px-6 py-3 rounded-xl hover:bg-red-200 transition"
                >
                    <Minus size={20} />
                    শেয়ার উত্তোলন
                </button>
                <button
                    onClick={() => { setModalType('transfer'); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-xl hover:bg-blue-200 transition"
                >
                    <ArrowRightLeft size={20} />
                    শেয়ার হস্তান্তর (Transfer)
                </button>
            </div>

            {/* Shareholder List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold text-slate-600">ID</th>
                            <th className="p-4 font-semibold text-slate-600">শেয়ারহোল্ডার</th>
                            <th className="p-4 font-semibold text-slate-600 text-center">শেয়ার সংখ্যা</th>
                            <th className="p-4 font-semibold text-slate-600 text-right">মোট মূল্য</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {members.filter(m => m.shareBalance > 0).map(member => (
                            <tr key={member.id} className="hover:bg-slate-50">
                                <td className="p-4 text-slate-500 font-medium">{member.id}</td>
                                <td className="p-4 font-semibold text-slate-800 flex items-center gap-3">
                                    <img src={member.photo} className="w-8 h-8 rounded-full" />
                                    {member.name}
                                </td>
                                <td className="p-4 text-center font-bold text-slate-700">
                                    {member.shareBalance / SHARE_PRICE} টি
                                </td>
                                <td className="p-4 text-right font-bold text-emerald-700">
                                    ৳ {member.shareBalance.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-6 animate-scaleIn">
                        <h3 className="text-xl font-bold text-slate-800">
                            {modalType === 'buy' && 'শেয়ার ক্রয় ফরম'}
                            {modalType === 'sell' && 'শেয়ার উত্তোলন ফরম'}
                            {modalType === 'transfer' && 'শেয়ার হস্তান্তর ফরম'}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    {modalType === 'transfer' ? 'হস্তান্তরকারী সদস্য (Sender)' : 'সদস্য নির্বাচন করুন'}
                                </label>
                                <select
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    value={selectedMemberId}
                                    onChange={(e) => setSelectedMemberId(e.target.value)}
                                >
                                    <option value="">-- সদস্য --</option>
                                    {members.map(m => (
                                        <option key={m.id} value={m.id}>{m.name} ({m.id})</option>
                                    ))}
                                </select>
                            </div>



                            {modalType === 'transfer' && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">গ্রহণকারী সদস্য (Receiver)</label>
                                    <select
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                        value={targetMemberId}
                                        onChange={(e) => setTargetMemberId(e.target.value)}
                                    >
                                        <option value="">-- সদস্য --</option>
                                        {members.filter(m => m.id !== selectedMemberId).map(m => (
                                            <option key={m.id} value={m.id}>{m.name} ({m.id})</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">শেয়ার সংখ্যা</label>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setShareCount(Math.max(1, shareCount - 1))} className="p-2 bg-slate-100 rounded-lg"><Minus size={16} /></button>
                                    <span className="text-xl font-bold w-12 text-center">{shareCount}</span>
                                    <button onClick={() => setShareCount(shareCount + 1)} className="p-2 bg-slate-100 rounded-lg"><Plus size={16} /></button>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                                <span className="text-slate-600 font-medium">মোট টাকা:</span>
                                <span className="text-xl font-bold text-emerald-700">৳ {(shareCount * SHARE_PRICE).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">বাতিল</button>
                            <button onClick={handleTransaction} className="flex-1 py-2 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800">
                                {modalType === 'buy' && 'জমা দিন'}
                                {modalType === 'sell' && 'উত্তোলন করুন'}
                                {modalType === 'transfer' && 'হস্তান্তর করুন'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
import { Users } from 'lucide-react'; // Added missing import

export default SharePage;
