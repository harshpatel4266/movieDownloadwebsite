import React, { useState } from 'react';
import "./ContactUs.css"


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    // Simulate an API call
    setTimeout(() => {
      console.log('Form Submitted:', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
<>  

      <div  className='contactus'>
             
      <h2>Contact Us</h2>
      <p>We'd love to hear from you. Please fill out the form below.</p>
      
      <form onSubmit={handleSubmit} style={styles.form} >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
      
      {status && <p style={styles.status}>{status}</p>}
   
    </div>
  
    </>

  

     

   
  );
};

// Basic Styles
const styles = {
  container: { maxWidth: '600px', margin: '50px auto', padding: '20px', textAlign: 'center', fontFamily: 'Arial' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' },
  textarea: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px', minHeight: '150px' },
  button: { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
  status: { marginTop: '15px', fontWeight: 'bold', color: '#28a745' }
};

export default ContactPage;