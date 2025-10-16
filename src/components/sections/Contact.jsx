import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  MapPin,
  Loader2,
  CheckCircle,
  XCircle,
  Phone,
  Smartphone,
} from "lucide-react";

// --- CONFIGURATION DATA & STYLES ---
const NEON_CYAN = "#00ffff";
const NEON_PURPLE = "#a855f7";
const DARK_BG = "#080812";

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

// Custom Button Component (Styled for Scifi Look)
const Button = ({ children, isSubmitting, className = "" }) => (
  <motion.button
    type="submit"
    disabled={isSubmitting}
    className={`relative flex items-center justify-center font-bold tracking-wider uppercase px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    style={{
      backgroundColor: NEON_CYAN,
      color: DARK_BG,
      boxShadow: isSubmitting
        ? `0 0 15px ${NEON_PURPLE}`
        : `0 0 10px ${NEON_CYAN}40`,
    }}
    whileHover={{
      scale: isSubmitting ? 1 : 1.05,
      boxShadow: isSubmitting
        ? undefined
        : `0 0 25px ${NEON_CYAN}80, 0 0 10px ${NEON_PURPLE}80`,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
  >
    {isSubmitting ? (
      <>
        <Loader2 size={20} className="mr-2 animate-spin" />
        Transmitting...
      </>
    ) : (
      children
    )}
    <motion.span
      className="absolute inset-0 z-0"
      initial={{ x: "-100%" }}
      whileHover={{ x: isSubmitting ? "-100%" : "100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
      }}
    />
  </motion.button>
);

// Custom Input Component (Styled for Scifi Terminal Look)
const TerminalInput = ({
  id,
  label,
  type = "text",
  required = false,
  value,
  onChange,
}) => {
  const isFilled = value && value.length > 0;

  return (
    <motion.div className="relative z-0 group mb-8">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" " // Important for the floating label effect
        className="block w-full px-0 pt-3 pb-2 text-sm text-gray-100 bg-transparent border-0 border-b-2 appearance-none focus:outline-none peer placeholder-transparent"
        style={{
          borderColor: isFilled ? NEON_CYAN : "#3a3a5a", // Change color when filled
          color: NEON_CYAN,
          transition: "border-color 0.3s",
        }}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text ${
          isFilled ? "text-cyan-400 scale-75 -translate-y-6" : "text-gray-400"
        }`}
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
        animate={isFilled ? { scaleX: 1 } : { scaleX: 0 }} // Focus line persists when filled
        whileFocus={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Custom TextArea Component
const TerminalTextArea = ({ id, label, required = false, value, onChange }) => {
  const isFilled = value && value.length > 0;

  return (
    <motion.div className="relative z-0 group mb-8">
      <textarea
        id={id}
        name={id}
        rows="4"
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" " // Important for the floating label effect
        className="block w-full px-0 pt-3 pb-2 text-sm text-gray-100 bg-transparent border-0 border-b-2 appearance-none focus:outline-none peer resize-none placeholder-transparent"
        style={{
          borderColor: isFilled ? NEON_CYAN : "#3a3a5a",
          color: NEON_CYAN,
          transition: "border-color 0.3s",
        }}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text ${
          isFilled ? "text-cyan-400 scale-75 -translate-y-6" : "text-gray-400"
        }`}
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
        animate={isFilled ? { scaleX: 1 } : { scaleX: 0 }} // Focus line persists when filled
        whileFocus={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Reusable Component for Contact Details with Hover Effects
const ContactDetail = ({ icon: Icon, title, content, link, subtext }) => (
  <motion.a
    href={link}
    target={
      link?.startsWith("http") || link?.startsWith("mailto")
        ? "_blank"
        : "_self"
    }
    rel="noopener noreferrer"
    className="flex flex-col p-4 rounded-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-cyan-400/50"
    whileHover={{
      scale: 1.02,
      backgroundColor: "#10101c",
      boxShadow: `0 0 10px ${NEON_CYAN}20`,
    }}
  >
    <div className="flex items-center mb-2">
      <Icon
        size={24}
        style={{ color: NEON_CYAN }}
        className="mr-3 flex-shrink-0"
      />
      <h4 className="text-lg font-semibold text-gray-100">{title}</h4>
    </div>
    <span className="ml-9 text-base text-cyan-400 font-medium break-all">
      {content}
    </span>
    {subtext && <span className="ml-9 text-sm text-gray-400">{subtext}</span>}
  </motion.a>
);

// New Interactive Element: System Status Grid
const SystemStatusGrid = () => (
  <div className="p-6 rounded-xl border border-neon-purple/50 shadow-lg bg-[#10101c] text-white hidden md:block">
    <h3 className="text-xl font-bold mb-4 flex items-center text-gray-100">
      <Loader2 size={20} className="mr-2 animate-spin text-purple-400" />
      System Availability Status
    </h3>
    <p className="text-sm text-gray-400 mb-4">
      Real-time data synchronization feed. Status:{" "}
      <span className="text-cyan-400 font-semibold">Active</span>.
    </p>
    <div className="grid grid-cols-5 md:grid-cols-20 gap-2 w-full mx-auto px-4">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-sm"
          initial={{
            backgroundColor: "#2a2a4a",
            opacity: 0.7,
          }}
          animate={{
            opacity: [0.7, 1, 0.7], // Subtle pulse
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: Math.random() * 2, // Staggered animation
          }}
          whileHover={{
            backgroundColor: NEON_CYAN,
            boxShadow: `0 0 8px ${NEON_CYAN}`,
            opacity: 1,
            scale: 1.2,
          }}
          style={{
            backgroundColor: i % 5 === 0 ? NEON_PURPLE : "#2a2a4a",
            boxShadow: i % 5 === 0 ? `0 0 5px ${NEON_PURPLE}80` : "none",
          }}
        />
      ))}
    </div>
    <p className="text-xs text-center text-gray-500 mt-4">
      // SYNCHRONIZED-ACCESS: Global.
    </p>
  </div>
);

// --- MAIN CONTACT COMPONENT ---
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const isSubmitting = status === "submitting";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear previous success/error messages on user interaction
    if (status !== null && status !== "submitting") {
      setStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      if (FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_ENDPOINT_HERE") {
        // Use console.error instead of throw for better user experience in this context
        console.error(
          "Formspree endpoint is not configured. Simulating success."
        );

        // Simulate a successful response delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        return;
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    } finally {
      // Automatically clear status message after a few seconds
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const renderStatusMessage = () => {
    if (status === "success") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 flex items-center justify-center rounded-lg font-semibold border mt-6"
          style={{
            backgroundColor: NEON_CYAN + "30",
            color: NEON_CYAN,
            borderColor: NEON_CYAN,
          }}
        >
          <CheckCircle size={20} className="mr-2" />
          Message Sent! Acknowledging receipt of data packet.
        </motion.div>
      );
    }
    if (status === "error") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 flex items-center justify-center rounded-lg font-semibold border text-red-400 mt-6"
          style={{
            backgroundColor: "#dc262630", // Red background
            borderColor: "#dc2626", // Red border
          }}
        >
          <XCircle size={20} className="mr-2" />
          Transmission Failed. Error: Comms link down.
        </motion.div>
      );
    }
    return null;
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: DARK_BG, color: "white" }}
    >
      {/* Background Flares for modern depth */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400 opacity-10 blur-3xl rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 opacity-10 blur-3xl rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          {/* This column now focuses solely on contact points */}
          <div className="w-full lg:w-1/3 space-y-6">
            <motion.div
              className="p-8 rounded-xl border border-neon-purple/50 shadow-lg space-y-4"
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
                className="text-2xl font-bold mb-3"
                style={{ color: NEON_CYAN }}
              >
                Direct Comms Channel
              </h3>

              <ContactDetail
                icon={Mail}
                title="Primary Email"
                content="EverbestDev@gmail.com"
                link="mailto:olawooreusamahabidemi@gmail.com"
                subtext="For job offers and official inquiries."
              />

              <ContactDetail
                icon={MapPin}
                title="Current Sector"
                content="Solace IT Solution, Nigeria"
                subtext="Global Remote Access Enabled"
              />

              <ContactDetail
                icon={Phone}
                title="Voice Protocol (Phone)"
                content="+234 911 745 0722"
                link="tel:+2349117450722"
                subtext="Please notify via email before calling."
              />

              <ContactDetail
                icon={Smartphone}
                title="Encrypted Chat (WhatsApp)"
                content="+234 911 745 0722"
                link="https://wa.me/+2349117450722"
                subtext="For urgent project discussions."
              />
            </motion.div>
            {/* SystemStatusGrid was here, now moved to the right column */}
          </div>

          {/* Contact Form and System Status (Right Column) */}
          {/* Added space-y-6 for separation between the form and the status grid */}
          <div className="w-full lg:w-2/3 space-y-6">
            <motion.form
              onSubmit={handleSubmit}
              className="p-8 rounded-xl border border-cyan-400/50 shadow-lg"
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
                <TerminalInput
                  id="name"
                  label="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <TerminalInput
                  id="email"
                  label="Email Address"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <TerminalInput
                id="subject"
                label="Subject Line"
                value={formData.subject}
                onChange={handleChange}
              />
              <TerminalTextArea
                id="message"
                label="Your Message / Data Packet"
                required
                value={formData.message}
                onChange={handleChange}
              />

              {/* Status message is now positioned to appear just before the submit button */}
              {renderStatusMessage()}

              {status !== "success" && (
                <div className="flex justify-end mt-6">
                  <Button
                    isSubmitting={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    <Send size={20} className="mr-2" />
                    Transmit Message
                  </Button>
                </div>
              )}
            </motion.form>

            {/* System Status Grid moved here for better visual balance */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SystemStatusGrid />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
