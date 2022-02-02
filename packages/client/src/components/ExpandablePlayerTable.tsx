import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import PlayerGames from './PlayerGames';
import { PlayerList } from '../../../../common/types';

const useStyles = makeStyles({
  root: {
    width: 'auto',
    overflowX: 'auto',
    maxHeight: '100%'
  },
  table: {
    minWidth: 0
  }
});

type Props = {
  children: React.ReactNode;
  expandComponent: React.ReactNode;
};

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

export default function SimpleTable({ players }: PlayerList) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map(name => (
            <ExpandableTableRow
              key={name}
              expandComponent={
                <TableCell colSpan={5}>
                  <PlayerGames name={name}/>
                </TableCell>
              }
            >
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}