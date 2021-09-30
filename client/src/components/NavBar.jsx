import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavBarBtn from "./NavBarBtn";
import { useMediaQuery } from "react-responsive"

const NavBar = () => {
    const mobileView = useMediaQuery({
        query: "(min-width:650px)"
    });
    const displayMode = mobileView ? "block" : "none"

    return (
    <Box sx={{ flexGrow: 1}}>
    <AppBar position="static">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
            >
                <MenuIcon fontSize="large"/>
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Quiz CRUD App
            </Typography>
            <span style={{ display: displayMode }}>
                <NavBarBtn to="/" value="Home"/>
                <NavBarBtn to="/admin" value="Admin"/>
                <NavBarBtn to="/student" value="Student"/>
                <NavBarBtn to="/signin" value="SignIn"/>
                <NavBarBtn to="/signup" value="SignUp"/>
            </span>
        </Toolbar>
    </AppBar>
    </Box>
    );
};
export default NavBar;