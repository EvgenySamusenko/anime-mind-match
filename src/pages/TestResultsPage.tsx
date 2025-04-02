
import { Layout } from "@/components/common/Layout";
import { TestResults } from "@/components/tests/TestResults";

const TestResultsPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <TestResults />
      </div>
    </Layout>
  );
};

export default TestResultsPage;
