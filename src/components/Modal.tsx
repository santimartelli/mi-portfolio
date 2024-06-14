import React from 'react';

interface Props {
  title: string;
  title2: string;
  body: string;
  technologies: string[];
  href: string;
  github: string;
  image: string;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ title, title2, body, technologies, href, github, image, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg w-3/4 h-3/4">
      <img src={image} alt={title} className="w-full h-56 object-cover rounded-t-lg mb-4" />
      <h2 className="text-xl font-bold mb-2">{title} {title2}</h2>
      <p className="text-gray-700 mb-4">{body}</p>
      <div className="mb-4">
        <h4 className="font-bold mb-2">Technologies Used:</h4>
        <ul className="list-disc pl-5">
          {technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="font-bold mb-2">Links:</h4>
        <ul className="list-disc pl-5">
          <li><a href={href} target="_blank" rel="noopener noreferrer">Project Link</a></li>
          <li><a href={github} target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
        </ul>
      </div>
      <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
    </div>
  </div>
);

export default Modal;

