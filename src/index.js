import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home/Home'
import TicTacToe from './TicTacToe/TicTacToe';
import Quicksort from './Quicksort/Quicksort';
import BubbleSort from './BubbleSort/BubbleSort';
import Selectionsort from './Selectionsort/Selectionsort';
import Mergesort from './Mergesort/Mergesort';
import Insertionsort from './Insertionsort/Insertionsort';
import Shellsort from './Shellsort/Shellsort';
import registerServiceWorker from './registerServiceWorker';

// import { unregister } from './registerServiceWorker';
// console.log(unregister)


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
  <Router>
  	<div>
      <ul className="menu">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/TicTacToe">ticTacToe</Link></li>
        <li><Link to="/quicksort">Quicksort</Link></li>
        <li><Link to="/bubblesort">BubbleSort</Link></li>
        <li><Link to="/selectionsort">Selectionsort</Link></li>
        <li><Link to="/mergesort">Mergesort</Link></li>
        <li><Link to="/insertionsort">Insertionsort</Link></li>
        <li><Link to="/shellsort">Shellsort</Link></li>
      </ul>

      <Route path="/home" component={Home}/>
      <Route path="/TicTacToe" component={TicTacToe} />
      <Route path="/quicksort" component={Quicksort} />
      <Route path="/bubblesort" component={BubbleSort} />
      <Route path="/selectionsort" component={Selectionsort} />
      <Route path="/mergesort" component={Mergesort} />
      <Route path="/insertionsort" component={Insertionsort} />
      <Route path="/shellsort" component={Shellsort} />
    </div>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
