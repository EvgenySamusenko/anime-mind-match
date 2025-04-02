
import { Layout } from "@/components/common/Layout";
import { AnimeGrid } from "@/components/anime/AnimeGrid";

const AnimeListPage = () => {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <h1 className="text-3xl font-bold text-center mb-8">Anime Database</h1>
        <AnimeGrid />
      </div>
    </Layout>
  );
};

export default AnimeListPage;
