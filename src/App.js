import "./App.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import ChatPages from "./Pages/ChatPages.js";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/chat' exact>
            <ChatPages/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
