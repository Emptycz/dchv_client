import { Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import React from 'react';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Records from '../Pages/Records/Records';
import AddRecord from '../Pages/AddRecord/AddRecord';
import Users from '../Pages/Users/Users';
import AddUser from '../Pages/AddUser/AddUser';
import Profile from '../Pages/Profile/Profile';
import User from '../Pages/User/User';
import Record from '../Pages/Record/Record';
import Groups from '../Pages/Groups/Groups';
import Group from '../Pages/Group/Group';
import Registration from '../Pages/Registration/Registration';
import ProtectedRoute from './ProtectedRoute';
import AddGroup from '../Pages/AddGroup/AddGroup';

const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
      <Route path="/records/add" element={<ProtectedRoute><AddRecord /></ProtectedRoute>} />
      <Route path="/record/:recordId" element={<ProtectedRoute><Record /></ProtectedRoute>} />

      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/users/add" element={<ProtectedRoute><AddUser /></ProtectedRoute> } />
      <Route path="/user/:loginId" element={<ProtectedRoute><User /></ProtectedRoute>} />

      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
      <Route path="/groups/add" element={<ProtectedRoute><AddGroup /></ProtectedRoute>} />
      <Route path="/group/:groupId" element={<ProtectedRoute><Group /></ProtectedRoute>} />
    </Routes>
  );
};

export default Paths;