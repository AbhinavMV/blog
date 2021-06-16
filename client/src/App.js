import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CreatePost from "./pages/CreatePost/CreatePost";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SinglePost from "./pages/SinglePost/SinglePost";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const App = () => {
  return (
    <Router>
      {/* <ResetPassword /> */}
      {/* <ForgotPassword /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/post/:postId" component={SinglePost} />
        <Route path="/create" component={CreatePost} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/resetpassword/:resetToken" component={ResetPassword} />
      </Switch>
    </Router>
  );
};

export default App;
