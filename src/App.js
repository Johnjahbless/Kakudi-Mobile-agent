import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Header, Footer, Sidebar } from "./components/admin";
import ForgotPassword from "./pages/Pages/Auth/ForgotPassword";
import Login from "./pages/Pages/Auth/Login";
import ResetPassword from "./pages/Pages/Auth/ResetPassword";
import Error404 from "./pages/Pages/Errors/404";
import Dashboard from "./pages/Pages/Features/dashboard";
import Recharge from "./pages/Pages/Features/recharge";
import AddCard from "./pages/Pages/Features/add-card";
import AddFund from "./pages/Pages/Features/add-funds";
import WithdrawMoney from "./pages/Pages/Features/withdraw-money";
import Wallet from "./pages/Pages/Features/wallet";
import Referral from "./pages/Pages/Features/referrals";
import Transactions from "./pages/Pages/Features/transactions";
import Support from "./pages/Pages/Features/support";
import Kulator from "./pages/Pages/Features/ka-kulator";



import Settings from "./pages/Pages/Features/Settings";
import { useLocation } from "react-router-dom";
/*import AgentManagement from "./pages/Pages/Features/agent-management";
import ResolveIssues from "./pages/Pages/Features/resolve-issues";
import ManageCustomer from "./pages/Pages/Features/manage-customers";
import WalletTopUp from "./pages/Pages/Features/wallet-top";
import CustomerProfile from "./pages/Pages/Features/customer-profile";
import UserAccessLevel from "./pages/Pages/Features/user-access-level";
import DeviceManager from "./pages/Pages/Features/device-manager";
import ServiceManager from "./pages/Pages/Features/service-management";
import SpendAnalysis from "./pages/Pages/Features/spend-analysis";
import SaleAnalysis from "./pages/Pages/Features/sales-analysis";
import Statistics from "./pages/Pages/Features/logs";
import Audit from "./pages/Pages/Features/audit-trail";
import Activities from "./pages/Pages/Features/Activities";*/
import MyActivities from "./pages/Pages/Features/my-activites";
import ChangePassword from "./pages/Pages/Features/change-password";
import Ticket from "./pages/Pages/Features/ticket";
import history from "./history"; 

function App() {
  let location = useLocation().pathname;

  let locationSplit = location.split("/");
  let locationParent = locationSplit[1];
  let WithoutRouter = ["auth", "error", "utilities"];


  return (
    <div className="App">
      {" "}
      <>
        {" "}
        {!WithoutRouter.includes(locationParent) ? (
          <>
            <Header />
            <Sidebar />
          </>
        ) : (
          ""
        )}{" "}
        <Switch history={history}>
          <Route path="/" exact component={Dashboard} />{" "}
          <Route path="/recharge" exact component={Recharge} />{" "}
          <Route path="/add-card" exact component={AddCard} />{" "}
          <Route path="/add-funds" exact component={AddFund} />{" "}
          <Route path="/withdraw-money" exact component={WithdrawMoney} />{" "}
          <Route path="/wallet" exact component={Wallet} />{" "}
          <Route path="/referrals" exact component={Referral} />{" "}
          <Route path="/transactions" exact component={Transactions} />{" "}
          <Route path="/support" exact component={Support} />{" "}
          <Route path="/ka-kulator" exact component={Kulator} />{" "}
          <Route path="/ticket/:id" exact component={Ticket} />{" "}

       { /*  <Route path="/agent-management" exact component={AgentManagement} />{" "}
          <Route path="/resolve-issues" exact component={ResolveIssues} />{" "}
          <Route path="/customer-management" exact component={ManageCustomer} />{" "}
          <Route path="/wallet-funding" exact component={WalletTopUp} />{" "}
          <Route path="/user-access-level" exact component={UserAccessLevel} />{" "}
          <Route path="/device-manager" exact component={DeviceManager} />{" "}
          <Route path="/customer-profile" exact component={CustomerProfile} />{" "}
          <Route path="/service-mangement" exact component={ServiceManager} />{" "}
          <Route path="/spend-analysis" exact component={SpendAnalysis} />{" "}
          <Route path="/sales-analysis" exact component={SaleAnalysis} />{" "}
          <Route path="/statistics" exact component={Statistics} />{" "}
          <Route path="/audit-trail" exact component={Audit} />{" "}
          <Route path="/activities/:id" exact component={Activities} />{" "}*/}
          <Route path="/me/activities/" exact component={MyActivities} />{" "}
          <Route path="/change-password" exact component={ChangePassword} />{" "}


          <Route path="/Settings" exact component={Settings} />{" "}
          <Route path="/auth/login" exact component={Login} />{" "}
          <Route path="/auth/forget-password" exact component={ForgotPassword} />{" "}
          <Route path="/auth/reset-password" exact component={ResetPassword} />{" "}
          <Route component={Error404} />{" "}
        </Switch>{" "}
        <Footer />
      </>{" "}
    </div>
  );
}

export default App;
