import { useState } from "react";
import Title from "../components/Title";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to your backend / email service
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="border-t pt-10">
      {/* TITLE */}
      <div className="text-center text-2xl">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="max-w-6xl mx-auto py-10 flex flex-col md:flex-row gap-10">
        {/* LEFT SIDE — BRAND PANEL (replaces the old photo) */}
        <div className="md:w-1/2 flex flex-col justify-center bg-black text-white rounded-lg px-10 py-16">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-4">
            EST. 2024
          </p>
          <h1 className="text-5xl font-bold tracking-widest leading-tight">
            FOREVER
          </h1>
          <div className="w-16 h-[2px] bg-white my-6"></div>
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
            Premium fashion, made to last. We're here to help with
            orders, sizing, returns, or anything else on your mind.
          </p>

          <div className="mt-12 space-y-4 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white w-5">📍</span>
              <span>Indore, Madhya Pradesh, India</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white w-5">📞</span>
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white w-5">✉️</span>
              <span>support@foreverbuy.com</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-white w-5">🕒</span>
              <span>Mon – Sat, 9:00 AM to 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — FORM */}
        <div className="md:w-1/2">
          <div className="border p-6 md:p-8 rounded-lg shadow-sm h-full">
            <h2 className="text-2xl font-semibold mb-2">Get In Touch</h2>
            <p className="text-gray-500 text-sm mb-6">
              Send us a message and our team will get back to you within
              24 hours.
            </p>

            {submitted && (
              <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded p-3">
                Thanks — your message has been sent. We'll be in touch soon.
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border p-3 outline-none focus:border-black transition rounded"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full border p-3 outline-none focus:border-black transition rounded"
              />
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full border p-3 outline-none focus:border-black transition rounded resize-none"
              />
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 w-full rounded hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
