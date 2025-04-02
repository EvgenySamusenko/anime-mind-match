
import { Layout } from "@/components/common/Layout";
import { Dashboard } from "@/components/dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="text-3xl font-bold text-center mb-8">Your Dashboard</h1>
        <Dashboard />
      </div>
    </Layout>
  );
};

export default DashboardPage;
