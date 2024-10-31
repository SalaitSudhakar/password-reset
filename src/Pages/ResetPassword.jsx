import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { id, resetToken } = useParams();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${id}/${resetToken}`,
        { password }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please Try again later."
      );
    }
  };

  return (
    <div className="forgot-page-card card text-light rounded-4 pb-4 ">
      <h3 className="text-center pt-4 pb-3 shadow-lg fw-bolder text-capitalize">
        Reset Password
      </h3>
      <form onSubmit={handleSubmit} className="text-black ">
        <div className="form-floating m-md-4 d-flex m-2 mb-4 position-relative align-items-center justify-items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="password"
            className="form-control px-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>

          <button
            type="button"
            className="border-0 bg-transparent position-absolute end-0 me-2 text-primary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash size={"25px"} />
            ) : (
              <FaEye size={"25px"} />
            )}
          </button>
        </div>

        <button type="submit" className="btn btn-primary text-light border-0 rounded-3 shadow-lg fw-bold px-4 py-2">Update Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
