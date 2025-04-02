
import { Layout } from "@/components/common/Layout";
import { PersonalityTest } from "@/components/tests/PersonalityTest";

const TestPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <PersonalityTest />
      </div>
    </Layout>
  );
};

export default TestPage;
