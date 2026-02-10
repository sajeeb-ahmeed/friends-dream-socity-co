import React from 'react';
import useStore from '../store/useStore';
import ReportLayout from '../components/ReportLayout';
import { ShoppingBag } from 'lucide-react';

const PurchaseReport = () => {
    const { inventoryPurchases } = useStore();

    return (
        <ReportLayout title="ক্রয় রিপোর্ট (Purchase Report)">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">তারিখ</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">সরবরাহকারী (Supplier)</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">পণ্যের নাম</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">পরিমাণ (Qty)</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">মোট মূল্য</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {inventoryPurchases.map((purchase) => (
                            <tr key={purchase.id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{purchase.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{purchase.supplier}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                        <ShoppingBag size={14} className="text-emerald-500" />
                                        {purchase.product}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-sm">{purchase.qty}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right font-bold font-mono text-emerald-700 text-sm">
                                    ৳ {(purchase.price || 0).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                        <tr className="font-bold text-slate-800">
                            <td colSpan="3" className="px-6 py-4">মোট কস্ট (Inventory Cost):</td>
                            <td className="px-6 py-4 text-right font-mono">
                                {inventoryPurchases.reduce((acc, curr) => acc + curr.qty, 0)}
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-emerald-700">
                                ৳ {(inventoryPurchases.reduce((acc, curr) => acc + curr.price, 0) || 0).toLocaleString()}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </ReportLayout>
    );
};

export default PurchaseReport;
