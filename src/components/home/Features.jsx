import { FiCalendar, FiUsers, FiShield, FiTrendingUp } from "react-icons/fi";

const features = [
  {
    icon: FiCalendar,
    title: "Create Local Initiatives",
    description:
      "Launch community cleanups, tree plantations, winter clothes distributions, or free student coding workshops in minutes.",
  },
  {
    icon: FiUsers,
    title: "One-Click Volunteer Join",
    description:
      "Discover upcoming social development events near your campus or area and register instantly to participate.",
  },
  {
    icon: FiShield,
    title: "Verified Organizer Control",
    description:
      "Manage your created events securely with JWT-protected dashboards—update schedules or remove outdated listings anytime.",
  },
  {
    icon: FiTrendingUp,
    title: "Real-Time Impact Tracking",
    description:
      "Keep all your joined community service events sorted by date so you never miss an opportunity to contribute.",
  },
];

export default function Features() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-[#00f2fe]">
          Platform Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Designed for Community Action
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Everything you need to mobilize volunteers, share educational resources, and create measurable social impact.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="h-full p-6 rounded-2xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-[#0d131f]/80 hover:border-cyan-500 dark:hover:border-[#00f2fe]/60 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f2fe]/20 to-[#4facfe]/20 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-[#00f2fe]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}