import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import playerService from '../services/players';
import { PlayerGamesTableFormat, Stats } from '../../../../common/types';

const gameColumns = [
  {
    field: 'outcome',
    headerName: 'Outcome',
    width: 85,
    editable: false,
  },
  {
    field: 'playerName',
    headerName: 'Player name',
    width: 125,
    editable: false,
  },
  {
    field: 'playerPlayed',
    headerName: 'Played',
    width: 85,
    editable: false,
  },
  {
    field: 'opponentName',
    headerName: 'Opponent name',
    width: 125,
    editable: false
  },
  {
    field: 'opponentPlayed',
    headerName: 'Played',
    width: 85,
    editable: false,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 125,
    editable: false,
  },
];

const StatsTable = ({ stats }: { stats: Stats }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Total matches</TableCell>
            <TableCell>Win rate</TableCell>
            <TableCell>Most played</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats ?
            <TableRow>
              <TableCell>{stats.totalMatches}</TableCell>
              <TableCell>{stats.winRate}</TableCell>
              <TableCell>{stats.mostPlayed}</TableCell>
            </TableRow>
            : null
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};



export default function DataGridDemo({ name }: { name: string }) {
  const [playerGames, setPlayerGames] = useState<PlayerGamesTableFormat>();

  useEffect(() => {
    playerService.getPlayerGames(name).then(newPlayerGames => {
      const playerGamesTableFormatted = {
        stats: newPlayerGames.stats, 
        name: newPlayerGames.name,
        games: newPlayerGames.games.map(game => {
          return {
            id: game.gameId,
            outcome: game.outcome,
            playerName: game.player.name,
            playerPlayed: game.player.played,
            opponentName: game.opponent.name,
            opponentPlayed: game.opponent.played,
            date: new Date(game.t)
          };
        })
      }
      setPlayerGames(playerGamesTableFormatted);
    })
    
  }, []);

  return (
    <>
      <StatsTable stats={(playerGames as PlayerGamesTableFormat).stats}/>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={(playerGames as PlayerGamesTableFormat).games}
          columns={gameColumns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      </div>
    </>
  );
}