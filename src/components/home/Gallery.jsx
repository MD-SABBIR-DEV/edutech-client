/* eslint-disable @next/next/no-img-element */
const galleryPhotos = [
  {
    url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80",
    caption: "Community Food & Relief Distribution",
  },
  {
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
    caption: "Free ICT Seminar for College Students",
  },
  {
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    caption: "Youth Tech Mentorship Workshop",
  },
  {
    url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80",
    caption: "Volunteer Solidarity Campaign",
  },
  {
    url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop&q=80",
    caption: "Book & Educational Aid Drive",
  },
  {
    url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80",
    caption: "Green Dhaka Sapling Distribution",
  },
];

export default function Gallery() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-[#00f2fe]">
          Moments of Impact
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Community Service Gallery
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Glimpses from our recent student-led workshops, winter relief drives,
          and environmental campaigns.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryPhotos.map((photo, index) => (
          <div
            key={index}
            className="group relative h-64 rounded-2xl overflow-hidden border border-slate-200 dark:border-cyan-500/20 bg-slate-900 shadow-md"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-5">
              <p className="text-sm font-semibold text-white group-hover:text-[#00f2fe] transition-colors">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
