import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenres from "../../Hooks/useGenres";
const Series = ()=>{
    const [page, setPage] = useState(1);
    const [seriesList, setseriesList] = useState([]);
    const [numOfPages, setNumOfPages] = useState(10);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genresforurl=useGenres(selectedGenres);
    const fetchSeries = async () => {
      const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresforurl}`
      );
      console.log("movies=>", data);
      setseriesList(data.results);
      setNumOfPages(data.total_pages)
    };
    useEffect(() => {
      window.scroll(0,0);
      fetchSeries();
    }, [page,genresforurl]);
    return (
        <div>
            {/* <span className="pageTitle">Series</span> */}
            <Genres
        type="movie"
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        selectedGenres={selectedGenres}
        setPage={setPage}
      />
      <div className="trending">
        {seriesList &&
          seriesList.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
        </div>
    )
}
export default Series;