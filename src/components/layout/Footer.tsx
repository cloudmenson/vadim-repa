import { Ship, Mail, Phone, MapPin, Globe, MessageSquare, Share2, Shield } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="bg-neutral-950 pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-500/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <Ship className="h-10 w-10 text-blue-500 transition-transform group-hover:scale-110" />
              <span className="text-2xl font-black tracking-tighter text-white">LOGIPRO</span>
            </Link>
            <p className="text-neutral-400 text-lg leading-relaxed font-medium">
              Global leaders in freight forwarding and supply chain optimization. 
              Engineering the future of autonomous logistics since 2012.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageSquare, Share2, Shield].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="h-12 w-12 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/10 transition-all group"
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-[0.3em] mb-10">Navigation</h4>
            <ul className="flex flex-col gap-5 text-neutral-400">
              {["Services", "About Us", "Case Studies", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="group flex items-center gap-2 hover:text-white transition-colors">
                    <span className="h-px w-0 bg-blue-500 group-hover:w-4 transition-all" />
                    <span className="font-medium">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-[0.3em] mb-10">Solutions</h4>
            <ul className="flex flex-col gap-5 text-neutral-400">
              {["Road Freight", "Air Cargo", "Ocean Freight", "Warehousing"].map((item) => (
                <li key={item} className="group flex items-center gap-2 font-medium cursor-default">
                  <span className="h-1 w-1 rounded-full bg-blue-500/40 group-hover:bg-blue-500 transition-all" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-[0.3em] mb-10">Get in Touch</h4>
            <ul className="flex flex-col gap-6 text-neutral-400">
              <li className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Call Us</p>
                  <span className="text-sm font-medium">+1 (234) 567-890</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Email Us</p>
                  <span className="text-sm font-medium">contact@logipro.com</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Visit Us</p>
                  <span className="text-sm font-medium">123 Logistics Way, Global City, NY</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-neutral-500 font-medium italic">
            &quot;Delivering the future, today.&quot;
          </p>
          <div className="flex flex-col md:flex-row items-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-500">
            <p>© 2026 Logistics Pro Inc.</p>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
