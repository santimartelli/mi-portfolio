import React from "react";

interface Props {
  image: string;
  title: string;
  title2: string;
  body: string;
  href: string;
  github: string;
  technologies: string[];
}

const Card: React.FC<Props> = ({ title, title2, body, image }) => (
  <div className="rounded-xl text-4xl w-11/12 sm:h-80 sm:w-60 sm:text-lg overflow-hidden transition-shadow duration-500 hover:cursor-pointer">
    <div className="flex flex-col h-full group">
      <div className="h-full relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-md transform scale-100 blur-sm transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:blur-0 group-hover:opacity-100"
        />
        <div className="absolute inset-0 flex flex-col items-center sm:justify-end justify-center pb-6 bg-black bg-opacity-40 transition-opacity duration-700 ease-in-out">
          <h2 className="text-white text-center italic font-extrabold uppercase transition-opacity duration-700 ease-in-out">
            {title}
          </h2>
          <h2 className="text-white text-center italic font-extrabold uppercase transition-opacity duration-700 ease-in-out">
            {title2}
          </h2>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
