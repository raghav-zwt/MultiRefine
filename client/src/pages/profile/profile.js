import React, { useState } from 'react'
import Layout from "../../layouts/layout.js";
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

const ProfilePage = () => {

  const auth = JSON.parse(localStorage.getItem("auth"));
  const UserId = auth[0].id;
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChange = async (e) => {
    e.preventDefault();

    try {
      if (newPassword === confirmPassword) {
        const data = await axios.put(`${process.env.REACT_APP_API_URL}/api/profile/update/${UserId}`, {
          NewPassword: newPassword,
          OldPassword: oldPassword,
          ConfirmPassword: confirmPassword
        });

        if (data?.data?.success) {
          toast.success(data?.data?.message)
        }
      } else {
        toast.error("new password & confirm password not match");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error)
    }
  }

  return (
    <>
      <Layout title={""} description={""}>
        <div className="page-breadcrumb bg-white">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">Profile page</h4>
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              <div className="d-flex gap-3 justify-content-end ms-auto">
                <Link to={"/site"} className="btn btn-primary fw-normal">Create Filter</Link>
                <Link to={"/"} className="btn btn-primary fw-normal">Dashboard</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-xlg-6 col-md-12">
              <div className="white-box justify-content-center h-100 card">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0"><b>first name</b> - {auth[0].first_name}</li>
                  <li className="list-group-item px-0"><b>last name</b> - {auth[0].last_name}</li>
                  <li className="list-group-item px-0"><b>email</b> - {auth[0].email}</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12 col-xlg-6 col-md-12">
              <div className="white-box justify-content-center h-100 card">
                <form className="form-horizontal form-material" method='post' onSubmit={passwordChange}>
                  <div className="form-group mb-4">
                    <label htmlFor="OldPassword" className="col-md-12 p-0">Old Password</label>
                    <div className="col-md-12 border-bottom p-0">
                      <input
                        type="text"
                        name="OldPassword"
                        onChange={(e) => {
                          setOldPassword(e.target.value)
                        }}
                        required
                        placeholder="Old Password"
                        className="form-control p-0 border-0"
                      />
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="NewPassword" className="col-md-12 p-0">New Password</label>
                    <div className="col-md-12 border-bottom p-0">
                      <input
                        type="text"
                        placeholder="New Password"
                        name="NewPassword"
                        required
                        onChange={(e) => {
                          setNewPassword(e.target.value)
                        }}
                        className="form-control p-0 border-0"
                      />
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="ConfirmPassword" className="col-md-12 p-0">Confirm Password</label>
                    <div className="col-md-12 border-bottom p-0">
                      <input
                        type="text"
                        placeholder="Confirm Password"
                        name="ConfirmPassword"
                        required
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                        }}
                        className="form-control p-0 border-0"
                      />
                    </div>
                  </div>
                  <div className="form-group mb-0">
                    <div className="col-sm-12">
                      <button type='submit' className="btn btn-success">Update Password</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ProfilePage
