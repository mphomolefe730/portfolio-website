import './contact.css';
import { useState } from 'react';

interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    whoAreYou?: string;
}
  
function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [whoAreYou, setWhoAreYou] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const heroCaption = 'Let’s Connect!';
  const heroSubCaption = 'I’d love to hear from you—whether you have a question, a project, or just want to say hi. Looking for a creative partner? I’m just a message away. Fill out the form below or email me directly';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors:Errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!whoAreYou) {
      newErrors.whoAreYou = "Please select who you are";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Form is valid - handle submission
      alert(`Thank you, ${firstName}! We'll be in touch.`);
      // Reset form or send data to server here
    }
  };

  return (
    <div className='contactContainer'>
      <h1 className="card-text m-0">{heroCaption.toUpperCase()}</h1>
      <p className="text-muted">
        {heroSubCaption}
        <a style={{ textDecoration: 'underline' }} href="mailto:mphomolefe730@gmail.com"> click here </a>
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            className='inputTag'
            type="text"
            id="firstName"
            value={firstName}
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <input
            className='inputTag'
            type="text"
            id="lastName"
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}

          <input
            className='inputTag'
            type="email"
            id="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          
          <h5 style={{marginTop: '5%'}}>{('Who are you?').toUpperCase()}</h5>
          <div className='widget-radio-group'>
            <div>
              <input
                type="radio"
                id="individual"
                name="whoAreYou"
                value="Individual"
                checked={whoAreYou === "Individual"}
                onChange={() => setWhoAreYou("Individual")}
              />
              <label htmlFor="individual" className={`widget-option${whoAreYou === "Individual" ? " selected" : ""}`}>
                <span>{('Individual').toUpperCase()}</span>
                <span>
                  <p className="text-muted">I am an individual seeking contact with you</p>
                </span>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="organisation"
                name="whoAreYou"
                value="Organisation"
                checked={whoAreYou === "Organisation"}
                onChange={() => setWhoAreYou("Organisation")}
              />
              <label htmlFor="organisation" className={`widget-option${whoAreYou === "Organisation" ? " selected" : ""}`}>
                <span>{('Organisation').toUpperCase()}</span>
                <span>
                  <p className="text-muted">I am a member of an organisation seeking contact with you</p>
                </span>
              </label>
            </div>
          </div>
          {errors.whoAreYou && <p className="error">{errors.whoAreYou}</p>}
        </div>
        <button className='contactButton' type="submit">{('GET IN TOUCH').toUpperCase()}</button>
      </form>
    </div>
  );
}

export default Contact;
