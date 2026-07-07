import { useState } from "react";
import { Card, CardContent, Button, Badge } from "../components";
import { MOCK_ANNOUNCEMENTS } from "../lib/mockData";
import { format } from "date-fns";
import { Megaphone, Sparkles, TrendingUp } from "lucide-react";

export function Announcements() {
  const [showAISummary, setShowAISummary] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string[]>([]);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Company Announcements
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Stay updated with the latest news.
          </p>
        </div>
        <Button onClick={handleAISummary} disabled={isSummarizing}>
          <Sparkles className="w-4 h-4 mr-2" />
          {isSummarizing ? "Summarizing..." : "AI Summary"}
        </Button>
      </div>

      {showAISummary && (
        <Card className="border-none shadow-md bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="mt-1">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                  AI Summary
                </h3>
                {isSummarizing ? (
                  <p className="text-blue-700 dark:text-blue-300 animate-pulse">
                    Generating summary...
                  </p>
                ) : (
                  <div className="text-blue-800 dark:text-blue-200">
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
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {MOCK_ANNOUNCEMENTS.map((announcement) => (
          <Card
            key={announcement.id}
            className="border-none shadow-md hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col 2xl:flex-row gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                  <Megaphone className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col xl:flex-row items-start justify-between gap-2 xl:gap-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                          {announcement.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-[10px] sm:text-xs"
                        >
                          {announcement.category}
                        </Badge>
                        {!announcement.isRead && (
                          <Badge
                            variant="default"
                            className="bg-blue-500 text-white text-[10px] sm:text-xs"
                          >
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                        {announcement.content}
                      </p>
                    </div>
                    <div className="xl:text-right mt-1 xl:mt-0 flex-shrink-0">
                      <p className="text-[10px] sm:text-sm text-gray-500">
                        {format(announcement.date, "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 flex items-center justify-between">
                    <p className="text-[10px] sm:text-sm text-gray-500 truncate">
                      Posted by {announcement.author}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
