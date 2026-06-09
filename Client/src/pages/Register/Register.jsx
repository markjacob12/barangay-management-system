import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Logo from "../../assets/Logo/Logo.png";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    middleName: "",
  });

  // System Message Notification States
  const [systemMessage, setSystemMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSystemMessage({ type: "", text: "" });
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        registerForm,
      );

      setSystemMessage({
        type: "success",
        text: "Mabuhay! Matagumpay na nairerehistro ang iyong account.",
      });

      // Sandaling delay para makita ng user ang tagumpay na abiso bago mag-redirect
      setTimeout(() => {
        navigate("/HomeUser");
      }, 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "May naganap na kamalian sa pagproseso.";
      setSystemMessage({
        type: "error",
        text: errorMessage,
      });
      setIsSubmitting(false);
    }

    // Nire-reset lamang ang form field kung hindi nagtagumpay upang hindi masayang ang tinype ng user
    if (systemMessage.type !== "success") {
      setRegisterForm({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        middleName: "",
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Government Institutional Header */}
        <div className="register-header">
          <img src={Logo} alt="PAPA Barangay Logo" className="reg-logo" />
          <h2>Maging Kasapi ng PAPA BARANGAY</h2>
          <span className="gov-badge-sub">
            OPISYAL NA PORTAL NG REGISTRASYON
          </span>
          <p className="register-instruction">
            Kumpletuhin ang mga personal na impormasyon sa ibaba upang
            makapagrehistro ng account sa sistema.
          </p>
        </div>

        {/* Dynamic System Status Feedbacks */}
        {systemMessage.text && (
          <div className={`system-status-banner ${systemMessage.type}`}>
            <span className="status-icon">
              {systemMessage.type === "success" ? "✓" : "⚠"}
            </span>
            <p>{systemMessage.text}</p>
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Column 1: Akawnt Kredensyal */}
            <div className="form-column">
              <div className="column-title-segment">Impormasyon ng Account</div>

              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  required
                  placeholder="Gumawa ng username"
                  value={registerForm.username}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      username: e.target.value,
                    })
                  }
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. juandelacruz@email.com"
                  value={registerForm.email || ""}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                  }
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  required
                  placeholder="Gumawa ng ligtas na password"
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Column 2: Personal na Detalye */}
            <div className="form-column">
              <div className="column-title-segment">Personal na Detalye</div>

              <div className="input-group">
                <label>First Name (Pangalan)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Juan"
                  value={registerForm.firstName}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="input-group">
                <label>Middle Name (Gitnang Pangalan)</label>
                <input
                  type="text"
                  placeholder="Iwanang bakante kung walang gitnang pangalan"
                  value={registerForm.middleName}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      middleName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="input-group">
                <label>Last Name (Apelyido)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dela Cruz"
                  value={registerForm.lastName}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Action Footer Frame */}
          <div className="register-footer">
            <button
              type="submit"
              className="register-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Inirerehistro..."
                : "Isumite at Lumikha ng Account"}
            </button>
            <p className="login-redirect-text">
              Mayroon ka na bang account? <a href="/login">Mag-login dito</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
