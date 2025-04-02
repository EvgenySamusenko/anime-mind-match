
import { Layout } from "@/components/common/Layout";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
