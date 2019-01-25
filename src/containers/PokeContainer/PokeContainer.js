import React from 'react';
import {withStyles} from "@material-ui/core";
import PokeList from "../../components/PokeList/PokeList";

const PokeContainer = ({classes}) => (
    <main className={classes.root}>
        <PokeList/>
    </main>
);

const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        marginTop: "5%",
        [theme.breakpoints.down('sm')]: {
            marginTop: "20%",
        },
    }
});

export default withStyles(styles)(PokeContainer);