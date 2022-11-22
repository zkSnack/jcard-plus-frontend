import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Box, CssBaseline, Toolbar } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from './components/home';
import Claims from './components/claims';
import QueryRequests from './components/queryRequests';
import AppBanner from './components/AppBanner';
import AccountInfo from './components/accountInfo';
import projectLogo from './iden3.png';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const drawerWidth = 170;

  function getRouterLinkFromPage(pageName) {
    const pageNameLower = pageName.toLocaleLowerCase()
    if (pageNameLower === "home")
      return ""
    else if (pageNameLower === "account info")
      return "accountinfo"
    else
      return pageNameLower
  }

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
          <Box sx={{ display: 'flex'}}>
          <CssBaseline />
          <AppBanner drawerWidth={drawerWidth}/>
          <Router>
            <Drawer
              variant="persistent"
              anchor="left"
              open={true}
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
            >
              <Toolbar>
                <img src={projectLogo} alt="Logo" height="50px" width={drawerWidth}/>
              </Toolbar>
              <List>
                {['Home','Claims', 'Requests', 'Account Info'].map((text) => (
                  <Link to={'/' + getRouterLinkFromPage(text)} style={{textDecoration: 'none'}}>
                    <ListItem key={getRouterLinkFromPage(text)} disablePadding>
                      <ListItemButton>
                        <ListItemText primary={text} sx={{
                          textAlign: 'center',
                          color: 'white',
                        }}/>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Drawer>

            <Routes>
              <Route exact path='/' element={
                <Box
                  component="main"
                  sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                  <Toolbar />
                  <Home/>
                </Box>
              }/>
              <Route exact path='/claims' element={
                <Box
                  component="main"
                  sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                  <Toolbar />
                  <Claims />
                </Box>
              }/>
              <Route exact path='/requests' element={
                <Box
                  component="main"
                  sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                  <Toolbar />
                  <QueryRequests />
                </Box>
              }/>
              <Route exact path='/accountinfo' element={
                <Box
                  component="main"
                  sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                  <Toolbar />
                  <AccountInfo />
                </Box>
              }/>
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </div>
    );
}

export default App;
