import React from "react";

interface Props {
  image: string;
  title: string;
  title2: string;
}

const Card: React.FC<Props> = ({ title, title2, image }) => (
  <div className="rounded-xl text-2xl md:text-xl w-full md:h-80 md:w-60 overflow-hidden transition-shadow duration-500 hover:cursor-pointer">
    <div className="flex flex-col h-full group">
      <div className="h-full relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-md transform scale-100 blur-sm transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:blur-0 group-hover:opacity-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-6 bg-black/30  transition-opacity duration-700 ease-in-out">
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
