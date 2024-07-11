import Badge from "./Badge.tsx";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillsMotion = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemMotion = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 50,
  },
};

const Skills = () => {
  const skillsRef = useRef(null);

  const skillsInView = useInView(skillsRef, { once: true });

  return (
    <section
      id="skills"
      className="flex flex-col justify-center items-center w-full gap-y-14 bg-black overflow-x-hidden pt-20 pb-20 md:pt-32 md:pb-40">
      <h2 className="text-3xl md:text-4xl uppercase text-white">Habilidades</h2>
      <motion.div
        ref={skillsRef}
        variants={skillsMotion}
        animate={skillsInView ? "visible" : "hidden"}
        initial="hidden"
        className="flex flex-row gap-3 mx-12 flex-wrap items-center justify-center">
        <motion.div variants={itemMotion}>
          <Badge>HTML</Badge>
        </motion.div>
        <motion.div variants={itemMotion}>
          <Badge>CSS</Badge>
        </motion.div>
        <motion.div variants={itemMotion}>
          <Badge>JavaScript</Badge>
        </motion.div>
        <motion.div variants={itemMotion}>
          <Badge>Vue.js</Badge>
        </motion.div>
        <motion.div variants={itemMotion}>
          <Badge>React.js</Badge>
        </motion.div>
        <motion.div variants={itemMotion}>
          <Badge>Node.js</Badge>
        </motion.div>
        <motion.div variants={itemMotion}>
          <Badge>Express.js</Badge>
        </motion.div>
        <motion.div variants={itemMotion}>
          <Badge>PHP</Badge>
        </motion.div>
        <motion.div variants={itemMotion}>
          <Badge>Laravel</Badge>
        </motion.div>
        <motion.div variants={itemMotion}>
          <Badge>SQL</Badge>
        </motion.div>
        <motion.div variants={itemMotion}>
          <Badge>Git</Badge>
        </motion.div>
        <motion.div variants={itemMotion}>
          <Badge>Tailwind CSS</Badge>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
