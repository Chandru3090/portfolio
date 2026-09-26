import { useState } from "react";
import { profile } from "../../data/content";
import Reveal from "../Reveal";
import "../Section.css";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      setFeedback({ type: "error", text: "Name and message are required" });
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback({ type: "error", text: "Please enter a valid email" });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const response = await fetch("https://formspree.io/f/myezdvyv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (response.ok) {
        setFeedback({ type: "success", text: "Message sent! I'll get back to you soon." });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setFeedback({ type: "error", text: "Failed to send message. Try emailing directly." });
      }
    } catch {
      setFeedback({ type: "error", text: "Connection error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">Contact</span>
            <h2>Let's talk</h2>
            <p>
              Have a project in mind or just want to connect? Send a note and
              I'll get back to you.
            </p>
          </div>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={60}>
            <div className="glass-panel contact-form">
              <form onSubmit={handleSubmit}>
                <label>
                  <span className="label">Your name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your Name"
                    autoComplete="name"
                    disabled={loading}
                  />
                </label>
                <div className="form-row">
                  <label>
                    <span className="label">Email <span style={{ fontSize: "var(--text-12)", color: "var(--text-lo)" }}>(optional)</span></span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="your@email.com"
                      autoComplete="email"
                      disabled={loading}
                    />
                  </label>
                  <label>
                    <span className="label">Mobile <span style={{ fontSize: "var(--text-12)", color: "var(--text-lo)" }}>(optional)</span></span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      disabled={loading}
                    />
                  </label>
                </div>
                <label>
                  <span className="label">Message</span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="What would you like to talk about?"
                    rows={4}
                    disabled={loading}
                  />
                </label>
                {feedback && (
                  <div className={`feedback feedback-${feedback.type}`}>
                    {feedback.text}
                  </div>
                )}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass-panel contact-info">
              <div>
                <span className="label">Email</span>
                <a className="value" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </div>
              <div>
                <span className="label">Phone</span>
                <a className="value" href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
                  {profile.phone}
                </a>
              </div>
              <div>
                <span className="label">Location</span>
                <span className="value" style={{ display: "block" }}>
                  {profile.location}
                </span>
              </div>
              <div className="contact-socials">
                {profile.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-tag"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
