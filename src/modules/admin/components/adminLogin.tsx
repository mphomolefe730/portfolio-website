import { useEffect, useState } from "react";
import { env } from "../../../configs/environment";
import bcrypt from 'bcryptjs';
import Papa from 'papaparse';
import './adminLogin.css';
import './adminLogin.css';

const creditList = env.GOOGLE_DRIVE_USER;

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const LOADER_LENGTH = 15;
  const [position, setPosition] = useState(0);
  const loadingIndicator = Array.from({ length: LOADER_LENGTH }, (_, index) => index === position ? "|" : "=").join("");

  useEffect(() => {
    if (!isSubmitting) return;

    const interval = setInterval(() => {
      setPosition(prev => (prev + 1) % LOADER_LENGTH);
    }, 250);
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const validateUserPassword = async (userPassword: string, enteredPassword: string) => {
    const isMatch = await bcrypt.compare(enteredPassword, userPassword);
    return isMatch;
  }

  const validateUser = async (username: string, password: string) => {
    setIsSubmitting(true);
    setErrorMessage([]);
    try {
      const response = await fetch(creditList);
      const csvData = await response.text();

      const parsedUsers = Papa.parse<Record<string, string>>(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;

      const currentUser = parsedUsers.find(
        (user) => user.Username?.trim() === username?.trim()
      );

      if (!currentUser) {
        console.warn(`User "${username}" not found.`);
        setErrorMessage((prev) => [...prev, `User "${username}" not found.`]);
        setIsSubmitting(false);
        return;
      }
      const isMatch = await validateUserPassword(currentUser.PasswordHash, password);
      if (isMatch) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUserId', currentUser.UserID || '');
        if (currentUser.Username == env.SUPER_USER_ID) {
          sessionStorage.setItem('isAuthenticated', 'true');
        }
        window.location.href = '/admin';
      } else {
        console.warn("Invalid password.");
        setErrorMessage((prev) => [...prev, "Invalid password."]);
      }
    } catch (error) {
      console.error("Error validating user:", error);
      setErrorMessage((prev) => [...prev, "Error validating user."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='adminLoginContainer'>
      <div style={{ display: isSubmitting ? 'block' : 'none', margin: "auto", maxWidth: "600px", textAlign: "center", position: 'relative', height: "50svh" }}>
        <h1> {loadingIndicator} </h1>
        <p className="company_name">VALIDATING...</p>
      </div>

      <div style={{ display: isSubmitting ? 'none' : 'block' }}>
        <div className='adminLoginHeader'>
          <h1 className='company_name'>ADMIN ACCESS</h1>
          <p>Restricted area — authorized users only</p>
        </div>

        <form
          className='childGrown'
          onSubmit={(e) => {
            e.preventDefault();
            validateUser(username, password);
          }}
        >
          <div className='adminLoginField'>
            <label>Admin Username</label>
            <input
              className='inputTag'
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='adminLoginField'>
            <label>Admin Password</label>
            <input
              className='inputTag'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage.length > 0 && (
            <div className="adminLoginErrors">
              {errorMessage.map((msg, index) => (
                <p key={index} className='error'>{msg}</p>
              ))}
            </div>
          )}

          <button className='contactButton' type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;