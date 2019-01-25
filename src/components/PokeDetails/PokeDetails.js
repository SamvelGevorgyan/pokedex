import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPokemonDetail } from "../../redux/thunks/mainThunks";
import { removePokemonDetail } from "../../redux/actions/pkDetailActions";
import { AuxWin } from "../../hoc/AuxWin";
import { Modal, TableCell, TableRow, withStyles, Button } from "@material-ui/core";
import PokeDetail from "./PokeDetail/PokeDetail";

class PokeDetails extends Component {
    state = {
        show: false,
        sm: false
    };

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        if (window.innerWidth < 768) {
            this.setState({ sm: true });
        } else {
            this.setState({ sm: false });
        }
    };

    handleOpen = () => {
        this.setState({ show: true });
    };

    handleClose = () => {
        const { removePokemonDetail } = this.props;
        this.setState({ show: false });
        removePokemonDetail();
    };

    handleClick = pokeId => {
        this.handleOpen();
        const { fetchPokemonDetail } = this.props;

        fetchPokemonDetail(pokeId).then(res => {
            console.info("Details success fetched");
        }).catch(err => {
            console.error("Failed to fetch pokemon", err);
        });
    };

    render() {
        const { classes, pokemonId, pokemonName, pokemonImg, pokemonDetail } = this.props;
        const { show, sm } = this.state;

        return (
            <AuxWin>
                <TableRow
                    hover
                    onClick={() => this.handleClick(pokemonId)}
                    tabIndex={-1}>
                    <TableCell align="left">
                        <img
                            alt="sprite"
                            src={pokemonImg}
                        />
                        {pokemonId}
                    </TableCell>
                    <TableCell>
                        {pokemonName}
                    </TableCell>
                </TableRow>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    tabIndex={-1}
                    open={show}
                >
                    <div className={classes.root}>
                        <PokeDetail
                            sprites={pokemonDetail.sprites}
                            name={pokemonDetail.name}
                            id={pokemonDetail.id}
                            baseExp={pokemonDetail.base_experience}
                            types={pokemonDetail.types}
                            species={pokemonDetail.species}
                            height={pokemonDetail.height}
                            weight={pokemonDetail.weight}
                            abilities={pokemonDetail.abilities}
                            stats={pokemonDetail.stats}
                            sm={sm}
                        />
                        <Button className={classes.modal__close__btn} onClick={this.handleClose}>x</Button>
                    </div>
                </Modal>
            </AuxWin>
        );
    }
}

const styles = theme => ({
    root: {
        position: 'fixed',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        minWidth: "90%",
        height: "100%",
        overflowY: 'scroll',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "4%",
        alignItems: "flex-end",
        justifyContent: "space-between",
        outline: 0,
        [theme.breakpoints.down('sm')]: {
            padding: "1%",
            width: "100%",
            height: "100%",
        },
        "& .data__wrapper": {
            display: "flex",
            alignItems: "baseline",
            [theme.breakpoints.down('sm')]: {
                alignItems: "flex-start"
            },
            "&>div": {
                width: 150,
                height: 150,
                [theme.breakpoints.down('sm')]: {
                    width: "20%",
                    height: "100%",
                },
            },
            "& .data__wr": {
                display: "flex",
                width: "100%",
                height: "100%",
                padding: "5%",
                alignItems: "center",
                flexDirection: "column",
                [theme.breakpoints.down('sm')]: {
                    padding: 0,
                    marginLeft: "-80%",
                    marginTop: "20%",
                    "& h4": {
                        fontSize: 12
                    },
                    "& th": {
                        fontSize: "0.6em"
                    },
                    "& tr": {
                        height: 0,
                        "& span": {
                            fontSize: 9
                        },
                        "& p": {
                            fontSize: 9
                        },
                        "& button": {
                            padding: "2px 7px",
                            minWidth: 40,
                            fontSize: 9
                        }
                    }
                },
            },
            "& .pie__chart": {
                position: "absolute",
                top: "225px",
                height: "100%",
                maxWidth: "600px",
                left: "5%",
                [theme.breakpoints.down('sm')]: {
                    top: "500px",
                    right: 0
                },
                "& .pie__chart__loader": {
                    position: "absolute",
                    top: "60%"
                },
                "& text": {
                    fill: "#fff",
                    fontSize: 12,
                    textTransform: "capitalize",
                    fontWeight: 800,
                    fontStyle: "italic",
                    [theme.breakpoints.down('sm')]: {
                        fontSize: "xx-small",
                    },
                }
            }
        }

    },
    modal__close__btn: {
        position: "absolute",
        top: 20,
        right: 30,
        border: "1px solid #2196f3",
        backgroundColor: "#2196f3",
        height: 35,
        borderRadius: 5,
        textAlign: "center",
        color: "white",
        cursor: "pointer",
        [theme.breakpoints.down('sm')]: {
            minWidth: "8%",
            height: "3%",
            "& span": {
                position: "absolute",
                top: 3,
                fontSize: 9
            }
        },
        "&:hover": {
            border: "1px solid #2196f3",
            backgroundColor: "#fff",
            color: "#2196f3",
            transition: "0.5s"
        }
    }


});

const mapStateToProps = state => {
    return {
        pokemonDetail: state.pkDetail,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemonDetail: bindActionCreators(getPokemonDetail, dispatch),
        removePokemonDetail: bindActionCreators(removePokemonDetail, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PokeDetails));