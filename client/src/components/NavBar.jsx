import { useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, SwipeableDrawer, List, Divider } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QuizIcon from '@mui/icons-material/Quiz';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';
import NavBarBtn from "./NavBarBtn";
import { useMediaQuery } from "react-responsive"
import ListItemLink from "./ListItemLink.jsx"

const NavBar = () => {
    const mobileView = useMediaQuery({
        query: "(min-width:650px)"
    });
    const displayMode = mobileView ? "block" : "none"

    const [drawer, setDrawer] = useState(false);
    const toggleDrawer = (isOpen) => (e) => {
        setDrawer(isOpen);
    };

    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            >
            <List>
                {['Home', 'Admin', 'Student'].map((text, index) => (
                    <ListItemLink 
                        to={index % 3 === 0 ? "/" : index === 1 ? "/admin" : "/student"} 
                        primary={text}
                        icon={index % 3 === 0 ? <HomeIcon /> : index === 1 ? <AdminPanelSettingsIcon /> : <QuizIcon/>}
                    />
                ))}
            </List>
            <Divider />
            <List>
                {['SignIn', 'SignUp'].map((text, index) => (
                    <ListItemLink 
                        to={index % 2 === 0 ? "/signin" : "/signup"} 
                        primary={text} 
                        icon={index % 2 === 0 ? <LoginIcon /> : <CreateIcon />}
                    />
                ))}
            </List>
        </Box>
    );

    return (
    <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
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
                    <NavBarBtn to="/signout" value="SignOut"/>
                    <NavBarBtn to="/signup" value="SignUp"/>
                </span>
            </Toolbar>
        </AppBar>
        <SwipeableDrawer
            anchor="left"
            open={drawer}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            {list}
        </SwipeableDrawer>
    </Box>
    );
};
export default NavBar;