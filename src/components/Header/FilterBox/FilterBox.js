import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPokemonByType} from "../../../redux/thunks/mainThunks";
import {refinePokemonByType, removePokemonListByType} from "../../../redux/actions/pkListRefineActions";
import {withStyles, MenuItem, TextField} from '@material-ui/core';
import DataManager from "../../../managers/DataManager/DataManager";

class FilterBox extends Component {
    state = {
        type: 'All Types',
    };

    refinePokemon = type => {
        const {fetchPokemonByType, refinePokemonByType, removePokemonByType} = this.props;

        fetchPokemonByType(type).then(res => {
            refinePokemonByType({
                isRefineByPokemonType: true,
                type,
            });
        }).catch(err => {
            console.error("Failed to filter", err);
        });
        removePokemonByType();
    };

    removeRefine = () => {
        const {refinePokemonByType} = this.props;

        refinePokemonByType({
            isRefineByPokemonType: false,
        });
    };

    handleChange = name => event => {
        const {value} = event.target;
        if (value === 'All Types') {
            this.removeRefine();
        } else {
            this.removeRefine();
            this.refinePokemon(value);
        }
        this.setState({
            [name]: value,
        });
    };

    render() {
        const {classes} = this.props;
        const {type} = this.state;
        const types = DataManager.getFilterTypes();

        return (
            <TextField
                id="filter-box"
                select
                label="Filter By"
                className={classes.textField}
                value={type}
                onChange={this.handleChange('type')}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
                variant="outlined"
            >
                {types.map(option => (
                    <MenuItem key={option.value} value={option.value} name={option.type}>
                        {option.type}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
}

const styles = theme => ({
    textField: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        background: "rgba(255, 255, 255, 0.15)",
        marginLeft: 0,
        width: '500px',
        height: "100%",
        [theme.breakpoints.down('sm')]: {
            width: "35%",
            height: "25%"
        },
        outline: 0,
        marginRight: theme.spacing.unit,
        "& label": {
            color: "#fff",
            "&:focus": {
                color: "#fff",
            },
        },
        "& div": {
            color: "#fff",
            "&:focus": {
                background: "transparent",
            }
        },
        "& .MuiFormLabel-root-96.MuiFormLabel-focused-97": {
            color: "#fff",
            outline: 0
        },
        "& .MuiSelect-select-104": {
            "&:focus": {
                background: 0,
            }
        },
        "& svg": {
            outline: 0
        }
    },
    menu: {
        marginTop: "-1%"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemonByType: bindActionCreators(getPokemonByType, dispatch),
        removePokemonByType: bindActionCreators(removePokemonListByType, dispatch),
        refinePokemonByType: bindActionCreators(refinePokemonByType, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(FilterBox));