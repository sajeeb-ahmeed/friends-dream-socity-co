
import React, { useState } from 'react';
import useStore from '../store/useStore';
import { FileText, User, ShoppingCart, Banknote, Calendar, Save, CheckCircle, RotateCcw } from 'lucide-react';

const FormSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <Icon size={20} />
            </div>
            <h3 className="font-bold text-lg text-slate-800">{title}</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {children}
        </div>
    </div>
);

const InputField = ({ label, name, value, onChange, placeholder, type = "text", required = false, fullWidth = false }) => (
    <div className={fullWidth ? "md:col-span-2 space-y-1" : "space-y-1"}>
        <label className="block text-sm font-medium text-slate-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
        />
    </div>
);

const ProductApplicationPage = () => {
    const { addProductApplication } = useStore();
    const [showSuccess, setShowSuccess] = useState(false);

    const initialFormState = {
        // Applicant Info
        institutionName: '',
        applicantName: '',
        fatherName: '',
        motherName: '',
        tradeLicense: '',

        // Product Details
        productName: '',
        model: '',
        marketValue: '',

        // Financials
        monthlyIncome: '',
        installmentType: 'Monthly', // Daily/Weekly/Monthly

        // Contact
        birthDate: '',
        nid: '',
        maritalStatus: 'Married',
        mobile: '',
        address: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.applicantName || !formData.mobile || !formData.productName) {
            alert("অনুগ্রহ করে অন্তত নাম, মোবাইল নম্বর এবং পণ্যের নাম পূরণ করুন।");
            return;
        }

        const newApplication = {
            id: `PA-${Date.now()}`,
            submissionDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
            ...formData
        };

        addProductApplication(newApplication);
        setShowSuccess(true);
        setFormData(initialFormState);
        window.scrollTo(0, 0);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">পণ্য ক্রয়ের আবেদন</h2>
            <p className="text-slate-500 mb-6">অনুগ্রহ করে নিচের ফর্মটি সঠিকভাবে পূরণ করুন।</p>

            {showSuccess && (
                <div className="mb-6 bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-fadeIn">
                    <CheckCircle size={20} />
                    <span>আবেদন সফলভাবে জমা দেওয়া হয়েছে!</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* 1. Applicant Info */}
                <FormSection title="আবেদনকারীর তথ্য (Applicant Info)" icon={User}>
                    <InputField label="প্রতিষ্ঠান/আবেদনকারীর নাম" name="institutionName" value={formData.institutionName} onChange={handleChange} placeholder="দোকান বা ব্যক্তির নাম" />
                    <InputField label="স্বত্বাধিকারী/মালিকের নাম" name="applicantName" value={formData.applicantName} onChange={handleChange} required placeholder="পূর্ণ নাম" />
                    <InputField label="পিতার নাম" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="পিতার নাম" />
                    <InputField label="মাতার নাম" name="motherName" value={formData.motherName} onChange={handleChange} placeholder="মাতার নাম" />
                    <InputField label="ট্রেড লাইসেন্স নং" name="tradeLicense" value={formData.tradeLicense} onChange={handleChange} placeholder="License No." />
                </FormSection>

                {/* 2. Product Details */}
                <FormSection title="পণ্যের বিবরণ (Product Details)" icon={ShoppingCart}>
                    <InputField label="পণ্যের নাম/গাড়ির ধরণ" name="productName" value={formData.productName} onChange={handleChange} required placeholder="উদাঃ সিএনজি অটোরিকশা" />
                    <InputField label="মডেল / বিবরণ" name="model" value={formData.model} onChange={handleChange} placeholder="উদাঃ বাজাজ ২০২৩" />
                    <InputField label="আনুমানিক বাজার মূল্য" name="marketValue" type="number" value={formData.marketValue} onChange={handleChange} placeholder="0.00" />
                </FormSection>

                {/* 3. Financials */}
                <FormSection title="আর্থিক তথ্য (Financials)" icon={Banknote}>
                    <InputField label="মাসিক আয়" name="monthlyIncome" type="number" value={formData.monthlyIncome} onChange={handleChange} placeholder="0.00" />

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">কিস্তির ধরণ (Installment Preference)</label>
                        <select
                            name="installmentType"
                            value={formData.installmentType}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            <option value="Daily">দৈনিক (Daily)</option>
                            <option value="Weekly">সাপ্তাহিক (Weekly)</option>
                            <option value="Monthly">মাসিক (Monthly)</option>
                        </select>
                    </div>
                </FormSection>

                {/* 4. Contact & Personal Info */}
                <FormSection title="ব্যক্তিগত ও যোগাযোগ (Personal & Contact)" icon={FileText}>
                    <InputField label="জন্ম তারিখ" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
                    <InputField label="জাতীয় পরিচয়পত্র (NID)" name="nid" value={formData.nid} onChange={handleChange} placeholder="NID Number" />

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">বৈবাহিক অবস্থা</label>
                        <select
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            <option value="Married">বিবাহিত (Married)</option>
                            <option value="Unmarried">অবিবাহিত (Unmarried)</option>
                        </select>
                    </div>

                    <InputField label="মোবাইল নম্বর" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="017XX-XXXXXX" />
                    <InputField label="বর্তমান ঠিকানা" name="address" value={formData.address} onChange={handleChange} fullWidth placeholder="পূর্ণ ঠিকানা..." />
                </FormSection>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        type="button"
                        onClick={() => setFormData(initialFormState)}
                        className="px-6 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors flex items-center gap-2"
                    >
                        <RotateCcw size={18} />
                        রিসেট
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-2.5 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800 shadow-lg shadow-emerald-700/20 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Save size={18} />
                        আবেদন জমা দিন
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductApplicationPage;
