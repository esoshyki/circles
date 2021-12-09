import './App.sass';
import Menu from './menu';
import Game from './game';
import { RootState } from './store/store';
import { connect } from 'react-redux';

interface StateProps {
  started: boolean;
  paused: boolean;
  finished: boolean;
}

function App({
  started, paused, finished
} : StateProps) {
  return (
    <div className="App">
      {!started && !paused && !finished && <Menu />}
      {started && <Game />}
    </div>
  );
};

const mapState = (state: RootState) : StateProps => ({
  started: state.game.started,
  paused: state.game.paused,
  finished: state.game.finished
});

export default connect(
  mapState
)(App);
