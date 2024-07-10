import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="home" className="w-full min-h-screen justify-center flex bg-slate-100 relative overflow-x-hidden">
      <div className="flex flex-col max-md:mx-4 gap-y-14 items-center text-center pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.5, duration: 1 }}
          className="text-5xl md:text-7xl uppercase max-w-prose w-full font-medium">
          Santiago Martelli
        </motion.h1>
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1}}
          className="text-lg text-pretty md:text-3xl w-11/12 md:w-10/12 2xl:w-8/12">
          <h2>
            Desarrollador Web Full Stack con conocimientos en HTML, CSS, JavaScript, React.js, Vue.js, PHP, Laravel,
            SQL y más.
          </h2>
        </motion.article>
        <div className="px-4 flex justify-center text-md">
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: .5}}
            href="#contact"
            className="flex justify-center items-center gap-1.5 px-4 py-2 transition duration-150 ease-in rounded-lg border border-black hover:border-green-600">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="w-3 h-3 bg-green-600 rounded-full animate-blink"></motion.div>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
              Disponible para trabajar!
            </motion.p>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
