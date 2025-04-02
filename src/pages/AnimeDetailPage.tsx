
import { Layout } from "@/components/common/Layout";
import { AnimeDetail } from "@/components/anime/AnimeDetail";

const AnimeDetailPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <AnimeDetail />
      </div>
    </Layout>
  );
};

export default AnimeDetailPage;
