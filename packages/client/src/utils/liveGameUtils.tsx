import React from 'react';
import LandscapeIcon from '@mui/icons-material/Landscape';
import NoteIcon from '@mui/icons-material/Note';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import HelpIcon from '@mui/icons-material/Help';
import { Hand } from '../../../../common/types';

export const rpsIcon = (rps: Hand | null) => {
  switch(rps) {
    case 'ROCK':
      return <LandscapeIcon />;
    case 'PAPER':
      return <NoteIcon />;
    case 'SCISSORS':
      return <ContentCutIcon />;
    default:
      return <HelpIcon />;
  }
};