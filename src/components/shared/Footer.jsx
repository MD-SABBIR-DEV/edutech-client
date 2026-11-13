import Link from "next/link";
import {
  FiCpu,
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-cyan-500/20 bg-slate-100 dark:bg-[#05070b] text-slate-600 dark:text-slate-400 pt-16 pb-10 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f2fe] to-[#4facfe] flex items-center justify-center text-slate-950 font-bold">
                <FiCpu className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-[#00f2fe] dark:via-cyan-200 dark:to-[#4facfe] bg-clip-text text-transparent">
                EduTech Impact
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Empowering youth and local communities across Bangladesh through
              free digital literacy workshops, tech donation drives, and
              environmental action.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-[#00f2fe] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-[#00f2fe] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors"
              >
                <FiGithub className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-[#00f2fe] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors"
              >
                <FiLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-[#00f2fe] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors"
              >
                <FiFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-base">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/events"
                  className="hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  href="/create-event"
                  className="hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors"
                >
                  Host a Community Event
                </Link>
              </li>
              <li>
                <Link
                  href="/joined-events"
                  className="hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors"
                >
                  My Joined Events
                </Link>
              </li>
              <li>
                <Link
                  href="/manage-events"
                  className="hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors"
                >
                  Manage My Initiatives
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-base">
              Initiative Tracks
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>Free Coding & AI Bootcamps</li>
              <li>Hardware & Book Donation</li>
              <li>E-Waste Cleanup Drives</li>
              <li>Green Campus Plantation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-base">
              Community Hub
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 text-cyan-600 dark:text-[#00f2fe] shrink-0 mt-1" />
                <span>Dhanmondi, Dhaka-1209, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-cyan-600 dark:text-[#00f2fe] shrink-0" />
                <span>community@edutechimpact.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} EduTech Impact. Built for Community &
            Social Development.
          </p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
