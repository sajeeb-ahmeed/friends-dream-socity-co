import React from 'react';
import useStore from '../store/useStore';
import ReportLayout from '../components/ReportLayout';
import { Package, AlertTriangle, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

const StockReport = () => {
    const { inventory } = useStore();

    return (
        <ReportLayout title="স্টক রিপোর্ট (Inventory Report)">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">পণ্যের নাম</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ক্যাটাগরি</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">ওপেনিং স্টক</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">বিক্রিত (Sold)</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">বর্তমান ব্যালেন্স</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">স্ট্যাটাস</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {inventory.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                                            <Package size={18} />
                                        </div>
                                        <span className="font-bold text-slate-800">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    {item.category === 'Vehicle' ? 'গাড়ি' : 'পণ্য'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-slate-600">
                                    {item.openingStock}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-emerald-600 font-bold">
                                    {item.sold}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <span className={clsx(
                                        "text-sm font-black font-mono px-3 py-1 rounded-full",
                                        item.balance <= 3 ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-700"
                                    )}>
                                        {item.balance}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {item.balance <= 3 ? (
                                        <div className="flex items-center justify-center gap-1 text-red-500 text-xs font-bold uppercase">
                                            <AlertTriangle size={14} /> Low Stock
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-1 text-emerald-500 text-xs font-bold uppercase">
                                            <CheckCircle2 size={14} /> Available
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                        <tr className="font-bold text-slate-800">
                            <td colSpan="2" className="px-6 py-4">সর্বমোট কোয়ান্টিটি:</td>
                            <td className="px-6 py-4 text-right font-mono">
                                {inventory.reduce((acc, curr) => acc + curr.openingStock, 0)}
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-emerald-600">
                                {inventory.reduce((acc, curr) => acc + curr.sold, 0)}
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-blue-600">
                                {inventory.reduce((acc, curr) => acc + curr.balance, 0)}
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </ReportLayout>
    );
};

export default StockReport;
