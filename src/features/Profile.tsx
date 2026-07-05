import React, { useState } from "react";
import { Card, CardContent, Input, Button } from "../components";
import { Mail, Briefcase, MapPin, Check } from "lucide-react";
import { cn } from "../lib/utils";

export function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Amaan Shaikh",
    email: "amaan.shaikh@example.com",
    phone: "+91 98765 43210",
    dob: "15 March 2003",
    address: "Mumbai, Maharashtra, India",
    emergencyContact: "Sameer Shaikh (Father) - +91 91234 56789",
    empId: "EMP-0032",
    department: "Engineering Department",
    designation: "Frontend Developer",
    doj: "01 January 2022",
    workLocation: "Mumbai, India",
    reportingTo: "Tech Lead",
  });

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto py-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#1a1d27] rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 transition-colors">
            {/* Top Gradient */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600"></div>

            <div className="px-6 pb-8 text-center -mt-16">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-[#1a1d27] mx-auto overflow-hidden bg-white dark:bg-[#1a1d27]">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60"
                  alt={formData.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                {formData.fullName}
              </h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                {formData.designation}
              </p>

              <div className="mt-4 inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {formData.empId}
                </span>
              </div>

              {/* Contact / Work Info */}
              <div className="mt-8 space-y-4 text-left px-2">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{formData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Briefcase className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{formData.department}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{formData.workLocation}</span>
                </div>
              </div>

              {/* Edit Button */}
              <div className="mt-8">
                <button className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Personal Info Tabs */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#1a1d27] rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 h-full transition-colors">
            {/* Tabs Header */}
            <div className="flex gap-6 border-b border-gray-200 dark:border-gray-800 pb-4 mb-8">
              <button
                onClick={() => setActiveTab("personal")}
                className={cn(
                  "font-medium pb-4 -mb-[18px] transition-colors",
                  activeTab === "personal"
                    ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
                )}
              >
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab("job")}
                className={cn(
                  "font-medium pb-4 -mb-[18px] transition-colors",
                  activeTab === "job"
                    ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
                )}
              >
                Job Info
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {activeTab === "personal" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    {/* Email Address */}
                    <div className="space-y-2 relative">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl pl-4 pr-10 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    {/* Date of Birth */}
                    <div className="space-y-2 relative">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                      <div className="absolute right-3 top-[34px] pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Job Fields */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      name="empId"
                      value={formData.empId}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Date of Joining
                    </label>
                    <input
                      type="text"
                      name="doj"
                      value={formData.doj}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Work Location
                    </label>
                    <input
                      type="text"
                      name="workLocation"
                      value={formData.workLocation}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Reporting To
                    </label>
                    <input
                      type="text"
                      name="reportingTo"
                      value={formData.reportingTo}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-[#11131c] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="pt-8 flex justify-end items-center gap-4">
                {isSaved && (
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1 animate-pulse">
                    <Check className="w-4 h-4" /> Changes Saved
                  </span>
                )}
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl shadow-lg shadow-violet-900/20 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
