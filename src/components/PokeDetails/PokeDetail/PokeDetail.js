import React from 'react';
import {
    Button, Typography, Table,
    TableBody,
    TableRow,
    TableCell,
    Avatar
} from "@material-ui/core";
import {BeatLoader, CircleLoader, PacmanLoader} from "react-spinners";
import {PieChart} from "react-easy-chart";
import {AuxWin} from "../../../hoc/AuxWin";
import randomMC from "random-material-color";

const PokeDetail = ({sprites, name, id, types, species, height, weight, abilities, stats, baseExp, sm}) => {
    const randomColor = randomMC.getColor();

    return (
        <div className="data__wrapper">
            {
                sprites ?
                    <AuxWin>
                        <Avatar alt={name} src={sprites["back_default"]}/>
                        <Avatar alt={name} src={sprites["back_shiny"]}/>
                        <Avatar alt={name} src={sprites["front_default"]}/>
                        <Avatar alt={name} src={sprites["front_shiny"]}/>
                    </AuxWin>
                    : <PacmanLoader color={randomColor} size={40} margin="12"/>
            }
            <div className="data__wr">
                <Typography variant="h4" gutterBottom>PokeDex data</Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">National №</TableCell>
                            <TableCell>
                                {id
                                    ? <Typography variant="button" gutterBottom>{id}</Typography>
                                    : <BeatLoader color={randomColor} size={10} margin="5"/>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Name</TableCell>
                            <TableCell>
                                {name
                                    ? <Typography variant="button" gutterBottom>{name}</Typography>
                                    : <BeatLoader color={randomColor} size={10} margin="5"/>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Type</TableCell>
                            <TableCell component="th" scope="row">
                                {types
                                    ? types.map((types, index) =>
                                        <Button
                                            key={index}
                                            size="small"
                                            variant="text"
                                            style={{backgroundColor: randomColor, color: "#fff", margin: 5}}>
                                            {types.type.name}
                                        </Button>)
                                    : <BeatLoader color={randomColor} size={10} margin="5"/>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Height</TableCell>
                            <TableCell>
                                {height
                                    ? <Typography variant="button" gutterBottom>{height}</Typography>
                                    : <BeatLoader color={randomColor} size={10} margin="5"/>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Base Exp.</TableCell>
                            <TableCell>
                                {baseExp
                                    ? <Typography variant="button" gutterBottom>{baseExp}</Typography>
                                    : <BeatLoader color={randomColor} size={10} margin="5"/>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Weight</TableCell>
                            <TableCell>
                                {weight
                                    ? <Typography variant="button" gutterBottom>
                                        {`${weight} lbs (${(weight / 0.45359237).toFixed(2)} kg)`}
                                    </Typography>
                                    : <BeatLoader color={randomColor} size={10} margin="5"/>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Abilities</TableCell>
                            <TableCell>
                                {abilities
                                    ? abilities.map((abilities, index) =>
                                        <Typography
                                            style={{color: randomColor}}
                                            key={index}
                                            gutterBottom>
                                            {abilities.ability.name}
                                        </Typography>)
                                    : <BeatLoader color={randomColor} size={10} margin="5"/>}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="pie__chart">
                {stats
                    ? <PieChart
                        labels
                        styles={{
                            '.chart_lines': {strokeWidth: 0},
                            '.chart_text': {fontFamily: 'serif', fill: '#333'}
                        }}
                        size={sm ? 300 : 600}
                        data={
                            stats.map(s => {
                                return {
                                    key: `${s.stat.name} ${s.base_stat}`,
                                    value: s.base_stat,
                                    color: randomMC.getColor()
                                }
                            })
                        }
                    />
                    : <CircleLoader className="pie__chart__loader" color={randomColor} size={150}/>
                }
            </div>
        </div>
    );
};

export default PokeDetail;