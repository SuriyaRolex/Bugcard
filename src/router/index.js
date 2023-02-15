import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRoutes } from "./routes";
import PrivateRouter from "./privateRouter";

import {
  NotFound,
  Projects,
  ProjectInstances,
  Login, 
  SignUp, 
  ForgotPassword,
  InstanceDetail, 
  Application, 
  ErrorLog,
  DASTReport,
  BDDReport,
  PerformanceReport,
  SASTReport,
  
} from './../screens';


const RouterApp = (props) => {

  return (
    <BrowserRouter>
      <Routes>

        {/* Home Route */}
        <Route path={AppRoutes.home} element={
          <PrivateRouter path={AppRoutes.home}>
            <Projects />
          </PrivateRouter>
        } />

        {/* Login Route */}
        <Route path={AppRoutes.login} element={<Login />} />

        {/* SignUp Route */}
        <Route path={AppRoutes.signUp} element={<SignUp />} />

        {/* Forgotpassword Route */}

        <Route path={AppRoutes.forgotPassword} element={<ForgotPassword />} />


        {/* Projects Route */}
        <Route path={AppRoutes.projects} element={
          <PrivateRouter path={AppRoutes.projects}>
            <Projects />
          </PrivateRouter>
        } />

        {/* Projects Instances Route */}
        <Route path={AppRoutes.projectInstances} element={
          <PrivateRouter path={AppRoutes.projectInstances}>
            <ProjectInstances />
          </PrivateRouter>
        } />

        {/* Instance Detail Route */}
        <Route path={AppRoutes.projectInstanceDetail} element={
          <PrivateRouter path={AppRoutes.projectInstanceDetail}>
            <InstanceDetail />
          </PrivateRouter>
        } />

        {/* Application Route */}
        <Route path={AppRoutes.application} element={
          <PrivateRouter path={AppRoutes.application}>
           <Application/>
          </PrivateRouter>
        } />

       {/* Performance_Test_Report */}
       <Route path={AppRoutes.Performance_Test_Report} element={
          <PrivateRouter path={AppRoutes.Performance_Test_Report}>
            <PerformanceReport/>
          </PrivateRouter>
        } />
        

        {/* ErrorLog Route */}
        <Route path={AppRoutes.applicationlog} element={
          <PrivateRouter path={AppRoutes.applicationlog}>
            <ErrorLog/>
          </PrivateRouter>
        } />

        {/* DASTReport Route */}
        <Route path={AppRoutes.DASTReport} element={
          <PrivateRouter path={AppRoutes.DASTReport}>
            <DASTReport/>
          </PrivateRouter>
        } />

        {/* BDDReport Route */}
        <Route path={AppRoutes.BDDReport} element={
          <PrivateRouter path={AppRoutes.BDDReport}>
            <BDDReport/>
          </PrivateRouter>
        } />

        {/* SASTReport Route */}
        <Route path={AppRoutes.SASTReport} element={
          <PrivateRouter path={AppRoutes.SASTReport}>
            <SASTReport/>
          </PrivateRouter>
        } />


        {/* For unknow/non-defined path */}
        <Route path="*" element={<NotFound />} />

        {/* addProject */}

      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
