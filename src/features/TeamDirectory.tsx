import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Input,
} from "../components";
import { MOCK_EMPLOYEES } from "../lib/mockData";
import { Search, Filter, Mail, MapPin } from "lucide-react";

export function TeamDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const departments = Array.from(
    new Set(MOCK_EMPLOYEES.map((e) => e.department)),
  );

  const filteredEmployees = useMemo(() => {
    return MOCK_EMPLOYEES.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept =
        departmentFilter === "" || emp.department === departmentFilter;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, departmentFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team Directory</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Find and connect with your colleagues.
        </p>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, role, or email..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select
                className="h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <button className="h-10 px-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                <Filter className="w-4 h-4" /> More Filters
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                className="group p-4 sm:p-6 border border-gray-200 dark:border-gray-800 rounded-2xl hover:shadow-md transition-all"
              >
                <div className="flex flex-col xl:flex-row items-start justify-between gap-2 xl:gap-0">
                  <Avatar className="h-10 w-10 sm:h-14 sm:w-14 border-2 border-white dark:border-gray-900 shadow-md">
                    <AvatarImage src={emp.avatar} />
                    <AvatarFallback>
                      {emp.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Badge variant="secondary" className="text-[10px] sm:text-xs">
                    {emp.department}
                  </Badge>
                </div>
                <div className="mt-3 sm:mt-4">
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {emp.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {emp.role}
                  </p>

                  <div className="mt-3 sm:mt-4 space-y-2 text-[10px] sm:text-xs text-gray-500">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{emp.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{emp.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
