import { TextField } from "@material-ui/core";
import { Button, createMuiTheme, Tab, Tabs, ThemeProvider } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search"
import { useEffect, useState } from "react";
import axios from "axios";

const Search = ()=>{
    const [page,setPage]=useState(1);
    const [type,setType]=useState(0);
    const [searchText,setSearchText]=useState("");
    const [numOfPages,setNumOfPages]=useState();
    const [content,setContent]=useState();
    const darkTheme = createMuiTheme({
        palette:{
            type:"dark",
            primary:{
                main:"#fff",
            },
        },
    });

    const fetchSearch=async ()=>{
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/${type? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        console.log("search=>", data);
        // setMoviesList(data.results);
        setContent(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(()=>{
        window.scroll(0,0);
        fetchSearch();
    },[type,page])

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display:"flex",margin:"15px 0"}}>
                    <span className="pageTitle">Search</span>
                    <TextField
                    style={{flex:1}}
                    className="searchBox"
                    label="Search"
                    variant="filled"
                    />
                    <Button variant="contained" style={{marginLeft:10}}>
                        <SearchIcon />
                    </Button>
                </div>

                <Tabs value={type} indicatorColor="primary" textColor="primary" onChange={(event,newValue)=>{
                    setType(newValue);
                    setPage(1);
                }}>
                    <Tab style={{width:"50%"}} label="Search Movies"></Tab>
                    <Tab style={{width:"50%"}} label="Search TV Series"></Tab>
                </Tabs>
            </ThemeProvider>
        </div>
    )
}
export default Search;