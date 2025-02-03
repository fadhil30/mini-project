import EventList from "../../components/eventList";
import StatisticsChart from "../../components/statisticChart";
import ReportsTable from "../../components/reportTable";

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">
        Event Management Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <EventList />
        <StatisticsChart />
      </div>
      <div className="mt-4 sm:mt-8">
        <ReportsTable />
      </div>
    </div>
  );
}