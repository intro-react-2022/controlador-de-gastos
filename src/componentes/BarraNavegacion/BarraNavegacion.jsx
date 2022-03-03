import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UpdateIcon from "@mui/icons-material/Update";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth = 240;

const BarraNavegacion = (props) => {
  const { children, onCerarSesion, onCambioDeVista,titulo } = props;
  const handleCerrarSesion = () => {
    onCerarSesion?.();
  };
  function handleCLickOpcion(vista){
    onCambioDeVista?.(vista);
  }
  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              {titulo}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem button key={0} onClick={()=>handleCLickOpcion("transacciones")}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary={"Transacciones"} />
            </ListItem>

            <ListItem button key={0} onClick={()=>handleCLickOpcion("perfil")}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Perfil"} />
            </ListItem>

            <ListItem button key={0} onClick={()=>handleCLickOpcion("historico")}>
              <ListItemIcon>
                <UpdateIcon />
              </ListItemIcon>
              <ListItemText primary={"Histórico"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key={0} onClick={handleCerrarSesion}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Cerrar sesión"} />
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "#F8F9FA", p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default BarraNavegacion;
