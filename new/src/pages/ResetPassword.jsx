import "../styles/ResetPassword.css";
import { useState } from "react";
import logo from "../assets/images/logo.png";
/*import burger from "../assets/images/burger.png";
import pasta from "../assets/images/pasta.png";*/

import { FaLock } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";

export default function ResetPassword() {
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        return {
            text: "Weak",
            level: 1
        };
    }

    if (score <= 4) {
        return {
            text: "Medium",
            level: 2
        };
    }

    return {
        text: "Strong",
        level: 3
    };
};
const strength = getPasswordStrength(password);

const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    match:
        password !== "" &&
        password === confirmPassword
};
    return (

        <section className="reset-page">

            {/*<img src={burger} className="burger-img" />
            <img src={pasta} className="pasta-img" />*/}

            <div className="reset-card">

                <img
                    src={logo}
                    className="reset-logo"
                />

                <div className="lock-circle">

                    🔒

                </div>

                <h1>

                    Reset Your Password

                </h1>

                <p>

                    Enter a new password for your account.
                    <br />
                    Make sure it's strong and secure.

                </p>

                <label>

                    New Password

                </label>

                <div className="input-box">

                    <FaLock />

                    <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter new password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
/>

                   <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
>
    <IoEyeOutline />
</span>

                </div>

                <label>

                    Confirm Password

                </label>

                <div className="input-box">

                    <FaLock />
<input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm new password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
/>
<span
    className="eye-icon"
    onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
    }
>
    <IoEyeOutline />
</span>

                </div>

               <div className="strength">

    <div className="strength-header">
        <h4>Password Strength</h4>

        <span className={`strength-text ${strength.text.toLowerCase()}`}>
            {strength.text}
        </span>
    </div>

    <div className="strength-bars">
        <span className={strength.level >= 1 ? "active" : ""}></span>
        <span className={strength.level >= 2 ? "active" : ""}></span>
        <span className={strength.level >= 3 ? "active" : ""}></span>
    </div>

</div>

<div className="rules">

    <p className={validations.length ? "valid" : "invalid"}>
        {validations.length ? "✔" : "✖"} Minimum 8 characters
    </p>

    <p className={validations.uppercase ? "valid" : "invalid"}>
        {validations.uppercase ? "✔" : "✖"} One uppercase letter
    </p>

    <p className={validations.lowercase ? "valid" : "invalid"}>
        {validations.lowercase ? "✔" : "✖"} One lowercase letter
    </p>

    <p className={validations.number ? "valid" : "invalid"}>
        {validations.number ? "✔" : "✖"} One number
    </p>

    <p className={validations.special ? "valid" : "invalid"}>
        {validations.special ? "✔" : "✖"} One special character
    </p>

    <p className={validations.match ? "valid" : "invalid"}>
        {validations.match ? "✔" : "✖"} Passwords match
    </p>

</div>

<button className="reset-btn">
    Reset Password
</button>

<div className="back">
    <IoArrowBackOutline />
    Back to Login
</div>

</div>   {/* reset-card */}

</section>
          

       

    );

}