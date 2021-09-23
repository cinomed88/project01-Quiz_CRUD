import { AppBar, Box, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavBarBtn from './NavBarBtn'

const NavBar = () => {
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
            <NavBarBtn to='/' value="Home"/>
            <NavBarBtn to='/admin' value="Admin"/>
            <NavBarBtn to='/student' value="Student"/>
            <NavBarBtn to='/signin' value="Signin"/>
            <NavBarBtn to='/signup' value="Signup"/>
        </Toolbar>
    </AppBar>
    </Box>
    );
}
export default NavBar;