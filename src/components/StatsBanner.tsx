type StatsBannerProps = {
  totalMovies: number;
  totalResults: number;
  isLiveApi: boolean;
};

const StatsBanner = ({
  totalMovies,
  totalResults,
  isLiveApi,
}: StatsBannerProps) => {
  return (
    <section className="stats-banner">
      <div>
        <strong>{totalMovies}</strong>
        <span> Movies</span>
      </div>

      <div>
        <strong>{totalResults}</strong>
        <span> Total Results</span>
      </div>

      <div>
        <strong>{isLiveApi ? "Live API" : "Sample Data"}</strong>
      </div>
    </section>
  );
};

export default StatsBanner;