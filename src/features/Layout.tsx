import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  Calendar,
  Clock,
  Users,
  Megaphone,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  Bell,
  Mic,
  Search,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Button, Chatbot } from "../components";
import { useTheme } from "../hooks/useTheme";
import { MOCK_ANNOUNCEMENTS } from "../lib/mockData";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "attendance", label: "Attendance", icon: Clock },
  { id: "leaves", label: "Leaves", icon: Calendar },
  { id: "team", label: "Directory", icon: Users },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "profile", label: "Profile", icon: Settings },
];

export function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const startListening = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 bg-white dark:bg-[#11131c] border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out flex flex-col md:relative md:translate-x-0",
          isSidebarOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full w-64 md:w-20",
        )}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
          <div
            className={cn(
              "flex items-center transition-all duration-300 w-full",
              isSidebarOpen ? "justify-start" : "justify-center px-0",
            )}
          >
            {isSidebarOpen ? (
              <>
                <img src="/logo.png" alt="FlowDesk" className="h-16 w-auto object-contain object-left mix-blend-multiply transform scale-125 origin-left dark:hidden" />
                <img src="/logo-dark.png" alt="FlowDesk" className="h-16 w-auto object-contain object-left transform scale-125 origin-left hidden dark:block" />
              </>
            ) : (
              <img
                src="/favicon.png"
                alt="FlowDesk"
                className="h-10 w-10 object-contain rounded-xl"
              />
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                  activeTab === item.id
                    ? "bg-violet-600 text-white shadow-md"
                    : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white",
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Controls */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
            {isSidebarOpen && (
              <span className="text-sm font-medium">Dark Mode</span>
            )}
          </button>
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
            <div className="relative hidden md:flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
                className="w-64 h-10 pl-10 pr-10 rounded-full bg-gray-100 dark:bg-gray-900 border-0 focus:ring-2 focus:ring-violet-500 text-sm transition-all focus:w-72"
              />
              <button
                onClick={startListening}
                className={cn(
                  "absolute right-2 p-1.5 rounded-full transition-colors",
                  isListening
                    ? "bg-red-100 dark:bg-red-900/30 text-red-500 animate-pulse"
                    : "text-gray-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20",
                )}
                title="Search by voice"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={notificationRef}>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-950" />
              </Button>

              {/* Notification Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100/50 dark:border-gray-800/50 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {MOCK_ANNOUNCEMENTS.slice(0, 3).map((announcement) => (
                      <div
                        key={announcement.id}
                        className="p-4 border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                          {announcement.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {announcement.content}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50">
                    <Button
                      variant="ghost"
                      className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700"
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        setActiveTab("announcements");
                      }}
                    >
                      View all announcements
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div
              className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setActiveTab("profile")}
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Amaan Shaikh</p>
                <p className="text-xs text-gray-500">Frontend Developer</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                AS
              </div>
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
          {children}
        </div>

        {/* Global AI Chatbot */}
        <Chatbot />
      </main>
    </div>
  );
}
