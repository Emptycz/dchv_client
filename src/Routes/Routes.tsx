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

const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/records" element={<Records />} />
      <Route path="/records/add" element={<AddRecord />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/add" element={<AddUser /> } />
      <Route path="/user/:loginId" element={<User />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Paths;