import { AppBar, Toolbar, Typography } from "@mui/material"


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
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppBanner