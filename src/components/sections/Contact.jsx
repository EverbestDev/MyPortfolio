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
import { useThemeColors } from "../../hooks/useThemeColors";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "YOUR_FORMSPREE_ENDPOINT_HERE";

const Button = ({ children, isSubmitting, className = "", colors }) => (
  <motion.button
    type="submit"
    disabled={isSubmitting}
    className={`relative flex items-center justify-center font-bold tracking-wider uppercase px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    style={{
      backgroundColor: colors.NEON_CYAN,
      color: colors.DARK_BG,
      boxShadow: isSubmitting
        ? `0 0 15px ${colors.NEON_PURPLE}`
        : `0 0 10px ${colors.NEON_CYAN}40`,
    }}
    whileHover={{
      scale: isSubmitting ? 1 : 1.05,
      boxShadow: isSubmitting
        ? undefined
        : `0 0 25px ${colors.NEON_CYAN}80, 0 0 10px ${colors.NEON_PURPLE}80`,
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
        backgroundImage:
          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
      }}
    />
  </motion.button>
);

const TerminalInput = ({
  id,
  label,
  type = "text",
  required = false,
  value,
  onChange,
  colors
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
        placeholder=" "
        className="block w-full px-0 pt-3 pb-2 text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none peer placeholder-transparent"
        style={{
          borderColor: isFilled ? colors.NEON_CYAN : colors.BORDER,
          color: colors.TEXT_PRIMARY,
          transition: "border-color 0.3s",
        }}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 cursor-text ${isFilled ? "scale-75 -translate-y-6" : ""}`}
        style={{
          color: isFilled ? colors.NEON_CYAN : colors.TEXT_TERTIARY,
        }}
      >
        {label} {required && <span style={{ color: colors.NEON_PURPLE }}>*</span>}
      </label>
      <motion.div
        className="absolute left-0 bottom-0 w-full h-0.5 transform origin-left"
        style={{
          backgroundColor: colors.NEON_CYAN,
          boxShadow: `0 0 8px ${colors.NEON_CYAN}`,
        }}
        initial={{ scaleX: 0 }}
        animate={isFilled ? { scaleX: 1 } : { scaleX: 0 }}
        whileFocus={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const TerminalTextArea = ({ id, label, required = false, value, onChange, colors }) => {
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
        placeholder=" "
        className="block w-full px-0 pt-3 pb-2 text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none peer resize-none placeholder-transparent"
        style={{
          borderColor: isFilled ? colors.NEON_CYAN : colors.BORDER,
          color: colors.TEXT_PRIMARY,
          transition: "border-color 0.3s",
        }}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 cursor-text ${isFilled ? "scale-75 -translate-y-6" : ""}`}
        style={{
          color: isFilled ? colors.NEON_CYAN : colors.TEXT_TERTIARY,
        }}
      >
        {label} {required && <span style={{ color: colors.NEON_PURPLE }}>*</span>}
      </label>
      <motion.div
        className="absolute left-0 bottom-0 w-full h-0.5 transform origin-left"
        style={{
          backgroundColor: colors.NEON_CYAN,
          boxShadow: `0 0 8px ${colors.NEON_CYAN}`,
        }}
        initial={{ scaleX: 0 }}
        animate={isFilled ? { scaleX: 1 } : { scaleX: 0 }}
        whileFocus={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const ContactDetail = ({ icon: Icon, title, content, link, subtext, colors }) => (
  <motion.a
    href={link}
    target={
      link?.startsWith("http") || link?.startsWith("mailto")
        ? "_blank"
        : "_self"
    }
    rel="noopener noreferrer"
    className="flex flex-col p-4 rounded-lg transition-all duration-300 cursor-pointer border"
    style={{ borderColor: "transparent", color: colors.TEXT_PRIMARY }}
    whileHover={{
      scale: 1.02,
      backgroundColor: colors.CARD_BG,
      borderColor: `${colors.NEON_CYAN}80`,
      boxShadow: `0 0 10px ${colors.NEON_CYAN}20`,
    }}
  >
    <div className="flex items-center mb-2">
      <Icon
        size={24}
        style={{ color: colors.NEON_CYAN }}
        className="mr-3 flex-shrink-0"
      />
      <h4 className="text-lg font-semibold" style={{ color: colors.TEXT_PRIMARY }}>{title}</h4>
    </div>
    <span className="ml-9 text-base font-medium break-all" style={{ color: colors.NEON_CYAN }}>
      {content}
    </span>
    {subtext && <span className="ml-9 text-sm" style={{ color: colors.TEXT_TERTIARY }}>{subtext}</span>}
  </motion.a>
);

const SystemStatusGrid = ({ colors }) => (
  <div className="p-6 rounded-xl border shadow-lg hidden md:block" style={{ backgroundColor: colors.CARD_BG, borderColor: `${colors.NEON_PURPLE}50` }}>
    <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: colors.TEXT_PRIMARY }}>
      <Loader2 size={20} className="mr-2 animate-spin" style={{ color: colors.NEON_PURPLE }} />
      System Availability Status
    </h3>
    <p className="text-sm mb-4" style={{ color: colors.TEXT_SECONDARY }}>
      Real-time data synchronization feed. Status:{" "}
      <span style={{ color: colors.NEON_CYAN, fontWeight: "semibold" }}>Active</span>.
    </p>
    <div className="grid grid-cols-5 md:grid-cols-20 gap-2 w-full mx-auto px-4">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-sm"
          initial={{
            backgroundColor: `${colors.BORDER}40`,
            opacity: 0.7,
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          whileHover={{
            backgroundColor: colors.NEON_CYAN,
            boxShadow: `0 0 8px ${colors.NEON_CYAN}`,
            opacity: 1,
            scale: 1.2,
          }}
          style={{
            backgroundColor: i % 5 === 0 ? colors.NEON_PURPLE : `${colors.BORDER}40`,
            boxShadow: i % 5 === 0 ? `0 0 5px ${colors.NEON_PURPLE}80` : "none",
          }}
        />
      ))}
    </div>
  </div>
);

const Contact = () => {
  const colors = useThemeColors();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const isSubmitting = status === "submitting";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status !== null && status !== "submitting") {
      setStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      if (FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_ENDPOINT_HERE") {
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
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    } finally {
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
            backgroundColor: colors.NEON_CYAN + "30",
            color: colors.NEON_CYAN,
            borderColor: colors.NEON_CYAN,
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
          className="p-3 flex items-center justify-center rounded-lg font-semibold border mt-6"
          style={{
            backgroundColor: "#dc262630",
            color: "#dc2626",
            borderColor: "#dc2626",
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
      style={{ backgroundColor: colors.DARK_BG, color: colors.TEXT_PRIMARY }}
    >
      <div
        className="absolute top-0 right-0 w-48 h-48 opacity-10 blur-3xl rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: colors.NEON_CYAN }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-48 h-48 opacity-10 blur-3xl rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2"
        style={{ backgroundColor: colors.NEON_PURPLE }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className="text-lg font-medium tracking-widest uppercase mb-2"
            style={{ color: colors.NEON_CYAN }}
          >
            Secure Data Uplink
          </h3>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold" style={{ color: colors.TEXT_PRIMARY }}>
            Connect with Me
          </h2>
        </motion.div>

        <div className="flex flex-wrap lg:flex-nowrap gap-12">
          <div className="w-full lg:w-1/3 space-y-6">
            <motion.div
              className="p-8 rounded-xl border shadow-lg space-y-4"
              style={{
                backgroundColor: colors.SECTION_BG,
                borderColor: `${colors.NEON_PURPLE}40`,
                boxShadow: `0 0 20px ${colors.NEON_PURPLE}10`,
              }}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: colors.NEON_CYAN }}
              >
                Direct Comms Channel
              </h3>

              <ContactDetail
                icon={Mail}
                title="Primary Email"
                content="EverbestDev@gmail.com"
                link="mailto:EverbestDev@gmail.com"
                subtext="For job offers and official inquiries."
                colors={colors}
              />

              <ContactDetail
                icon={MapPin}
                title="Current Sector"
                content="Solace IT Solution, Nigeria"
                subtext="Global Remote Access Enabled"
                colors={colors}
              />

              <ContactDetail
                icon={Phone}
                title="Voice Protocol"
                content="+234 911 745 0722"
                link="tel:+2349117450722"
                subtext="Available for calls and messages."
                colors={colors}
              />

              <ContactDetail
                icon={Smartphone}
                title="Instant Chat"
                content="+234 911 745 0722"
                link="https://wa.me/2349117450722"
                subtext="Available on WhatsApp."
                colors={colors}
              />
            </motion.div>
          </div>

          <div className="w-full lg:w-2/3 space-y-6">
            <motion.form
              onSubmit={handleSubmit}
              className="p-8 rounded-xl border shadow-lg"
              style={{
                backgroundColor: colors.SECTION_BG,
                borderColor: `${colors.NEON_CYAN}40`,
                boxShadow: `0 0 20px ${colors.NEON_CYAN}10`,
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
                  colors={colors}
                />
                <TerminalInput
                  id="email"
                  label="Email Address"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  colors={colors}
                />
              </div>
              <TerminalInput
                id="subject"
                label="Subject Line"
                value={formData.subject}
                onChange={handleChange}
                colors={colors}
              />
              <TerminalTextArea
                id="message"
                label="Your Message"
                required
                value={formData.message}
                onChange={handleChange}
                colors={colors}
              />

              {renderStatusMessage()}

              {status !== "success" && (
                <div className="flex justify-end mt-6">
                  <Button
                    isSubmitting={isSubmitting}
                    className="w-full sm:w-auto"
                    colors={colors}
                  >
                    <Send size={20} className="mr-2" />
                    Transmit Message
                  </Button>
                </div>
              )}
            </motion.form>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SystemStatusGrid colors={colors} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
