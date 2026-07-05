import {
  LeaveRequest,
  Employee,
  Announcement,
  AttendanceRecord,
} from "../types";

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: "1",
    startDate: new Date(2024, 7, 15),
    endDate: new Date(2024, 7, 16),
    type: "Casual",
    reason: "Personal work and family function.",
    status: "Pending",
    createdAt: new Date(),
  },
  {
    id: "2",
    startDate: new Date(2024, 6, 20),
    endDate: new Date(2024, 6, 21),
    type: "Sick",
    reason: "Fever and cold.",
    status: "Approved",
    createdAt: new Date(),
  },
  {
    id: "3",
    startDate: new Date(2024, 5, 10),
    endDate: new Date(2024, 5, 10),
    type: "Earned",
    reason: "Birthday.",
    status: "Rejected",
    createdAt: new Date(),
  },
  {
    id: "4",
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 4, 5),
    type: "Casual",
    reason: "Vacation with family.",
    status: "Approved",
    createdAt: new Date(),
  },
  {
    id: "5",
    startDate: new Date(2024, 3, 12),
    endDate: new Date(2024, 3, 13),
    type: "Sick",
    reason: "Doctor appointment.",
    status: "Approved",
    createdAt: new Date(),
  },
  {
    id: "6",
    startDate: new Date(2024, 2, 8),
    endDate: new Date(2024, 2, 8),
    type: "Earned",
    reason: "Attending a wedding.",
    status: "Approved",
    createdAt: new Date(),
  },
];

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Amaan Shaikh",
    role: "Frontend Developer",
    email: "amaan@company.com",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60",
    department: "Engineering",
    location: "Pune",
    joinDate: new Date(2022, 0, 15),
  },
  {
    id: "2",
    name: "Sarah Khan",
    role: "UX Designer",
    email: "sarah@company.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
    department: "Design",
    location: "Bangalore",
    joinDate: new Date(2021, 5, 20),
  },
  {
    id: "3",
    name: "Rohan Mehta",
    role: "Backend Developer",
    email: "rohan@company.com",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=60",
    department: "Engineering",
    location: "Mumbai",
    joinDate: new Date(2020, 10, 5),
  },
  {
    id: "4",
    name: "Neha Patil",
    role: "QA Engineer",
    email: "neha@company.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
    department: "QA",
    location: "Delhi",
    joinDate: new Date(2023, 2, 10),
  },
  {
    id: "5",
    name: "Imran Shaikh",
    role: "DevOps Engineer",
    email: "imran@company.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
    department: "DevOps",
    location: "Hyderabad",
    joinDate: new Date(2019, 8, 25),
  },
  {
    id: "6",
    name: "Kavya Reddy",
    role: "UI/UX Designer",
    email: "kavya@company.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60",
    department: "Design",
    location: "Hyderabad",
    joinDate: new Date(2023, 4, 12),
  },
  {
    id: "7",
    name: "Arjun Singh",
    role: "Software Tester",
    email: "arjun@company.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60",
    department: "QA",
    location: "Pune",
    joinDate: new Date(2022, 11, 1),
  },
  {
    id: "8",
    name: "Priya Desai",
    role: "Software Tester",
    email: "priya@company.com",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=60",
    department: "QA",
    location: "Mumbai",
    joinDate: new Date(2024, 0, 15),
  },
  {
    id: "9",
    name: "Vikram Joshi",
    role: "Product Manager",
    email: "vikram@company.com",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60",
    department: "Product",
    location: "Bangalore",
    joinDate: new Date(2020, 3, 22),
  },
  {
    id: "10",
    name: "Anita Rao",
    role: "HR Specialist",
    email: "anita@company.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60",
    department: "HR",
    location: "Delhi",
    joinDate: new Date(2018, 6, 10),
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "Office Maintenance",
    content:
      "Our office will undergo scheduled maintenance this weekend to improve systems and security.",
    date: new Date(2024, 7, 4),
    author: "IT Department",
    category: "IT",
    isRead: false,
  },
  {
    id: "2",
    title: "Office Holiday",
    content:
      "The office will remain closed on 10th July on account of Id-ul-Adha.",
    date: new Date(2024, 7, 5),
    author: "HR Department",
    category: "HR",
    isRead: false,
  },
  {
    id: "3",
    title: "Performance Policy Update",
    content:
      "We are pleased to announce an update to our performance review policy, effective from 1st July. All remote employees must connect via VPN before 9 AM. The new performance policy will be effective from 15th July.",
    date: new Date(2024, 7, 3),
    author: "HR Department",
    category: "HR",
    isRead: true,
  },
  {
    id: "4",
    title: "New Team Member Joining",
    content:
      "Please welcome Neha Sharma, who joins us as a Senior Product Designer starting next Monday!",
    date: new Date(2024, 7, 6),
    author: "HR Department",
    category: "HR",
    isRead: false,
  },
  {
    id: "5",
    title: "Weekly Tech Talk Session",
    content:
      "Join our weekly tech talk this Wednesday at 3 PM focused on modern React architecture patterns.",
    date: new Date(2024, 7, 7),
    author: "IT",
    category: "IT",
    isRead: false,
  },
];

// Helper to generate realistic attendance with ups and downs in hours
function generateHoursWorked(isPresent: boolean, isHalfDay: boolean): number {
  if (!isPresent) return 0;
  if (isHalfDay) return 3.5 + Math.random() * 1.5; // 3.5 to 5 hours
  // Full day: 6 to 10 hours with variance
  const base = 7.5;
  const variance = Math.random() * 3 - 1.5; // -1.5 to 1.5
  return Math.max(6, Math.min(10, base + variance));
}

function generateAttendanceRecord(baseDate: Date): AttendanceRecord {
  const day = baseDate.getDay();
  let status: AttendanceRecord["status"] = "Present";

  if (day === 0 || day === 6) {
    status = "Absent"; // Weekend off
  } else {
    const r = Math.random();
    if (r < 0.05) status = "Absent";
    else if (r < 0.12) status = "Half-Day";
  }

  const checkInHour =
    status !== "Absent"
      ? (Math.random() > 0.3 ? 8 : 9) + Math.floor(Math.random() * 2)
      : 0;
  const checkInMin = status !== "Absent" ? Math.floor(Math.random() * 45) : 0;
  const hoursWorked = generateHoursWorked(
    status !== "Absent",
    status === "Half-Day",
  );

  let checkIn = undefined;
  let checkOut = undefined;
  if (status !== "Absent") {
    checkIn = new Date(baseDate);
    checkIn.setHours(checkInHour, checkInMin);

    checkOut = new Date(baseDate);
    checkOut.setHours(
      checkInHour + Math.floor(hoursWorked),
      Math.floor((hoursWorked % 1) * 60),
    );
  }

  return {
    date: baseDate,
    status,
    checkIn,
    checkOut,
  };
}

export const MOCK_ATTENDANCE_RECORDS: AttendanceRecord[] = Array.from(
  { length: 30 },
  (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return generateAttendanceRecord(date);
  },
);
