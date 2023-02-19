import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenres from "../../Hooks/useGenres";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [moviesList, setMoviesList] = useState([]);
  const [numOfPages, setNumOfPages] = useState(10);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genresforurl=useGenres(selectedGenres);
  const fetchMovies = async () => {
    const { data } = await axios.get(
    //   `https://api.themoviedb.org/3/discover/movie?api_key=9abac108e80bffaa50ae88ff02b503b6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=${genresforurl}`
    // );
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresforurl}`
    );
    console.log("movies=>", data);
    setMoviesList(data.results);
    setNumOfPages(data.total_pages)
  };
  useEffect(() => {
    window.scroll(0,0);
    fetchMovies();
  }, [page,genresforurl]);
  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        selectedGenres={selectedGenres}
        setPage={setPage}
      />
      <div className="trending">
        {moviesList &&
          moviesList.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movies"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};
export default Movies;
