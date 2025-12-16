import './contact.css';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { env } from '../../../configs/environment';

interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    whoAreYou?: string;
    message?: string;
}
  
function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [whoAreYou, setWhoAreYou] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const heroCaption = 'Let’s Connect!';
  const heroSubCaption = 'I’d love to hear from you—whether you have a question, a project, or just want to say hi. Looking for a creative partner? I’m just a message away. Fill out the form below or email me';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    setIsSubmitting(true);
    const newErrors:Errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!message.trim()) {
      newErrors.message = "Message is required";
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
      emailjs.sendForm(
        env.VITE_EMAILJS_SERVICE_ID, 
        env.VITE_EMAILJS_TEMPLATE_ID, 
        e.target, 
        env.VITE_EMAILJS_PUBLIC_KEY
      ).then((result) => {
        console.log('Success!', result.text);
        setIsSubmitting(false);
        alert(`Thank you, ${firstName}! We'll be in touch.`);
      }, (error) => {
        console.log('Failed...', error.text);
        setIsSubmitting(false);
        alert("Something went wrong, please try again.");
      });
    }else{
      setIsSubmitting(false);
    }
  };

  return (
    <div className='contactContainer'>
      <h1 className="card-text m-0">{heroCaption.toUpperCase()}</h1>
      <p className="text-muted">
        {heroSubCaption}
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            className='inputTag'
            type="text"
            name="user_firstName"
            value={firstName}
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <input
            className='inputTag'
            type="text"
            name="user_lastName"
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}

          <input
            className='inputTag'
            type="email"
            name="email"
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
          
          <input
            className='inputTag'
            type="text"
            name="message"
            value={message}
            placeholder='message'
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <button className='contactButton' style={{ display: isSubmitting ? 'none' : 'block' }} type="submit">{('GET IN TOUCH').toUpperCase()}</button>
        <p style={{ display: isSubmitting ? 'block' : 'none' }}>processing...</p>
      </form>
    </div>
  );
}

export default Contact;
