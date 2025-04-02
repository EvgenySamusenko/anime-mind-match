
import { Layout } from "@/components/common/Layout";
import { RegisterForm } from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;
