import React, { useState } from "react";
import { CustomerInquiry } from "../types";
import { MapPin, Phone, Clock, Mail, Send, CheckCircle2, MessageSquare } from "lucide-react";

interface ContactSectionProps {
  onInquirySubmit: (inquiry: CustomerInquiry) => void;
  businessPhone?: string;
}

export default function ContactSection({ onInquirySubmit, businessPhone = "919949466307" }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    const newInq: CustomerInquiry = {
      id: `inq_${Date.now()}`,
      name: name.trim(),
      email: email.trim() || "no-email@test.com",
      phone: phone.trim(),
      message: message.trim(),
      date: new Date().toISOString().split("T")[0],
      status: "new"
    };

    onInquirySubmit(newInq);

    // Reset Form
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSentSuccess(true);

    setTimeout(() => {
      setSentSuccess(false);
    }, 5000);
  };

  const handleQuickWhatsAppChat = () => {
    const text = encodeURIComponent("Hello Saifoodlover Cafe Chef! I am visiting your website and wanted to check about group catering/today's special combo offer. 😊");
    window.open(`https://api.whatsapp.com/send?phone=${businessPhone}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-20 bg-[#070709] border-t border-[#ffd700]/10 scroll-mt-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs text-[#ffd700] uppercase font-mono tracking-widest block mb-2">🎈 Location & Contact</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">Get In Touch</h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#f57c00] to-transparent w-40 mx-auto mt-3" />
          <p className="text-xs text-gray-400 mt-3 font-serif">
            Visit Saifoodlover Cafe for warm service, cozy leather seating, or drop an inquiry for orders, events, and parties.
          </p>
        </div>

        {/* Contact Block Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Card left: Info details & custom simulated Map */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-300 leading-relaxed font-serif">
              {/* Address detail */}
              <div className="bg-[#111115] border border-gray-850 p-5 rounded-xl hover:border-orange-500/10 transition-all">
                <MapPin className="w-6 h-6 text-[#f57c00] mb-3" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-1.5 font-sans">Our Address Location</h4>
                <p>Above BNew Mobiles, 8-10-80,</p>
                <p>Siddavatam Rd, Badvel,</p>
                <p className="text-[#ffd700] text-[10px] font-sans font-semibold mt-1">Andhra Pradesh - 516237</p>
              </div>

              {/* Call detail */}
              <div className="bg-[#111115] border border-gray-850 p-5 rounded-xl hover:border-orange-500/10 transition-all">
                <Phone className="w-6 h-6 text-[#ffd700] mb-3" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-1.5 font-sans">Express Cooking Lines</h4>
                <p>Primary Call: <span className="font-sans text-white font-semibold">+91 99494 66307</span></p>
                <p>WhatsApp: <span className="font-sans text-white font-semibold">+91 99494 66307</span></p>
                <p className="text-[10px] text-gray-500 mt-1 font-sans">Open for direct home deliveries</p>
              </div>

              {/* Timing detail */}
              <div className="bg-[#111115] border border-gray-850 p-5 rounded-xl hover:border-orange-500/10 transition-all">
                <Clock className="w-6 h-6 text-[#f57c00] mb-3" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-1.5 font-sans">Operating Hours</h4>
                <p className="font-sans font-bold text-white">Daily: 11:00 AM – 11:00 PM</p>
                <p className="mt-1">Orders close on WhatsApp at 10:45 PM for kitchen sanitization.</p>
              </div>

              {/* Email detail */}
              <div className="bg-[#111115] border border-gray-850 p-5 rounded-xl hover:border-orange-500/10 transition-all">
                <Mail className="w-6 h-6 text-[#ffd700] mb-3" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-1.5 font-sans">Business Relations</h4>
                <p>Catering: info@saifoodlover.com</p>
                <p>Admin: owner@saifoodlover.com</p>
                <span className="text-[10px] text-orange-400 font-sans mt-1 cursor-pointer hover:underline block" onClick={handleQuickWhatsAppChat}>
                  💬 Ask about Party Catering
                </span>
              </div>
            </div>

            {/* Premium Simulated Map (safest in previews to avoid iframe cross-origin maps bugs) */}
            <div className="relative h-64 bg-[#111115] border border-[#ffd700]/15 rounded-2xl overflow-hidden flex flex-col justify-center items-center text-center p-6 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80')" }}>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-[#f57c00] rounded-full text-white text-md mb-3 flex items-center justify-center animate-bounce shadow">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Premium Map Coordinates</h4>
              <p className="text-xs text-gray-400 max-w-sm mt-1">
                Saifoodlover Cafe lies above BNew Mobiles, Siddavatam Rd, Badvel. Highly accessible with free customer parking.
              </p>
              
              <button
                id="maps-direction-btn-mock"
                onClick={() => window.open(`https://www.google.com/maps/dir//BNew+Mobiles,+8-10-80,+Siddavatam+Rd,+Badvel,+Andhra+Pradesh+516237/@17.5334898,78.9127827,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bb35fe8cc3f433d:0x594f66121932eb83!2m2!1d79.0596175!2d14.7314647?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D`, "_blank")}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-[#111] to-[#222] hover:bg-[#333] border border-gray-700 text-xs font-semibold text-white rounded-lg transition-all"
              >
                🗺️ Get Directions in Google Maps
              </button>
            </div>
          </div>

          {/* Card right: Clean inquiries contact Form */}
          <div className="bg-[#111115] border border-[#ffd700]/10 rounded-2xl p-8 shadow-xl">
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2">Write An Inquiry</h3>
            <p className="text-xs text-gray-400 mb-6 pb-4 border-b border-gray-800">
              Submit your questions or request table booking. Your message will instantly update the Cafe Admin Dashboard database!
            </p>

            {sentSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500 text-green-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-white">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                  Thank you! Your inquiries are processed in real-time. Head over to the top navbar &lsquo;Admin Workspace&rsquo; panel to view your transmitted message.
                </p>
                <div className="pt-4">
                  <button
                    id="contact-reset-form-button"
                    onClick={() => setSentSuccess(false)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs font-semibold text-white transition-all"
                  >
                    Send Another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* Name */}
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Your Full Name*</label>
                  <input
                    id="contact-form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Satish Bysani"
                    className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-3 text-white outline-none"
                  />
                </div>

                {/* Email and Phone side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 font-semibold mb-1">Email Coordinates (Optional)</label>
                    <input
                      id="contact-form-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. user@gmail.com"
                      className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-semibold mb-1">Mobile Contact No.*</label>
                    <input
                      id="contact-form-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 99494 66307"
                      className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-3 text-white outline-none"
                    />
                  </div>
                </div>

                {/* Message text area */}
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Inquiry / Booking Message Detail*</label>
                  <textarea
                    id="contact-form-message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Describe your table reservation count, preferred timing, catering requirements or order issues here..."
                    className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-3 text-white outline-none resize-none font-serif leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#ffd700] to-orange-400 hover:brightness-110 text-[#000] font-black tracking-wider uppercase rounded-lg transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 text-xs"
                >
                  <Send className="w-4 h-4 text-[#000]" />
                  Transmit Message To Cafe Inbox
                </button>
              </form>
            )}

            {/* Quick WhatsApp Link as helper */}
            <div className="mt-5 pt-4 border-t border-gray-800 text-center text-xs">
              <span className="text-gray-500">Need instant help?</span>
              <button 
                id="contact-quick-chat"
                type="button"
                onClick={handleQuickWhatsAppChat} 
                className="text-[#ffd700] hover:underline hover:text-white font-bold ml-1.5 inline-flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Chat via WhatsApp
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
