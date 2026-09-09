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
  const [hashedPassword, setHashedPassword] = useState("");
  const [generatedHashedPassword, setGeneratedHashedPassword] = useState("");
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

  const hashingOfPassword = async (userPassword: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(userPassword, salt);
  };

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

        <div className='adminLoginDivider'>
          <span>Utility</span>
        </div>

        <div className='adminLoginUtility informationPill childGrown'>
          <h5 className='company_name'>Onboarding</h5>
          <a className='contactButton' href='/onboarding'>Get Started</a>  
        </div>
        
        <br/>
        
        <div className='adminLoginUtility informationPill childGrown'>
          <h5 className='company_name'>Password Hasher</h5>
          <input
            className='inputTag'
            type="text"
            placeholder="Enter password to hash"
            value={hashedPassword}
            onChange={(e) => setHashedPassword(e.target.value)}
          />
          <p className='adminLoginUtilityNote'>
            Note: password hashing adds a layer of security to protect user credentials. This function generates a hashed version of the password, which can be stored securely in the database instead of the plain text password. Only for Mpho's use, do not share the hashed password with anyone else.
          </p>
          {generatedHashedPassword && (
            <a
              href={`https://wa.me/${env.PHONE_NUMBER}?text=${encodeURIComponent(
                `Generated Hashed Password: ${generatedHashedPassword}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={async () => {
                await navigator.clipboard.writeText(generatedHashedPassword);
                alert("Copied to clipboard! Opening WhatsApp...");
              }}
            >
              <h5>Generated Hashed Password:</h5>
              <p>{generatedHashedPassword}</p>
            </a>
          )}
          <button
            className='contactButton'
            type="button"
            onClick={async () => {
              const hash = await hashingOfPassword(hashedPassword);
              setGeneratedHashedPassword(hash);
            }}
          >
            HASH PASSWORD
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;