import { useState } from "react";
import {
  Layout,
  Dashboard,
  Attendance,
  Leaves,
  TeamDirectory,
  Announcements,
  Profile,
} from "./features";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard setActiveTab={setActiveTab} />;
      case "attendance":
        return <Attendance />;
      case "leaves":
        return <Leaves />;
      case "team":
        return <TeamDirectory />;
      case "announcements":
        return <Announcements />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
