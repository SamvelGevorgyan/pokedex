import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPokemon} from "../../redux/thunks/mainThunks";
import {withStyles} from '@material-ui/core/styles';
import {RiseLoader} from "react-spinners";
import PokeTable from "./PokeTable/PokeTable";

class PokeList extends Component {

    state = {
        pokemonListItems: null,
        pokemonRefineItems: null,
        sm: false
    };

    componentDidMount() {
        const {fetchPokemon} = this.props;

        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);

        fetchPokemon().then(res => {
            console.info("List success fetched");
        }).catch(err => {
            console.error("Failed to fetch pokemon", err);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {pokemon, searchQuery, pokeRefineList, pokeRefine} = this.props;
        if (prevProps.pokeRefineList !== pokeRefineList
            || prevProps.searchQuery !== searchQuery
            || prevProps.pokemon !== pokemon
            || prevProps.pokeRefine !== pokeRefine) {
            const searchPokeList = (searchQuery !== "")
                ? this.handleSearch(pokemon.results, false)
                : pokemon.results;
            const searchRefineList = (searchQuery !== "" && pokeRefine.isRefineByPokemonType)
                ? this.handleSearch(pokeRefineList, true)
                : pokeRefineList;
            this.setState({
                pokemonListItems: searchPokeList,
                pokemonRefineItems: searchRefineList
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        if (window.innerWidth < 768) {
            this.setState({sm: true});
        } else {
            this.setState({sm: false});
        }
    };

    handleSearch = (list, refine) => {
        const {searchQuery} = this.props;

        return list && list.filter(poke => {
            const name = refine ? poke.pokemon.name : poke.name;
            return name.toLowerCase().includes(searchQuery);
        });
    };

    render() {
        const {classes, pokeRefine} = this.props;
        const {pokemonListItems, pokemonRefineItems, sm} = this.state;

        return (
            <section className={classes.root}>
                {pokemonListItems
                    ? <PokeTable
                        pokeList={pokemonListItems}
                        pokeRefineList={pokemonRefineItems}
                        pokeRefine={pokeRefine.isRefineByPokemonType}/>
                    : <RiseLoader size={!sm ? 90 : 45} margin="30"/>
                }
            </section>
        );
    }
}

const styles = theme => ({
    root: {
        width: "120vh",
        "& .table": {
            width: "auto",
            height: "auto",
            [theme.breakpoints.down('sm')]: {
                "& td": {
                    fontSize: 13
                },
                "& th": {
                    fontSize: 18
                }

            },
        },
        "& .css-0": {
            display: "flex",
            justifyContent: "center",
            marginTop: "30%",
            "& div": {
                backgroundColor: "#e91e63"
            }
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%",
        },
    },
    list: {
        flexGrow: 1,
        "& div": {
            justifyContent: "center"
        }
    },
    ul: {
        display: "flex",
        justifyContent: "space-evenly"
    }
});

const mapStateToProps = state => {
    return {
        pokemon: state.pkList,
        pokeRefine: state.pkRefine,
        pokeRefineList: state.pkListType.pokemon,
        searchQuery: state.pkSearchQuery
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemon: bindActionCreators(getPokemon, dispatch),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PokeList));