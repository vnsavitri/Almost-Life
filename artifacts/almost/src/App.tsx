import { Switch, Route, Router as WouterRouter } from "wouter";
import Home from "@/pages/home";
import Upload from "@/pages/upload";
import Branches from "@/pages/branches";
import Loading from "@/pages/loading";
import Result from "@/pages/result";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/upload" component={Upload} />
      <Route path="/branches" component={Branches} />
      <Route path="/loading" component={Loading} />
      <Route path="/result" component={Result} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
