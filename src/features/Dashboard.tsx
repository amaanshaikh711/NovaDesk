import { useState } from "react";
import {
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  Bell,
  Megaphone,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
} from "../components";
import {
  MOCK_ATTENDANCE_RECORDS,
  MOCK_LEAVE_REQUESTS,
  MOCK_ANNOUNCEMENTS,
} from "../lib/mockData";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export function Dashboard({ setActiveTab }: DashboardProps) {
  const [showAISummary, setShowAISummary] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string[]>([]);

  const leaveStats = {
    casual: { used: 3, total: 12 },
    sick: { used: 2, total: 8 },
    earned: { used: 4, total: 15 },
  };

  const handleAISummary = () => {
    setIsSummarizing(true);
    setShowAISummary(true);
    setTimeout(() => {
      setIsSummarizing(false);
      setSummary([
        "Our office is closed on 10th July for Id-ul-Adha.",
        "All remote employees must now connect via VPN before 9 AM starting 1st July.",
        "The new performance policy goes live on 15th July.",
        "We're welcoming Neha Sharma as Senior Product Designer next week.",
        "Join our tech talk about React architecture this Wednesday!",
      ]);
    }, 2000);
  };

  const attendanceChartData = MOCK_ATTENDANCE_RECORDS.slice(-15).map((r) => {
    let hours = 0;
    if (r.checkIn && r.checkOut) {
      hours = (r.checkOut.getTime() - r.checkIn.getTime()) / (1000 * 60 * 60);
    }
    return {
      name: format(r.date, "dd"),
      hours: parseFloat(hours.toFixed(1)),
      status: r.status,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 px-2.5 py-0.5 rounded-full border border-violet-200 dark:border-violet-800/50">
              Employee Dashboard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome back, Amaan
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {format(new Date(), "EEEE, MMMM d")}
          </span>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Attendance Card */}
        <Card
          className="group relative overflow-hidden border border-emerald-100 dark:border-emerald-900/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 bg-white dark:bg-[#1a1d27]"
          onClick={() => setActiveTab("attendance")}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-2xl group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors" />
          <CardContent className="p-5 md:p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  AM Shift
                </p>
                <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white tracking-tight">
                  Present
                </h3>
                <div className="flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium w-fit whitespace-nowrap">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>09:14 AM</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaves Remaining Card */}
        <Card
          className="group relative overflow-hidden border border-purple-100 dark:border-purple-900/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 bg-white dark:bg-[#1a1d27]"
          onClick={() => setActiveTab("leaves")}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-50 dark:bg-purple-900/20 rounded-full blur-2xl group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors" />
          <CardContent className="p-5 md:p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Leaves Remaining
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {12 + 8 + 15 - 3 - 2 - 4}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    / {12 + 8 + 15}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium w-fit whitespace-nowrap">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Available</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-800/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests Card */}
        <Card
          className="group relative overflow-hidden border border-amber-100 dark:border-amber-900/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 bg-white dark:bg-[#1a1d27]"
          onClick={() => setActiveTab("leaves")}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full blur-2xl group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors" />
          <CardContent className="p-5 md:p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Pending Requests
                </p>
                <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white tracking-tight">
                  {
                    MOCK_LEAVE_REQUESTS.filter((r) => r.status === "Pending")
                      .length
                  }
                </h3>
                <div className="flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-medium w-fit whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Awaiting Approval</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Announcements Card */}
        <Card
          className="group relative overflow-hidden border border-blue-100 dark:border-blue-900/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 bg-white dark:bg-[#1a1d27]"
          onClick={() => setActiveTab("announcements")}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-2xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors" />
          <CardContent className="p-5 md:p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Announcements
                </p>
                <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white tracking-tight">
                  {MOCK_ANNOUNCEMENTS.length}
                </h3>
                <div className="flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium w-fit whitespace-nowrap">
                  <Bell className="w-3.5 h-3.5" />
                  <span>
                    {MOCK_ANNOUNCEMENTS.filter((a) => !a.isRead).length} New
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Bell className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Attendance Chart */}
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Monthly Attendance</CardTitle>
              <select className="bg-transparent text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5">
                <option>July 2024</option>
                <option>June 2024</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceChartData} barSize={20}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[0, 10]}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    tickCount={6}
                  />
                  <Tooltip
                    cursor={{ fill: "#f3f4f6" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value: number) => [
                      `${value} hours`,
                      "Hours Worked",
                    ]}
                  />
                  <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                    {attendanceChartData.map((entry, index) => {
                      let color = "#10b981";
                      if (entry.status === "Absent") color = "#d1d5db";
                      if (entry.status === "Half-Day") color = "#f59e0b";
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Leave Summary */}
        <Card className="border-none shadow-md flex flex-col h-full">
          <CardHeader>
            <CardTitle>Leave Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div>
              <div className="h-48 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Casual", value: leaveStats.casual.used },
                        { name: "Sick", value: leaveStats.sick.used },
                        { name: "Earned", value: leaveStats.earned.used },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#10b981" />
                      <Cell fill="#f59e0b" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {Object.entries(leaveStats).map(([type, data]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${type === "casual" ? "bg-blue-500" : type === "sick" ? "bg-emerald-500" : "bg-amber-500"}`}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                        {type} Leave
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {data.used} / {data.total}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setActiveTab("leaves")}
              >
                View Leave History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Announcements */}
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Company Announcements</CardTitle>
            <Button
              variant="default"
              size="sm"
              onClick={handleAISummary}
              disabled={isSummarizing}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              {isSummarizing ? "Summarizing..." : "AI Summary"}
            </Button>
          </CardHeader>
          <CardContent>
            {showAISummary && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      AI Summary
                    </h4>
                    {isSummarizing ? (
                      <p className="text-sm text-blue-700 dark:text-blue-300 animate-pulse">
                        Generating summary...
                      </p>
                    ) : (
                      <div className="text-blue-800 dark:text-blue-200 w-full pr-8">
                        <p className="mb-3 font-medium text-sm sm:text-base">
                          Based on this week's announcements:
                        </p>
                        <ul className="space-y-2 pl-2">
                          {summary.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-sm sm:text-base"
                            >
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs mt-0.5">
                                {index + 1}
                              </span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setShowAISummary(false)}
                    className="ml-auto text-blue-400 hover:text-blue-600"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {MOCK_ANNOUNCEMENTS.map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors border border-gray-100 dark:border-gray-800"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {announcement.title}
                          </h4>
                          <Badge variant="outline">
                            {announcement.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {announcement.content}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-400">
                          {format(announcement.date, "MMM d")}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <span className="text-xs text-gray-400">
                        By {announcement.author}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 md:gap-6">
          {/* Today's Schedule / Quick Actions */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-1 h-10 rounded-full bg-primary-500" />
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <div className="w-1 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <div className="w-1 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <div className="w-1 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                </div>
                <div className="space-y-8">
                  <div>
                    <p className="text-xs text-gray-500">09:00 AM - 10:00 AM</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Daily Standup
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">10:00 AM - 11:30 AM</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Sprint Planning - Sprint 3
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">11:30 AM - 12:30 PM</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Code Review - Frontend PR #47
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">01:30 PM - 03:00 PM</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      API Integration - Backend Sync
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">03:30 PM - 04:30 PM</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Client Sync Call
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Goals */}
          <Card className="border-none shadow-md flex-1">
            <CardHeader>
              <CardTitle>Monthly Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Complete React Training
                  </span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    80%
                  </span>
                </div>
                <div className="w-full h-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Q3 Deliverables
                  </span>
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                    45%
                  </span>
                </div>
                <div className="w-full h-2 bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Code Review Quota
                  </span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    100%
                  </span>
                </div>
                <div className="w-full h-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
