import { NavLink } from'react-router-dom';
import { Button } from '@mui/material';

const NavBarBtn = (props) => {
    const btnStyle = {
        fontWeight: "bold",
        color: "white",
        textDecorationLine: "none"
    };
    const activeBtnStyle = {
        fontWeight: "bold",
        color: "white",
        textDecorationLine: "none"
    };
    return (
        <Button color="inherit">
            <NavLink to={props.to} style={btnStyle} activeStyle={activeBtnStyle}>
                {props.value}
            </NavLink>
        </Button>
    );
};
export default NavBarBtn;