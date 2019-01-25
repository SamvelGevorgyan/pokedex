import React from 'react';
import {
    AppBar,
    Toolbar,
    withStyles,
} from '@material-ui/core';
import SearchBox from "./SearchBox/SearchBox";
import FilterBox from "./FilterBox/FilterBox";

const Header = ({classes}) => (
    <nav className={classes.root}>
        <AppBar position="fixed">
            <Toolbar>
                <FilterBox/>
                <SearchBox/>
            </Toolbar>
        </AppBar>
    </nav>
);

const styles = () => ({
    root: {
        minWidth: '100%',
        "&>header>div": {
            justifyContent: "space-evenly",
        }
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        fontSize: 18,
        textOverflow: "initial",
        textTransform: "initial",
        marginLeft: "2%",
    },
    logout: {
        width: "fit-content",
        "& div": {
            width: "fit-content",
        }
    },
    button: {
        "&:hover": {
            backgroundColor: "#2196f3"
        }
    }
});

export default withStyles(styles)(Header);