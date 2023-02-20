import { TextField } from "@material-ui/core";
import { Button, createTheme, Tab, Tabs, ThemeProvider } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search"
import { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "../Trending/Trending.css"

const Search = ()=>{
    const [page,setPage]=useState(1);
    const [type,setType]=useState(0);
    const [searchText,setSearchText]=useState("");
    const [numOfPages,setNumOfPages]=useState();
    const [content,setContent]=useState([]);
    const darkTheme = createTheme({
        palette:{
            type:"dark",
            primary:{
                main:"#fff",
            },
        },
    });

    const fetchSearch=async ()=>{
        console.log("api=>",`https://api.themoviedb.org/3/${searchText.length ? "search" : "discover"}//${type? "tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}`
        )
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${searchText.length ? "search" : "discover"}/${type ? "tv" : "movie"}?api_key=${
              process.env.REACT_APP_API_KEY
            }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
          );
        setContent(data.results)
        setNumOfPages(data.total_pages)
        setSearchText('');
        console.log("during search=>", data);
    }

    useEffect(()=>{
        window.scroll(0,0);
        fetchSearch();
    },[type,page])

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display:"flex",margin:"15px 0"}}>
                    {/* <span className="pageTitle">Search</span> */}
                    <TextField
                    style={{flex:1}}
                    className="searchBox"
                    label="Search"
                    variant="filled"
                    onChange={(event)=> {
                        console.log("event",event);
                        setSearchText(event.target.value)
                        }
                    } 
                    value={searchText}  
                    />
                    <Button variant="contained" onClick={fetchSearch} style={{ marginLeft: 10 }}>
                        <SearchIcon fontSize="large"/>
                    </Button>
                </div>

                <Tabs value={type} indicatorColor="primary" textColor="primary" onChange={(event,newValue)=>{
                    console.log("newValue",newValue,event)
                    setType(newValue);
                    setPage(1);
                }}>
                    <Tab style={{width:"50%"}} label="Search Movies"></Tab>
                    <Tab style={{width:"50%"}} label="Search TV Series"></Tab>
                </Tabs>
            </ThemeProvider>
            <div className="trending">
            {content &&
              content.map((c) => (
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type={type ? "tv" : "movie"}
                  vote_average={c.vote_average}
                />
              ))}
            </div>
            <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
        </div>
    )
}
export default Search;