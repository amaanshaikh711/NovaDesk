import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
} from "../components";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getMonth,
  getYear,
  isToday,
} from "date-fns";
import {
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Pause,
  ChevronRight,
} from "lucide-react";
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

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Generate realistic mock data for a given month and year
const generateAttendanceData = (month: number, year: number) => {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(start);
  const days = eachDayOfInterval({ start, end });

  return days.map((day) => {
    const rand = Math.random();
    let status: "Present" | "Absent" | "Half-Day" | "Weekend" = "Present";

    const dayOfWeek = day.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      status = "Weekend";
    } else if (rand < 0.05) {
      status = "Absent";
    } else if (rand < 0.12) {
      status = "Half-Day";
    }

    let checkIn = undefined;
    let checkOut = undefined;

    if (status !== "Weekend") {
      const checkInHour =
        status === "Present"
          ? 8 + Math.floor(Math.random() * 2)
          : 12 + Math.floor(Math.random() * 2);
      checkIn = new Date(day);
      checkIn.setHours(checkInHour, 15 + Math.floor(Math.random() * 30), 0);

      if (status === "Present") {
        checkOut = new Date(day);
        checkOut.setHours(
          17 + Math.floor(Math.random() * 2),
          30 + Math.floor(Math.random() * 30),
          0,
        );
      } else if (status === "Half-Day") {
        checkOut = new Date(day);
        checkOut.setHours(
          13 + Math.floor(Math.random() * 2),
          15 + Math.floor(Math.random() * 30),
          0,
        );
      }
    }

    return {
      date: day,
      status,
      checkIn,
      checkOut,
    };
  });
};

export function Attendance() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    getMonth(new Date()),
  );
  const [selectedYear] = useState(getYear(new Date()));
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayCheckIn, setTodayCheckIn] = useState<Date | null>(
    new Date(Date.now() - 3600000 * 8),
  );
  const [todayCheckOut, setTodayCheckOut] = useState<Date | null>(null);

  // Update clock every second
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate attendance data for current month
  const baseAttendanceData = useMemo(
    () => generateAttendanceData(selectedMonthIndex, selectedYear),
    [selectedMonthIndex, selectedYear],
  );

  // Merge today's live check in/out into the data
  const attendanceData = useMemo(() => {
    return baseAttendanceData.map((record) => {
      if (isToday(record.date)) {
        return {
          ...record,
          status:
            todayCheckIn && !todayCheckOut
              ? "Present"
              : todayCheckIn && todayCheckOut
                ? "Present"
                : record.status,
          checkIn: todayCheckIn || record.checkIn,
          checkOut: todayCheckOut || record.checkOut,
        };
      }
      return record;
    });
  }, [baseAttendanceData, todayCheckIn, todayCheckOut]);

  // Calculate stats
  const stats = useMemo(() => {
    let present = 0,
      absent = 0,
      halfDay = 0,
      weekends = 0,
      lateArrivals = 0;
    let totalMinutes = 0,
      workingDays = 0;

    attendanceData.forEach((day) => {
      if (day.status === "Weekend") {
        weekends++;
      } else {
        workingDays++;
        if (day.status === "Present") present++;
        if (day.status === "Absent") absent++;
        if (day.status === "Half-Day") halfDay++;

        if (day.checkIn && day.checkIn.getHours() >= 9) {
          lateArrivals++;
        }

        if (day.checkIn && day.checkOut) {
          const diff = day.checkOut.getTime() - day.checkIn.getTime();
          totalMinutes += diff / (1000 * 60);
        }
      }
    });

    const avgHours =
      workingDays > 0
        ? Math.round((totalMinutes / workingDays / 60) * 10) / 10
        : 0;

    return {
      present,
      absent,
      halfDay,
      weekends,
      lateArrivals,
      avgHours,
      workingDays,
    };
  }, [attendanceData]);

  // Chart data for hours worked
  const chartData = attendanceData
    .filter((d) => d.status !== "Weekend")
    .map((d) => {
      let hours = 0;
      if (d.checkIn && d.checkOut) {
        hours = (d.checkOut.getTime() - d.checkIn.getTime()) / (1000 * 60 * 60);
      }
      return {
        name: format(d.date, "d"),
        status: d.status,
        hours: parseFloat(hours.toFixed(1)),
      };
    });

  // Pie chart data
  const pieData = [
    { name: "Present", value: stats.present, color: "#10b981" },
    { name: "Absent", value: stats.absent, color: "#ef4444" },
    { name: "Half-Day", value: stats.halfDay, color: "#f59e0b" },
  ].filter((d) => d.value > 0);

  // Clock in/out handler
  const handleClockToggle = () => {
    if (isClockedIn) {
      setTodayCheckOut(new Date());
    } else {
      setTodayCheckIn(new Date());
      setTodayCheckOut(null);
    }
    setIsClockedIn(!isClockedIn);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Attendance Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your daily attendance, working hours, and history.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedMonthIndex}
            onChange={(e) => setSelectedMonthIndex(Number(e.target.value))}
            className="h-11 px-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm font-medium"
          >
            {MONTHS.map((m, idx) => (
              <option key={m} value={idx}>
                {m} {selectedYear}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6">
        {/* Left Column - Clock & Stats Grid */}
        <div className="lg:col-span-5 space-y-6">
          {/* Clock Card - Themed Background */}
          <Card className="border-none shadow-lg overflow-hidden">
            <CardContent className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <p className="text-slate-600 dark:text-slate-300 font-semibold text-lg">
                    Current Time
                  </p>
                  <p className="text-5xl font-extrabold tracking-widest text-indigo-600 dark:text-indigo-400">
                    {format(currentTime, "HH:mm:ss")}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xl">
                    {format(currentTime, "EEEE, MMMM do, yyyy")}
                  </p>
                </div>

                {/* Clock in/out times display */}
                {(todayCheckIn || todayCheckOut) && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {todayCheckIn && (
                      <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl shadow-sm">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Clock In
                        </p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                          {format(todayCheckIn, "h:mm a")}
                        </p>
                      </div>
                    )}
                    {todayCheckOut && (
                      <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl shadow-sm">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Clock Out
                        </p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                          {format(todayCheckOut, "h:mm a")}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  size="lg"
                  onClick={handleClockToggle}
                  className={`w-full py-7 text-xl font-semibold shadow-lg transition-all ${
                    isClockedIn
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/30 hover:shadow-emerald-500/40"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30 hover:shadow-indigo-500/40"
                  }`}
                >
                  {isClockedIn ? (
                    <>
                      <Pause className="w-7 h-7 mr-3" /> Clock Out
                    </>
                  ) : (
                    <>
                      <Play className="w-7 h-7 mr-3" /> Clock In
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid - Aligned and Professional */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {/* Total Present */}
            <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
              <CardContent className="p-3 sm:p-5">
                <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2 sm:gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
                      Total Present
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
                      {stats.present}
                    </p>
                    <p className="text-slate-400 text-sm mt-0.5">
                      days this month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Absent */}
            <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
              <CardContent className="p-3 sm:p-5">
                <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2 sm:gap-4">
                  <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400">
                    <XCircle className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
                      Total Absent
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
                      {stats.absent}
                    </p>
                    <p className="text-slate-400 text-sm mt-0.5">
                      days this month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Late Arrivals */}
            <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
              <CardContent className="p-3 sm:p-5">
                <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2 sm:gap-4">
                  <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
                      Late Arrivals
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
                      {stats.lateArrivals}
                    </p>
                    <p className="text-slate-400 text-sm mt-0.5">
                      days this month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Avg Working Hours */}
            <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
              <CardContent className="p-3 sm:p-5">
                <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2 sm:gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
                      Avg. Working Hours
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
                      {stats.avgHours}h
                    </p>
                    <p className="text-slate-400 text-sm mt-0.5">/day</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Charts */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bar Chart */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Daily Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
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
                      minTickGap={10}
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
                    <Bar dataKey="hours" radius={[4, 4, 0, 0]} barSize={30}>
                      {chartData.map((entry, index) => {
                        let color = "#d1d5db";
                        if (entry.status === "Present") color = "#10b981";
                        if (entry.status === "Absent") color = "#ef4444";
                        if (entry.status === "Half-Day") color = "#f59e0b";
                        return <Cell key={`cell-${index}`} fill={color} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Attendance Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
              <div className="h-56 w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-4 md:pl-6 w-full">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                      {item.name}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.value} days
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Logs */}
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Recent Attendance Logs</CardTitle>
          <Button
            variant="ghost"
            className="text-indigo-600 dark:text-indigo-400"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left pb-4 pl-4 pr-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Date
                  </th>
                  <th className="text-left pb-4 pl-4 pr-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Status
                  </th>
                  <th className="text-left pb-4 pl-4 pr-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Check In
                  </th>
                  <th className="text-left pb-4 pl-4 pr-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Check Out
                  </th>
                  <th className="text-right pb-4 pl-4 pr-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...attendanceData]
                  .reverse()
                  .filter((d) => d.status !== "Weekend")
                  .slice(0, 5)
                  .map((record, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                    >
                      <td className="py-4 pl-4 pr-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {format(record.date, "EEEE")}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {format(record.date, "MMM d, yyyy")}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 pl-4 pr-4">
                        <div className="flex items-center gap-2">
                          {record.status === "Present" && (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          )}
                          {record.status === "Absent" && (
                            <XCircle className="w-4 h-4 text-rose-500" />
                          )}
                          {record.status === "Half-Day" && (
                            <Clock className="w-4 h-4 text-amber-500" />
                          )}
                          <Badge
                            variant={
                              record.status === "Present"
                                ? "success"
                                : record.status === "Absent"
                                  ? "destructive"
                                  : "warning"
                            }
                          >
                            {record.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 pl-4 pr-4 text-sm text-gray-600 dark:text-gray-300">
                        {record.checkIn
                          ? format(record.checkIn, "h:mm a")
                          : "-"}
                      </td>
                      <td className="py-4 pl-4 pr-4 text-sm text-gray-600 dark:text-gray-300">
                        {record.checkOut
                          ? format(record.checkOut, "h:mm a")
                          : "-"}
                      </td>
                      <td className="py-4 pl-4 pr-4 text-sm text-gray-600 dark:text-gray-300 text-right">
                        {record.checkIn && record.checkOut
                          ? `${Math.round(((record.checkOut.getTime() - record.checkIn.getTime()) / (1000 * 60 * 60)) * 10) / 10}h`
                          : "-"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
