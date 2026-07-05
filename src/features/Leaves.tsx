import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Badge,
} from "../components";
import { MOCK_LEAVE_REQUESTS } from "../lib/mockData";
import type { LeaveType } from "../types";
import { format } from "date-fns";
import { Send, Plus, X } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const leaveSummaryData = [
  { name: "Casual Leave", value: 12, color: "#10b981" },
  { name: "Sick Leave", value: 8, color: "#3b82f6" },
  { name: "Earned Leave", value: 10, color: "#8b5cf6" },
  { name: "Other Leave", value: 10, color: "#f59e0b" },
];

export function Leaves() {
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    type: "Casual" as LeaveType,
    reason: "",
  });
  const [requests, setRequests] = useState(MOCK_LEAVE_REQUESTS);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleToggleForm = () => {
    setShowForm((prev) => {
      const willShow = !prev;
      if (willShow) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 150);
      }
      return willShow;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      id: Date.now().toString(),
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate),
      type: form.type,
      reason: form.reason,
      status: "Pending" as const,
      createdAt: new Date(),
    };
    setRequests([newRequest, ...requests]);
    setForm({ startDate: "", endDate: "", type: "Casual", reason: "" });
    setShowForm(false);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "destructive";
      case "Pending":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Leave Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View your leave balance and apply for time off.
          </p>
        </div>
        <Button
          className="gap-2 bg-indigo-600 hover:bg-indigo-700"
          onClick={handleToggleForm}
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Request Leave"}
        </Button>
      </div>

      {/* Request Form (Conditional) */}
      {showForm && (
        <div
          ref={formRef}
          className="animate-in slide-in-from-top-8 zoom-in-95 fade-in duration-500 ease-out"
        >
          <Card className="border-none shadow-xl shadow-indigo-100/50 dark:shadow-none ring-1 ring-black/5 dark:ring-white/10 bg-white/50 dark:bg-[#1a1d27]/80 backdrop-blur-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">New Leave Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Date
                    </label>
                    <Input
                      type="date"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({ ...form, startDate: e.target.value })
                      }
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Date
                    </label>
                    <Input
                      type="date"
                      value={form.endDate}
                      onChange={(e) =>
                        setForm({ ...form, endDate: e.target.value })
                      }
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Leave Type
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          type: e.target.value as LeaveType,
                        })
                      }
                      className="flex h-10 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Casual">Casual Leave</option>
                      <option value="Sick">Sick Leave</option>
                      <option value="Earned">Earned Leave</option>
                      <option value="Maternity">Maternity Leave</option>
                      <option value="Paternity">Paternity Leave</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reason
                  </label>
                  <textarea
                    value={form.reason}
                    onChange={(e) =>
                      setForm({ ...form, reason: e.target.value })
                    }
                    required
                    rows={3}
                    className="flex w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Briefly explain the reason for your leave..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Send className="w-4 h-4 mr-2" /> Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Summary Card */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Leave Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leaveSummaryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {leaveSummaryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-4">
                {leaveSummaryData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.value} days
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>


        </div>

        {/* Right Column - History */}
        <div className="lg:col-span-7">
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Leave Request History</CardTitle>
              <Button variant="ghost" className="text-sm text-gray-500">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left pb-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left pb-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Leave Type
                      </th>
                      <th className="text-left pb-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="text-right pb-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => {
                      const start = request.startDate;
                      const end = request.endDate;
                      const diffTime = Math.abs(
                        end.getTime() - start.getTime(),
                      );
                      const diffDays =
                        Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

                      return (
                        <tr
                          key={request.id}
                          className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                        >
                          <td className="py-4 px-2 text-sm text-gray-900 dark:text-white font-medium">
                            {format(start, "dd MMM")}
                          </td>
                          <td className="py-4 px-2 text-sm text-gray-600 dark:text-gray-300">
                            {request.type} Leave
                          </td>
                          <td className="py-4 px-2 text-sm text-gray-600 dark:text-gray-300">
                            {diffDays} {diffDays === 1 ? "Day" : "Days"}
                          </td>
                          <td className="py-4 px-2 text-right">
                            <Badge
                              variant={getStatusVariant(request.status)}
                              className="text-xs"
                            >
                              {request.status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
