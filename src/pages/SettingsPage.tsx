
import { Layout } from "@/components/common/Layout";
import { SettingsForm } from "@/components/settings/SettingsForm";

const SettingsPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <SettingsForm />
      </div>
    </Layout>
  );
};

export default SettingsPage;
