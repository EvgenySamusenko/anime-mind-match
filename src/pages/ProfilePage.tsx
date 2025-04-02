
import { Layout } from "@/components/common/Layout";
import { ProfileView } from "@/components/profile/ProfileView";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <ProfileView />
      </div>
    </Layout>
  );
};

export default ProfilePage;
