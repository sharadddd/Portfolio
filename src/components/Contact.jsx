import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiMessageSquare, FiSend } from 'react-icons/fi';
import emailjs from 'emailjs-com';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formData,
        'YOUR_USER_ID'
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setFormStatus(null), 3000);
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.section
      className="contact-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="contact-container">
        <motion.div
          className="contact-content"
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-description">
            Have a question or want to work together? Leave a message!
          </p>
          <div className="contact-info">
            <motion.div
              className="info-item"
              whileHover={{ scale: 1.05 }}
            >
              <FiMail className="info-icon" />
              <span>sharad868788@gmail.com</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="form-group">
            <motion.div
              className="input-container"
              variants={inputVariants}
              whileFocus="focus"
            >
              <FiUser className="input-icon" />
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <div className="input-border" />
            </motion.div>
          </div>

          <div className="form-group">
            <motion.div
              className="input-container"
              variants={inputVariants}
              whileFocus="focus"
            >
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <div className="input-border" />
            </motion.div>
          </div>

          <div className="form-group">
            <motion.div
              className="input-container"
              variants={inputVariants}
              whileFocus="focus"
            >
              <FiMessageSquare className="input-icon" />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <div className="input-border" />
            </motion.div>
          </div>

          <motion.button
            className="submit-button"
            type="submit"
            disabled={isSubmitting}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            <FiSend className="button-icon" />
          </motion.button>

          {formStatus && (
            <motion.div
              className={`form-status ${formStatus}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {formStatus === 'success' ?
                'Message sent successfully!' :
                'Error sending message. Please try again.'}
            </motion.div>
          )}
        </motion.form>
      </div>

      {/* 3D decorative elements */}
      <div className="decoration-container">
        <motion.div
          className="floating-cube"
          animate={{
            y: [0, 20, 0],
            rotateY: [0, 360],
            rotateX: [0, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="floating-sphere"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.section>
  );
};

export default Contact; 