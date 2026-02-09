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
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
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
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'validation' | 'success' | 'error'
  const [missingFields, setMissingFields] = useState([]);
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

    // Manual Validation for Everbot
    const required = ["name", "email", "subject", "message"];
    const empty = required.filter(field => !formData[field].trim());

    if (empty.length > 0) {
      setMissingFields(empty);
      setModalType("validation");
      setShowModal(true);
      return;
    }

    setStatus("submitting");

    try {
      if (FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_ENDPOINT_HERE" || !FORMSPREE_ENDPOINT.startsWith("http")) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus("success");
        setModalType("success");
        setShowModal(true);
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
        setModalType("success");
        setShowModal(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setModalType("error");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setModalType("error");
      setShowModal(true);
    } finally {
      // Keep state for modal, but clear loading
      if (status === "submitting") setStatus(null);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: colors.DARK_BG }}
    >
      {/* home */}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Info & Map */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold tracking-widest uppercase" style={{ color: colors.TEXT_TERTIARY }}>
                  Available for Hire & Freelance
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: colors.TEXT_PRIMARY }}>
                Let's Build Something <br />
                <span style={{ color: colors.NEON_CYAN }}>Extraordinary</span>
              </h2>
              <p className="text-base mb-8 leading-relaxed max-w-md" style={{ color: colors.TEXT_SECONDARY }}>
                Ready to transform your vision into a scalable reality? I'm currently accepting new projects and freelance opportunities.
                Let's discuss how I can help your business grow.
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
            <form onSubmit={handleSubmit} className="relative z-10" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  colors={colors}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  colors={colors}
                />
              </div>
              <InputField
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                colors={colors}
              />
              <InputField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
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
            </form>
          </motion.div>
        </div>
      </div>

      {/* contact */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-sm w-full p-8 rounded-[2.5rem] border text-center overflow-hidden"
              style={{
                backgroundColor: colors.DARK_BG,
                borderColor: `${colors.BORDER}40`,
                boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5)`
              }}
            >
              {/* Everbot Avatar */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-500/30">
                    <img src="/pfp.jpg" alt="Everbot" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-slate-900 shadow-sm" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold" style={{ color: colors.TEXT_PRIMARY }}>
                  {modalType === 'validation' ? 'Everbot Detects...' : 'Everbot Says:'}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: colors.TEXT_SECONDARY }}>
                  {modalType === 'validation' && (
                    <>
                      It looks like the <span className="font-bold text-cyan-400 capitalize">{missingFields.join(", ")}</span> {missingFields.length > 1 ? 'sections are' : 'section is'} yet to be filled. Please complete {missingFields.length > 1 ? 'them' : 'it'} so I can deliver your message!
                    </>
                  )}
                  {modalType === 'success' && (
                    <>
                      <span className="text-green-400 font-bold block mb-2 text-lg">Message Sent Successfully!</span>
                      Your inquiry has been logged in my neural circuits. Should I contact you via email once I've processed this?
                    </>
                  )}
                  {modalType === 'error' && (
                    <>
                      I encountered a disturbance in the digital force. Please try beaming your message again in a few moments.
                    </>
                  )}
                </p>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 rounded-xl font-bold transition-all mt-4"
                  style={{
                    backgroundColor: colors.NEON_CYAN,
                    color: colors.DARK_BG
                  }}
                >
                  {modalType === 'validation' ? "I'll fix it!" : "Acknowledged"}
                </button>
              </div>


              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section >
  );
};

const InputField = ({ label, name, type = "text", required, value, onChange, textArea = false, colors }) => (
  <div className="relative mb-6">
    <div className="relative rounded-xl overflow-hidden">
      {textArea ? (
        <textarea
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          rows="4"
          className="peer w-full px-4 py-3 bg-transparent border-0 outline-none transition-all resize-none relative z-10"
          style={{
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
          className="peer w-full px-4 py-3 bg-transparent border-0 outline-none transition-all relative z-10"
          style={{
            color: colors.TEXT_PRIMARY,
            backgroundColor: `${colors.CARD_BG}40`
          }}
          placeholder=" "
        />
      )}

      <div
        className="absolute inset-0 border rounded-xl pointer-events-none"
        style={{ borderColor: `${colors.BORDER}60` }}
      />

      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-500 transition-all duration-500 peer-focus:w-full z-20"
        style={{ backgroundColor: colors.NEON_CYAN }}
      />
    </div>
    <label
      className="absolute left-4 top-3 text-sm pointer-events-none transition-all duration-300 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:px-2 z-30"
      style={{
        color: colors.TEXT_SECONDARY,
        backgroundColor: colors.DARK_BG
      }}
    >
      {label}
    </label>
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
