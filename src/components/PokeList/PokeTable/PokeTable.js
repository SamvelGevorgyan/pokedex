import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TablePagination,
    Paper,
    withStyles,
} from '@material-ui/core';
import {BeatLoader} from "react-spinners";
import {AuxWin} from "../../../hoc/AuxWin";
import noImage from "../../../assets/no__img.png";
import PokeTableHead from "./PokeTableHead/PokeTableHead";
import PokeDetails from "../../PokeDetails/PokeDetails";
import DataManager from "../../../managers/DataManager/DataManager";

class PokeTable extends Component {
    state = {
        order: 'desc',
        orderBy: 'id',
        page: 0,
        rowsPerPage: 10,
    };

    handleSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = e => {
        this.setState({rowsPerPage: e.target.value});
    };

    render() {
        const {classes, pokeList, pokeRefine, pokeRefineList} = this.props;
        const {order, orderBy, rowsPerPage, page} = this.state;
        const pokeListData = pokeRefine ? pokeRefineList : pokeList;

        return (
            <div className="table">
                <Paper className={classes.root}>
                    {pokeListData
                        ? <AuxWin>
                            <div className={classes.tableWrapper}>
                                <Table className={classes.table} aria-labelledby="pokemonsTable">
                                    <PokeTableHead
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={this.handleSort}
                                        rowCount={pokeListData.length}
                                    />
                                    <TableBody>
                                        {DataManager.stableSort(pokeListData, DataManager.getSorting(order, orderBy, pokeRefine))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((pokemon, index) => {
                                                const url = !pokeRefine ? pokemon.url : pokemon.pokemon.url;
                                                const name = !pokeRefine ? pokemon.name : pokemon.pokemon.name;
                                                const pokemonId = DataManager.getPokemonId(url);
                                                const pokemonImg = pokemonId < 10091
                                                    ? DataManager.getPokemonImg(pokemonId)
                                                    : noImage;
                                                const pokemonName = DataManager.capitalize(name);

                                                return (
                                                    <PokeDetails key={index} pokemonId={pokemonId}
                                                                 pokemonImg={pokemonImg}
                                                                 pokemonName={pokemonName}/>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </div>
                            <TablePagination
                                className={classes.pagination}
                                rowsPerPageOptions={[10, 20, 50]}
                                component="div"
                                count={pokeListData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </AuxWin>
                        : <div>
                            <BeatLoader size={50} margin="16"/>
                        </div>}
                </Paper>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        "& div": {
            width: "auto",
            height: "auto"
        },
        "& img": {
            width: 50,
            height: 40,
            verticalAlign: "middle"
        },
        "& td": {
            padding: "2%",
            fontSize: "1rem",
            fontWeight: "bold"
        }
    },
    table: {
        "& th": {
            fontSize: 25,
            fontStyle: "oblique"
        }
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    pagination: {
        "& div": {
            width: "auto"
        },
        "& svg": {
            top: "10%",
            left: "50%"
        }

    }
});

export default withStyles(styles)(PokeTable);