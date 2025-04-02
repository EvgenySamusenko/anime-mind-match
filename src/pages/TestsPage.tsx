
import { Layout } from "@/components/common/Layout";
import { TestsList } from "@/components/tests/TestsList";

const TestsPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <TestsList />
      </div>
    </Layout>
  );
};

export default TestsPage;
