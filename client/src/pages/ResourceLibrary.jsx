import React from "react";
import Arrow from '../assets/images/Arrow.png';

const featuredResources = [
  {
    type: "Video",
    title: "Complete Guide to Umrah Rituals - HD Video Series",
    desc: "Comprehensive 3-hour video series covering all aspects of Umrah from Ihram to completion, with English subtitles and Arabic audio.",
    tags: ["General"],
    featured: true,
  },
  {
    type: "Pdf",
    title: "Authentic Duas for Tawaf - Complete Collection",
    desc: "Beautifully formatted PDF with 50+ authentic supplications to recite during Tawaf, with Arabic text, transliteration, and English translation.",
    tags: ["Tawaf"],
    featured: true,
  },
  {
    type: "Link",
    title: "Day of Arafat: The Pinnacle of Hajj - Scholar Commentary",
    desc: "In-depth article by renowned Islamic scholars explaining the spiritual significance and practical guidance for the most important day of Hajj.",
    tags: ["Arafat"],
    featured: true,
  },
  {
    type: "Pdf",
    title: "Hajj Rituals Day by Day Schedule",
    desc: "Detailed timeline and schedule for each day of Hajj with specific timings, locations, and required actions.",
    tags: ["Arafat"],
    featured: true,
  },
];

const allResources = [
  ...featuredResources,
  {
    type: "Link",
    title: "Hajj vs Umrah: Complete Comparison Guide",
    desc: "Detailed article explaining the differences, similarities, and unique aspects of both pilgrimages with historical context.",
    tags: ["General"],
  },
  {
    type: "Video",
    title: "Sa'i Between Safa and Marwah - Visual Guide",
    desc: "Interactive video showing the exact path, proper etiquette, and historical significance of walking between the two hills.",
    tags: ["Sa'i"],
  },
  {
    type: "Pdf",
    title: "Ihram: Complete Rules and Restrictions Manual",
    desc: "Comprehensive 40-page guide covering all aspects of Ihram including what to wear, what to avoid, and how to maintain purity.",
    tags: ["Miqat"],
  },
  {
    type: "Pdf",
    title: "Pilgrimage Preparation Checklist",
    desc: "Essential checklist covering documents, health requirements, packing list, and spiritual preparation for your journey.",
    tags: ["General"],
  },
  {
    type: "Pdf",
    title: "Duas for Travel and Protection",
    desc: "Collection of authentic supplications for safe travel, protection during journey, and arrival at sacred places.",
    tags: ["Miqat"],
  },
  {
    type: "Link",
    title: "History of the Kaaba and Masjid al-Haram",
    desc: "Detailed historical account of the construction and expansion of Islam's holiest mosque through the centuries.",
    tags: ["Tawaf"],
  },
  {
    type: "Video",
    title: "Zamzam Water: Blessings and Benefits",
    desc: "Educational video about the miraculous well of Zamzam, its history, and the proper etiquette for drinking.",
    tags: ["Sa'i"],
  },
];

const ResourceTag = ({ children, color }) => (
  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${color || "bg-gray-100 text-gray-700"} mr-1 mb-1 inline-block`}>
    {children}
  </span>
);

const ResourceCard = ({ resource, featured }) => (
  <div className={`bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-col ${featured ? "h-full" : "md:flex-row md:items-center"}`}>
    <div className="flex flex-wrap items-center mb-2 md:mb-0">
      {resource.type === "Video" && <ResourceTag color="bg-red-100 text-red-600">Video</ResourceTag>}
      {resource.type === "Pdf" && <ResourceTag color="bg-blue-100 text-blue-600">Pdf</ResourceTag>}
      {resource.type === "Link" && <ResourceTag color="bg-green-100 text-green-600">Link</ResourceTag>}
      {resource.tags && resource.tags.map((tag, i) => <ResourceTag key={i}>{tag}</ResourceTag>)}
      {resource.featured && <ResourceTag color="bg-yellow-100 text-yellow-700">★ Featured</ResourceTag>}
    </div>
    <div className="flex-1">
      <div className="font-semibold text-gray-900 text-base mb-1">{resource.title}</div>
      <div className="text-gray-600 text-sm mb-2">{resource.desc}</div>
      {featured && (
        <div className="flex justify-end">
          <a href="#" className="text-blue-600 text-xs font-semibold hover:underline">View</a>
        </div>
      )}
    </div>
    {!featured && (
      <div className="md:ml-auto mt-2 md:mt-0 w-fit">
        <a
          href="#"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 hover:bg-blue-700 transition"
        >
          Access
          <img src={Arrow} alt="arrow" className="w-4 h-4 ml-1" />
        </a>
      </div>
    )}
  </div>
);

const ResourceLibrary = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Resource Library</h1>
          <p className="text-gray-600 text-sm mb-4">Access authentic Islamic resources for your spiritual journey</p>

          {/* Search and Filters */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center bg-white p-4 rounded-xl border border-gray-200 mb-6">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full md:w-auto flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            <select className="w-full md:w-auto border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option>All Categories</option>
            </select>
            <select className="w-full md:w-auto border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option>All Types</option>
            </select>
          </div>
        </div>

        {/* Featured Resources */}
        <div className="mb-8">
          <div className="font-semibold text-gray-800 mb-3">Featured Resources</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredResources.map((res, i) => (
              <ResourceCard key={i} resource={res} featured />
            ))}
          </div>
        </div>

        {/* All Resources */}
        <div>
          <div className="font-semibold text-gray-800 mb-3">
            All Resources <span className="text-gray-400 font-normal">({allResources.length})</span>
          </div>
          <div className="flex flex-col gap-4">
            {allResources.map((res, i) => (
              <ResourceCard key={i} resource={res} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourceLibrary;
