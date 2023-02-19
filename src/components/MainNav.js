import {useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
// import { makeStyles } from '@mui/core/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import MovieIcon from '@mui/icons-material/LocationOn';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { createMuiTheme, ThemeProvider } from '@mui/material';

// const useStyles = makeStyles({
//   root:{
//     width:500,
//     position:"fixed",
//     bottom:0,
//     backgroundColor:"#2d313a",
//     zIndex:100,
//   }
// })
export default function SimpleBottomNavigation() {

  const darkTheme = createMuiTheme({
    palette:{
        type:"dark",
        primary:{
            main:"#fff",
        },
    },
});
  // const classes=useStyles();
  const [value, setValue] = useState(0);
  const navigate=useNavigate()
  useEffect(()=>{
    console.log('value =>',value)
    if(value === 0) navigate("/");
    else if(value === 1) navigate("/movies")
    else if(value === 2) navigate("/series")
    else if(value === 3) navigate("/search")
  },[value])

  return (
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{color:"black"}} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color:"black"}} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{color:"black"}} label="TV Series" icon={<TvIcon />} />
        <BottomNavigationAction style={{color:"black"}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
    </ThemeProvider>
  );
}