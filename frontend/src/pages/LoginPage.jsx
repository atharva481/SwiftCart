import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isCustomer, setIsCustomer] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    address: "",
    password: "", // for admin login
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { loginCustomer, loginAdmin } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let success;
      if (isCustomer) {
        success = await loginCustomer(formData.username);
      } else {
        success = await loginAdmin({
          username: formData.username,
          password: formData.password,
        });
      }

      if (success) {
        toast.success(isCustomer ? "Registration successful" : "Login successful");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-base-content">
            {isCustomer ? "Customer Registration" : "Admin Login"}
          </h2>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`btn ${isCustomer ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setIsCustomer(true)}
          >
            Login as Customer
          </button>
          <button
            className={`btn ${!isCustomer ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setIsCustomer(false)}
          >
            Login as Admin
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {isCustomer ? (
              <>
                <div>
                  <input
                    type="text"
                    name="first_name"
                    required
                    className="input input-bordered w-full"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="last_name"
                    required
                    className="input input-bordered w-full"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="input input-bordered w-full"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <textarea
                    name="address"
                    required
                    className="textarea textarea-bordered w-full"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            ) : null}
            <div>
              <input
                type="text"
                name="username"
                required
                className="input input-bordered w-full"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            {!isCustomer && (
              <div>
                <input
                  type="password"
                  name="password"
                  required
                  className="input input-bordered w-full"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full">
              {isCustomer ? "Register" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;