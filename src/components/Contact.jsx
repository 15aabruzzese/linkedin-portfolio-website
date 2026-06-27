import { Linkedin, Mail, MapPin } from "lucide-react";
import { contact } from "../data";

export default function Contact() {
  return (
    <footer className="contact" id="contact">
      <div>
        <span className="section-kicker">Contact</span>
        <h2>Let's build reliable cloud platforms.</h2>
      </div>
      <div className="contact-links">
        <a href={`mailto:${contact.email}`}><Mail size={18} aria-hidden="true" />{contact.email}</a>
        <a href={contact.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={18} aria-hidden="true" />{contact.linkedin}</a>
        <span><MapPin size={18} aria-hidden="true" />{contact.location}</span>
      </div>
    </footer>
  );
}
