
import { Layout } from "@/components/common/Layout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <ForgotPasswordForm />
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
