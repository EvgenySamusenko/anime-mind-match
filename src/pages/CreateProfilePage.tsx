
import { Layout } from "@/components/common/Layout";
import { CreateProfileForm } from "@/components/profile/CreateProfileForm";

const CreateProfilePage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <CreateProfileForm />
      </div>
    </Layout>
  );
};

export default CreateProfilePage;
