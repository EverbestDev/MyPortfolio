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
  ArrowRight
} from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "YOUR_FORMSPREE_ENDPOINT_HERE";

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

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG }}
    >
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Info & Map */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: colors.TEXT_PRIMARY }}>
                Let's Build Something <br />
                <span style={{ color: colors.NEON_CYAN }}>Extraordinary</span>
              </h2>
              <p className="text-base mb-8 leading-relaxed max-w-md" style={{ color: colors.TEXT_SECONDARY }}>
                Have a project in mind? I'm always open to discussing new ideas,
                creative opportunities, and cutting-edge tech.
              </p>
            </motion.div>

            {/* Contact Cards in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ContactInfoCard
                icon={Mail}
                title="Email"
                value="EverbestDev@gmail.com"
                link="mailto:EverbestDev@gmail.com"
                delay={0.1}
                colors={colors}
                compact
              />
              <ContactInfoCard
                icon={Smartphone}
                title="WhatsApp"
                value="+234 911 745 0722"
                link="https://wa.me/2349117450722"
                delay={0.2}
                colors={colors}
                compact
              />
              <ContactInfoCard
                icon={MapPin}
                title="Location"
                value="Ijebu-Ode, Ogun"
                link="https://maps.google.com/?q=240,+Ondo+benin+Road,+Ijebu-Ode+Ogun+state"
                delay={0.3}
                colors={colors}
                compact
              />
            </div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full h-80 rounded-3xl overflow-hidden border backdrop-blur-md relative"
              style={{
                borderColor: `${colors.BORDER}40`,
                boxShadow: `0 20px 40px -20px rgba(0,0,0,0.5)`
              }}
            >
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.08833939622!2d3.921389!3d6.8125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bc3704685ff8b%3A0xe510f9797072499d!2zMjQwLCBPbmRvIGJlbmluIFJvYWQsIElqZWJ1LU9kZSBPZ3VuIHN0YXRl!5e0!3m2!1sen!2sng!4v1707440000000!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0, filter: colors.DARK_BG === '#080812' ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-3xl border backdrop-blur-xl"
            style={{
              backgroundColor: `${colors.CARD_BG}60`,
              borderColor: `${colors.BORDER}40`,
              boxShadow: `0 20px 40px -20px rgba(0,0,0,0.5)`
            }}
          >
            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  colors={colors}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  colors={colors}
                />
              </div>
              <InputField
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                colors={colors}
              />
              <InputField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                textArea
                colors={colors}
              />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
                style={{
                  backgroundColor: colors.NEON_CYAN,
                  color: colors.DARK_BG
                }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${colors.NEON_CYAN}40` }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl flex items-center gap-3 bg-green-500/10 text-green-400 border border-green-500/20"
                >
                  <CheckCircle size={20} />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl flex items-center gap-3 bg-red-500/10 text-red-400 border border-red-500/20"
                >
                  <XCircle size={20} />
                  <span>Something went wrong. Please try again.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const InputField = ({ label, name, type = "text", required, value, onChange, textArea = false, colors }) => (
  <div className="relative mb-6">
    {textArea ? (
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        rows="4"
        className="peer w-full px-4 py-3 rounded-xl bg-transparent border outline-none transition-all resize-none"
        style={{
          borderColor: `${colors.BORDER}60`,
          color: colors.TEXT_PRIMARY,
          backgroundColor: `${colors.CARD_BG}40`
        }}
        placeholder=" "
      />
    ) : (
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="peer w-full px-4 py-3 rounded-xl bg-transparent border outline-none transition-all"
        style={{
          borderColor: `${colors.BORDER}60`,
          color: colors.TEXT_PRIMARY,
          backgroundColor: `${colors.CARD_BG}40`
        }}
        placeholder=" "
      />
    )}
    <label
      className="absolute left-4 top-3 text-sm pointer-events-none transition-all duration-300 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-black peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-black peer-[:not(:placeholder-shown)]:px-2"
      style={{ color: colors.TEXT_SECONDARY }}
    >
      {label}
    </label>
    <div
      className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-500 transition-all duration-500 peer-focus:w-full"
      style={{ backgroundColor: colors.NEON_CYAN }}
    />
  </div>
);

const ContactInfoCard = ({ icon: Icon, title, value, link, delay, colors, compact }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className={`flex ${compact ? 'flex-col items-start gap-2 p-4' : 'items-center gap-4 p-5'} rounded-2xl border transition-all duration-300 group`}
    style={{
      backgroundColor: `${colors.CARD_BG}c0`,
      borderColor: `${colors.BORDER}40`
    }}
    whileHover={{
      y: -5,
      borderColor: colors.NEON_CYAN,
      boxShadow: `0 10px 30px -10px ${colors.NEON_CYAN}20`
    }}
  >
    <div
      className={`${compact ? 'w-10 h-10' : 'w-12 h-12'} rounded-full flex items-center justify-center transition-colors group-hover:bg-cyan-500/10`}
      style={{ backgroundColor: `${colors.NEON_CYAN}10` }}
    >
      <Icon size={compact ? 20 : 24} style={{ color: colors.NEON_CYAN }} />
    </div>
    <div>
      <h4 className="text-xs font-medium mb-1" style={{ color: colors.TEXT_SECONDARY }}>{title}</h4>
      <p className={`${compact ? 'text-[13px]' : 'text-lg'} font-semibold truncate max-w-[140px]`} style={{ color: colors.TEXT_PRIMARY }}>{value}</p>
    </div>
    {!compact && (
      <ArrowRight
        size={20}
        className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        style={{ color: colors.NEON_CYAN }}
      />
    )}
  </motion.a>
);

export default Contact;
