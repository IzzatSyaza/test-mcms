import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage";
import Main from "../pages/Mainmenu/Main";
import Login from "../pages/Login/Login";
import AddEmployee from "../pages/Addemployee/AddEmployee";
import SearchEmployeeTransaction from "../pages/SearchEmployee/SeachEmpTrans"
import SelectGrade from "../pages/SelectGrade/SelectGrade"
import EditEntitlement from "../pages/EditEntitlement/EditEntitlement";
import AddSpouse from "../pages/FamilyMember/Spouse/Spouse"
import AddChildren from "../pages/FamilyMember/Children/Children"
import EditChild from "../pages/FamilyMember/EditChild/EditChild"
import EditSpouse from "../pages/FamilyMember/EditSpouse/EditSpouse"
import EmployeeMenu from "../pages/EmployeeMenu/EmployeeMenu";
import ClinicMenu from "../pages/ClinicFeature/ClinicMenu";
import ReportMenu from "../pages/ReportMenu/index";
import Transaction from "../pages/TransactionForm/Transaction";
import DisplayEmployee from "../pages/DisplayEmployee/DisplayEmployee";
import DisplayFamily from "../pages/FamilyMember/DisplayFamily/DisplayFamily"
import ClinicMainMenu from "../pages/ClinicMainMenu/ClinicMainMenu";
import ClinicDisplayEmp from "../pages/ClinicDisplayEmployee/ClinicDisplayEmp";
import AddClinic from "../pages/AddClinic/AddClinic";
import ReportByClinic from "../pages/ReportByClinic/ReportByClinic";
import ReportByDept from "../pages/ReportByDepartment/ReportByDept";
import ReportByMed from "../pages/ReportByMedical/ReportByMed";

import DisplayReportByClinic from "../pages/ReportByClinic/DisplayReportByClinic"
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import TopNavbar from "./TopNavbar/TopNavbar";
// import Footer from "./Footer/Footer";
// import Side from "./Sidebar/Sidebar"
import AdminProtectedRoutes from "./ProtectedRoute/AdminProtectedRoutes";
import ClinicProtectedRoutes from "./ProtectedRoute/ClinicProtectedRoutes";
import LoginProtectedRoutes from "./ProtectedRoute/LoginProtectedRoute";
// import Cookies from "js-cookie";
import {Spinner} from "react-bootstrap"
import "./app.css"



import { AuthContext } from "../helpers/AuthContext";
import Sidebar from "./Sidebar/Sidebar";
import AddAdmin from "../pages/addAdmin/AddAdmin";
import SearchEditEmp from "../pages/SearchEmployee/SearchEditEmp";
import EditEmployee from "../pages/editEmployee/EditEmployee";
import ClinicList from "../pages/clinicList.js/ClinicList";
import EditClinic from "../pages/editClinic/EditClinic";
import AdminList from "../pages/adminList/adminList";
import EditAdmin from "../pages/editAdmin/EditAdmin";
import AdminTransaction from "../pages/adminTransaction/AdminTransaction";
import ClinicSearchEmp from "../pages/SearchEmployee/ClinicSearch";
import ClinicDisplayFamily from "../pages/ClinicDisplayEmployee/CllinicDisplayFamily";
import ClinicTransaction from "../pages/clinicTransaction/ClinicTransaction";
import AdminDisplayFamily from "../pages/DisplayEmployee/AdminDisplayFamily";
import AddFamily from "../pages/adminFamily/addFamily";
import EditFamily from "../pages/adminFamily/editFamily";
import CloseTransaction from "../pages/closeTransaction/closeTrans";
import EditTransaction from "../pages/adminTransaction/EditTransaction";
import ClinicReport from "../pages/ClinicReport/ClinicReport";


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    mcms_id: 0,
    userType: "",
    status: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  // const history = useHistory();

  Axios.defaults.withCredentials = true;

  const dataFunction = async () => {
    try{
      const data = await Axios
      .get("http://localhost:3001/auth")
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error)
          setIsLoading(false);
        } else {
          // console.log(response.data)
          setAuthState({
            username: response.data.username,
            mcms_id: response.data.id,
            userType: response.data.userType,
            status: true,
          });
          setIsLoading(false);
        }
      });
    }catch(e){
      console.log(e);
    }
  }
useEffect(() => {
  dataFunction();
  // Axios
  //   .get("http://localhost:3001/auth")
  //   .then((response) => {
  //     if (response.data.error) {
  //       console.log(response.data.error)
  //       setIsLoading(false);
  //     } else {
  //       setAuthState({
  //         username: response.data.username,
  //         mcms_id: response.data.id,
  //         userType: response.data.userType,
  //         status: true,
  //       });
  //       // setIsLoading(false);
  //       // console.log("Try auth")
  //       // console.log(authState);
  //       // console.log("Try auth")
  //       // console.log(response.data.username)

  //     }
  //   });
}, []);

const logout = () => {
  
  Axios.get("http://localhost:3001/logout").then((response)=>{

    setAuthState({
      username: "",
      mcms_id: "",
      userType: "",
      status: false,
    });
      // console.log(authState);
    
  })
};
// console.log("Try jap")
// console.log(authState);
const style= {
  width: "200px",
  height: "200px",
}
  return (
  <AuthContext.Provider value={{ authState, setAuthState }}>
  <Router>
    
    <Switch>

      <Route path="/" exact>
        <HomePage auth={authState}/>
      </Route>
      <LoginProtectedRoutes path="/login" auth={authState} component={Login}/>
      {/* <Route path="/main" exact component={Main}/> */}
      <React.Fragment>
      <TopNavbar logout={logout}/>
      <div className="appcontainer">
      <Sidebar auth={authState}/>
      
      {isLoading ? (
        <React.Fragment>
          <div className="my-auto mx-auto" style={style}>
            <Spinner  animation="border"/>
          </div>
        </React.Fragment>
        ): 
      (
        <React.Fragment>
          <AdminProtectedRoutes path="/main" auth={authState}  component={Main}/>
          <AdminProtectedRoutes path="/selectgrade" auth={authState} component={SelectGrade}/>
          <AdminProtectedRoutes path="/searchemployeetransaction" auth={authState} component={SearchEmployeeTransaction}/>
          <AdminProtectedRoutes path="/searcheditemployee" auth={authState} component={SearchEditEmp}/>          
          <AdminProtectedRoutes path="/addclinic" auth={authState} component={AddClinic}/>
          <AdminProtectedRoutes path="/addadmin" auth={authState} component={AddAdmin}/>
          <AdminProtectedRoutes path="/editentitlement/:grade" auth={authState} component={EditEntitlement}/>
          <AdminProtectedRoutes path="/employeemenu" auth={authState} component={EmployeeMenu}/>
          <AdminProtectedRoutes path="/addemployee" auth={authState} component={AddEmployee}/>
          <AdminProtectedRoutes path="/reportmenu" auth={authState} component={ReportMenu}/>
          <AdminProtectedRoutes path="/displayemployee/:tcNo" auth={authState}  component={DisplayEmployee}/>
          <AdminProtectedRoutes path="/displayfamily/:tcNo" auth={authState}  component={DisplayFamily}/>
          <AdminProtectedRoutes path="/addspouse/:tcNo" auth={authState} component={AddSpouse}/>
          <AdminProtectedRoutes path="/addchildren/:tcNo" auth={authState} component={AddChildren}/>
          <AdminProtectedRoutes path="/editspouse/:tcNo/:spouseId" auth={authState} component={EditSpouse}/>
          <AdminProtectedRoutes path="/editchild/:tcNo/:childId" auth={authState} component={EditChild}/>
          <AdminProtectedRoutes path="/EditEmployee/:tcNo" auth={authState} component={EditEmployee}/>
          <AdminProtectedRoutes path="/clinicmenu"  auth={authState} component={ClinicMenu}/>
          <AdminProtectedRoutes path="/ReportByClinic" auth={authState} component={ReportByClinic}/>
          <AdminProtectedRoutes path="/DisplayReportByClinic" auth={authState} component={DisplayReportByClinic}/>
          <AdminProtectedRoutes path="/ReportByDepartment" auth={authState} component={ReportByDept}/>
          <AdminProtectedRoutes path="/ReportByMedical" auth={authState} component={ReportByMed}/>
          <AdminProtectedRoutes path="/ClinicList" auth={authState} component={ClinicList}/>
          <AdminProtectedRoutes path="/EditClinic/:mcmsId" auth={authState} component={EditClinic}/>
          <AdminProtectedRoutes path="/AdminList" auth={authState} component={AdminList}/>
          <AdminProtectedRoutes path="/EditAdmin/:adminId" auth={authState} component={EditAdmin}/>
          <AdminProtectedRoutes path="/AdminTransaction/:tcNo" auth={authState} component={AdminTransaction}/>
          <AdminProtectedRoutes path="/AdminDisplayFamily/:tcNo" auth={authState} component={AdminDisplayFamily}/>
          <AdminProtectedRoutes path="/AddFamily/:tcNo" auth={authState} component={AddFamily}/>
          <AdminProtectedRoutes path="/EditFamily/:tcNo" auth={authState} component={EditFamily}/>
          <AdminProtectedRoutes path="/CloseTrans" auth={authState} component={CloseTransaction}/>
          <AdminProtectedRoutes path="/editTransaction/:tcNo/:trId" auth={authState} component={EditTransaction}/>

          <ClinicProtectedRoutes path="/transaction/:tcNo" auth={authState} component={Transaction}/>
          <ClinicProtectedRoutes path="/clinicmainmenu" auth={authState} component={ClinicMainMenu}/>
          <ClinicProtectedRoutes path="/clinicDisplayEmp/:tcNo" auth={authState} component={ClinicDisplayEmp}/>
          <ClinicProtectedRoutes path="/clinicSearchEmp" auth={authState} component={ClinicSearchEmp}/>
          <ClinicProtectedRoutes path="/clinicDisplayFamily/:tcNo" auth={authState} component={ClinicDisplayFamily}/>
          <ClinicProtectedRoutes path="/clinicTransaction/:tcNo" auth={authState} component={ClinicTransaction}/>
          <ClinicProtectedRoutes path="/clinicReport/" auth={authState} component={ClinicReport}/>
          
          
        </React.Fragment>
      )}
      </div>
      </React.Fragment>


          
      
    </Switch>
    
    
  </Router>
  </AuthContext.Provider>
  );
}

export default App;
