import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import {TableCell, TableHead, TableRow, TableSortLabel} from '@material-ui/core';
import DataManager from "../../../../managers/DataManager/DataManager";

class PokeTableHead extends Component {
    createSortHandler = property => event => {
        const {onRequestSort} = this.props;
        onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;
        const rows = DataManager.getTableRows();

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                sortDirection={orderBy === row.id ? order : false}>
                                <TableSortLabel
                                    active={orderBy === row.id}
                                    direction={order}
                                    onClick={this.createSortHandler(row.id)}>
                                    {row.label}
                                </TableSortLabel>
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    }
}

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

export default withStyles(toolbarStyles)(PokeTableHead);