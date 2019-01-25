import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sendSearchQuery} from "../../../redux/actions/pkSearchActions";
import {withStyles, InputBase} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';

class SearchBox extends Component {
    state = {
        query: ""
    };

    handleChange = name => event => {
        const {sendSearchQuery} = this.props;
        const {value} = event.target;

        this.setState({
            [name]: value,
        }, () => {
            sendSearchQuery(value);
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase
                    onChange={this.handleChange("query")}
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                />
            </div>
        );
    }
}

const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        marginRight: "2%",
        [theme.breakpoints.down('sm')]: {
            width: "50%",
            marginRight: "0"
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: "20%",
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

const mapDispatchToProps = dispatch => {
    return {
        sendSearchQuery: bindActionCreators(sendSearchQuery, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(SearchBox));