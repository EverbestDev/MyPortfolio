import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, MapPin } from "lucide-react";

// --- CONFIGURATION DATA & STYLES ---
const NEON_CYAN = "#00ffff";
const NEON_PURPLE = "#a855f7";
const DARK_BG = "#080812";

// Custom Button Component (Acting as a React Bits component)
// Uses Framer Motion for the premium hover effect
const Button = ({ children, onClick, className = "" }) => (
  <motion.button
    type="submit"
    onClick={onClick}
    className={`relative flex items-center justify-center font-bold tracking-wider uppercase px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 ${className}`}
    style={{
      backgroundColor: NEON_CYAN,
      color: DARK_BG,
      boxShadow: `0 0 10px ${NEON_CYAN}40`,
    }}
    whileHover={{
      scale: 1.05,
      boxShadow: `0 0 25px ${NEON_CYAN}80, 0 0 10px ${NEON_PURPLE}80`,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
    <motion.span
      className="absolute inset-0 z-0"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
      }}
    />
  </motion.button>
);

// Custom Input Component (Styled for Scifi Terminal Look)
const TerminalInput = ({ id, label, type = "text", required = false }) => {
  return (
    <motion.div className="relative z-0 group mb-8">
      <input
        type={type}
        id={id}
        required={required}
        className="block w-full px-0 pt-3 pb-2 text-sm text-gray-100 bg-transparent border-0 border-b-2 appearance-none focus:outline-none peer"
        style={{
          borderColor: "#3a3a5a", // Muted base color
          color: NEON_CYAN, // Text input color
        }}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-neon-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {/* Scifi focus line effect */}
      <motion.div
        className="absolute left-0 bottom-0 w-full h-0.5 transform origin-left"
        style={{
          backgroundColor: NEON_CYAN,
          boxShadow: `0 0 8px ${NEON_CYAN}`,
        }}
        initial={{ scaleX: 0 }}
        whileFocus={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Custom TextArea Component
const TerminalTextArea = ({ id, label, required = false }) => {
  return (
    <motion.div className="relative z-0 group mb-8">
      <textarea
        id={id}
        rows="4"
        required={required}
        className="block w-full px-0 pt-3 pb-2 text-sm text-gray-100 bg-transparent border-0 border-b-2 appearance-none focus:outline-none peer resize-none"
        style={{
          borderColor: "#3a3a5a",
          color: NEON_CYAN,
        }}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-neon-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {/* Scifi focus line effect */}
      <motion.div
        className="absolute left-0 bottom-0 w-full h-0.5 transform origin-left"
        style={{
          backgroundColor: NEON_CYAN,
          boxShadow: `0 0 8px ${NEON_CYAN}`,
        }}
        initial={{ scaleX: 0 }}
        whileFocus={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// --- MAIN CONTACT COMPONENT ---

const Contact = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send data to an API endpoint here
    // For demonstration, we simulate success
    setStatus("success");
    setTimeout(() => setStatus(null), 3000);
    e.target.reset(); // Clear the form
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: DARK_BG, color: "white" }}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className="text-lg font-medium tracking-widest uppercase mb-2"
            style={{ color: NEON_CYAN }}
          >
            Secure Data Uplink
          </h3>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-100">
            Connect with Me
          </h2>
        </motion.div>

        <div className="flex flex-wrap lg:flex-nowrap gap-12">
          {/* Contact Info (Left Column) */}
          <div className="w-full lg:w-1/3">
            <motion.div
              className="p-8 rounded-xl border border-neon-purple/50 shadow-lg"
              style={{
                backgroundColor: "#10101c",
                boxShadow: `0 0 20px ${NEON_PURPLE}20`,
              }}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: NEON_CYAN }}
              >
                Direct Comms Channel
              </h3>
              <div className="space-y-6 text-gray-300">
                <p className="flex items-start">
                  <Mail
                    size={24}
                    style={{ color: NEON_CYAN }}
                    className="mr-4 mt-1 flex-shrink-0"
                  />
                  <span className="break-words">
                    Feel free to send a direct email regarding job
                    opportunities, collaborations, or just a quick chat!
                    <br />
                    <a
                      href="mailto:your.email@example.com"
                      className="font-semibold hover:text-neon-cyan transition duration-200"
                    >
                      your.email@example.com
                    </a>
                  </span>
                </p>
                <p className="flex items-start">
                  <MapPin
                    size={24}
                    style={{ color: NEON_CYAN }}
                    className="mr-4 mt-1 flex-shrink-0"
                  />
                  <span>
                    Currently Operating from Earth Sector:
                    <br />
                    Dubai, UAE (Global Remote Access Enabled)
                  </span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="w-full lg:w-2/3">
            <motion.form
              onSubmit={handleSubmit}
              className="p-8 rounded-xl border border-neon-cyan/50 shadow-lg"
              style={{
                backgroundColor: "#10101c",
                boxShadow: `0 0 20px ${NEON_CYAN}20`,
              }}
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <TerminalInput id="name" label="Full Name" required />
                <TerminalInput
                  id="email"
                  label="Email Address"
                  type="email"
                  required
                />
              </div>
              <TerminalInput id="subject" label="Subject Line" />
              <TerminalTextArea
                id="message"
                label="Your Message / Data Packet"
                required
              />

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 text-center rounded-lg font-semibold"
                  style={{
                    backgroundColor: NEON_CYAN + "30",
                    color: NEON_CYAN,
                  }}
                >
                  Message Sent! Acknowledging receipt of data packet.
                </motion.div>
              ) : (
                <div className="flex justify-end mt-6">
                  <Button className="w-full sm:w-auto">
                    <Send size={20} className="mr-2" />
                    Transmit Message
                  </Button>
                </div>
              )}
            </motion.form>
          </div>
        </div>
      </div>

      {/* Scifi Background Dots/Flare */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-neon-cyan opacity-10 blur-3xl rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
    </section>
  );
};

export default Contact;
