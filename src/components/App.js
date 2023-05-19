import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PublicRouter from "./PublicRouter";
function App() {
  return (
    <Router>
       <AuthProvider>
          <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <PublicRouter exact path="/Signup" component={Signup} />
                <PublicRouter exact path="/Login" component={Login} />
                <PrivateRoute exact path="/Quiz/:id" component={Quiz} />
                <PrivateRoute exact path="/result/:id" component={Results} />
            </Switch>
          </Layout>
          </AuthProvider>
    </Router>
  );
}

export default App;
