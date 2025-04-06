import React from "react";

interface Props {
  image: string;
  title: string;
  title2: string;
  technologies: string[];
}

const Card: React.FC<Props> = ({ title, title2, image, technologies }) => (
  <div className="group relative overflow-hidden rounded-xl bg-transparent border border-[#45A29E]/20 backdrop-blur-sm transition-all duration-300 hover:bg-[#1F2833]/30 hover:border-[#66FCF1]/30 h-[380px] w-full max-w-[420px] shadow-lg hover:shadow-xl">
    {/* Image with overlay */}
    <div className="h-[220px] w-full overflow-hidden">
      <img
        src={image}
        alt={`${title} ${title2}`}
        className="h-full w-full object-cover object-center transform transition-all duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/40 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
    </div>

    {/* Content */}
    <div className="p-6 h-[160px] flex flex-col">
      <h3 className="text-white text-xl font-semibold mb-5 group-hover:text-white transition-colors duration-300">
        {title}{" "}
        <span className="font-normal text-[#C5C6C7] group-hover:text-[#C5C6C7] transition-colors duration-300">
          {title2}
        </span>
      </h3>

      {/* Technologies Tags */}
      <div className="flex flex-wrap gap-2 mt-auto mb-10">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs rounded-full bg-[#0B0C10]/30 text-[#C5C6C7] border border-[#45A29E]/20 group-hover:border-[#66FCF1]/30 group-hover:text-white transition-all duration-300">
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* View project button */}
    <div className="absolute bottom-6 right-6 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
      <span className="flex items-center gap-1 text-sm text-[#66FCF1] font-medium">
        Ver proyecto
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </div>
  </div>
);

export default Card;
