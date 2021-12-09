import classes from './menu.module.sass';
import { Button, TextField, Typography } from '@mui/material/';
import { useReducer } from 'react';
import { connect } from 'react-redux';
import { GameAction } from '../store/reducers/game';
import type { RootState } from '../store/store';

interface StateProps {
  user: string;
  started: boolean;
};

interface DispatchProps {
  setUser: (userName: string) => GameAction;
  startGame: () => GameAction;
};

type Props = StateProps & DispatchProps;

const Menu = ({user, setUser, startGame}: Props) => {

  return (
    <div className={classes.container}>
      <div className={classes.root}>

        <Typography variant="h5" className={!user ? classes.error : classes.userName}>
          {user || "Введите имя"}
        </Typography>

        <TextField 
          id="outlined-basic" 
          label="Имя пользователя" 
          variant="outlined" 
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className={classes.input}
          />

        <Button 
          variant="outlined" 
          className={classes.button}
          onClick={startGame}
          >
            Начать игру
        </Button>

      </div>
    </div>
  )
};

const mapState = (state: RootState) => ({
  user: state.game.user,
  started: state.game.started
});

const mapDispatch: DispatchProps = {
  setUser: (userName: string) : GameAction => ({type: "changeUser", userName: userName}),
  startGame: () : GameAction => ({type: "start"})
}



export default connect(
  mapState,
  mapDispatch,
  )(Menu)