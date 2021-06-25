import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CreatePost from "./pages/CreatePost/CreatePost";
import Home from "./pages/Home/Home";
import SinglePost from "./pages/SinglePost/SinglePost";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/profile" component={Profile} />
        <Route path="/post/:postId" component={SinglePost} />
        <Route path="/create" component={CreatePost} />
        <Route path="/forgotpassword" component={ChangePassword} />
        <Route path="/resetpassword/:resetToken" component={ChangePassword} />
      </Switch>
    </Router>
  );
};

export default App;
