import { AppBar, Toolbar, Typography, IconButton } from "@mui/material"
import AccountCircle from '@mui/icons-material/AccountCircle';

function showAccountInfo() {
  console.log("Show Account Info");
}

function AppBanner(props) {
  return (
    <div id="appbar">
      <AppBar 
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            J-card+: Zero-knowledge Identity using Iden3
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={showAccountInfo}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppBanner