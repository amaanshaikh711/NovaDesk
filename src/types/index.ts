export type LeaveType =
  "Casual" | "Sick" | "Earned" | "Maternity" | "Paternity";

export interface LeaveRequest {
  id: string;
  startDate: Date;
  endDate: Date;
  type: LeaveType;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: Date;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  department: string;
  location: string;
  joinDate: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: Date;
  author: string;
  category: "General" | "HR" | "IT" | "Finance";
  isRead?: boolean;
}

export interface AttendanceRecord {
  date: Date;
  status: "Present" | "Absent" | "Half-Day" | "Leave";
  checkIn?: Date;
  checkOut?: Date;
}
