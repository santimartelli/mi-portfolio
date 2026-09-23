// Sección de proyectos: casos de estudio, no escaparates de tecnología.
import { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import type { ProjectsTranslations } from '../../util/i18n';

/**
 * Proyectos.
 *
 * Cada caso de estudio responde al mismo guion: qué problema había, qué
 * solución se planteó, cuál fue mi rol, cómo se implementó y evolucionó, y qué
 * resultado tuvo. La tabla de métricas solo aparece si existen números medidos.
 */
interface ProjectsProps {
  content: ProjectsTranslations;
}

const Projects = ({ content: t }: ProjectsProps) => {

  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0.05 });

  return (
    <section id="projects" className="relative w-full bg-white dark:bg-gray-950 py-32 md:py-40">
      <div ref={contentRef} className="w-full">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8">
          {/* Encabezado */}
          <header className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-light text-black dark:text-white leading-tight mb-8 tracking-tight">
              {t.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              {t.description}
            </motion.p>
          </header>

          {/* Casos de estudio */}
          <div className="space-y-16">
            {t.projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                aria-labelledby={`project-${project.id}`}
                className="border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20">
                {/* Imagen */}
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width={1200}
                    height={675}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <p className="absolute top-4 right-4 px-3 py-1 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" aria-hidden="true" />
                    {t.status[project.status]}
                  </p>
                </div>

                <div className="p-6 sm:p-10">
                  {/* Cabecera del caso */}
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 font-medium mb-3">
                      {project.category} · {project.period}
                    </p>
                    <h3
                      id={`project-${project.id}`}
                      className="text-2xl md:text-3xl font-light text-black dark:text-white tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Problema / solución / rol */}
                  <dl className="grid lg:grid-cols-3 gap-8 mb-10">
                    <div>
                      <dt className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full" aria-hidden="true" />
                        {t.labels.problem}
                      </dt>
                      <dd className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                        {project.problem}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full" aria-hidden="true" />
                        {t.labels.solution}
                      </dt>
                      <dd className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                        {project.solution}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-400 dark:bg-green-500 rounded-full" aria-hidden="true" />
                        {t.labels.role}
                      </dt>
                      <dd className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                        {project.role}
                      </dd>
                    </div>
                  </dl>

                  {/* Implementación y evolución */}
                  <div className="mb-10">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-4">
                      {t.labels.implementation}
                    </h4>
                    <ul className="list-disc list-outside pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400 font-light marker:text-gray-400 dark:marker:text-gray-600">
                      {project.implementation.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Resultado */}
                  <div className="mb-10 border-l-2 border-blue-400 dark:border-blue-500 pl-5">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3">
                      {t.labels.result}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                      {project.result}
                    </p>
                  </div>

                  {/* Métricas medidas */}
                  {project.metrics && (
                    <div className="mb-10 overflow-x-auto">
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-4">
                        {project.metrics.title}
                      </h4>
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr>
                            {project.metrics.columns.map((column) => (
                              <th
                                key={column}
                                scope="col"
                                className="text-left font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest text-xs pb-3 border-b border-gray-200 dark:border-gray-700 pr-6">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {project.metrics.rows.map((row) => (
                            <tr key={row[0]}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={`${row[0]}-${cellIndex}`}
                                  className={`py-2.5 border-b border-gray-100 dark:border-gray-700/50 pr-6 font-light ${
                                    cellIndex === 0
                                      ? 'text-gray-700 dark:text-gray-300'
                                      : 'text-gray-500 dark:text-gray-500'
                                  }`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Stack */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3">
                        {t.labels.technology}
                      </h4>
                      <ul className="list-none flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="text-xs px-2 py-1 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-light">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.previousStack && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3">
                          {t.labels.previousStack}
                        </h4>
                        <ul className="list-none flex flex-wrap gap-2">
                          {project.previousStack.map((tech) => (
                            <li
                              key={tech}
                              className="text-xs px-2 py-1 border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-500 font-light">
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Enlaces */}
                  <div className="flex flex-wrap items-center gap-6 mt-8">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-light text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300 uppercase tracking-widest flex items-center gap-2">
                        <HiExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        {t.labels.visit}
                        <span className="sr-only"> — {project.title}</span>
                      </a>
                    )}
                    {project.code && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-light text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300 uppercase tracking-widest flex items-center gap-2">
                        <FaGithub className="w-3.5 h-3.5" aria-hidden="true" />
                        {t.labels.code}
                        <span className="sr-only"> — {project.title}</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);
