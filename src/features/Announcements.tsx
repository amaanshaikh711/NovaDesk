import { useState } from 'react';
import { Card, CardContent, Button, Badge } from '../components';
import { MOCK_ANNOUNCEMENTS } from '../lib/mockData';
import { format } from 'date-fns';
import { Megaphone, Sparkles, TrendingUp } from 'lucide-react';

export function Announcements() {
  const [showAISummary, setShowAISummary] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState("");

  const handleAISummary = () => {
    setIsSummarizing(true);
    setShowAISummary(true);
    setTimeout(() => {
      setIsSummarizing(false);
      setSummary("Based on this week's announcements: 1) Our office is closed on 10th July for Id-ul-Adha. 2) All remote employees must now connect via VPN before 9 AM starting 1st July. 3) The new performance policy goes live on 15th July.");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Company Announcements</h1>
          <p className="text-gray-500 dark:text-gray-400">Stay updated with the latest news.</p>
        </div>
        <Button onClick={handleAISummary} disabled={isSummarizing}>
          <Sparkles className="w-4 h-4 mr-2" />
          {isSummarizing ? 'Summarizing...' : 'AI Summary'}
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
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">AI Summary</h3>
                {isSummarizing ? (
                  <p className="text-blue-700 dark:text-blue-300 animate-pulse">Generating summary...</p>
                ) : (
                  <p className="text-blue-800 dark:text-blue-200">{summary}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {MOCK_ANNOUNCEMENTS.map((announcement) => (
          <Card key={announcement.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                  <Megaphone className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{announcement.title}</h3>
                        <Badge variant="outline">{announcement.category}</Badge>
                        {!announcement.isRead && <Badge variant="default" className="bg-blue-500 text-white">New</Badge>}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">{announcement.content}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{format(announcement.date, 'MMMM d, yyyy')}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Posted by {announcement.author}</p>
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
