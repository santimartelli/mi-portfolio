import { useState, useEffect } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const sections = ["home", "about", "projects", "skills", "contact"];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Adjust these values to better control when a section is considered active
      threshold: 0.1, // Trigger when at least 10% of the target is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Register all sections with the observer
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    // Also add a scroll event listener as a fallback
    const onScroll = () => {
      // Find which section is most visible in the viewport
      let maxVisibleSection = "";
      let maxVisiblePercentage = 0;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the section is visible
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visiblePercentage = visibleHeight / rect.height;

        if (visiblePercentage > maxVisiblePercentage) {
          maxVisiblePercentage = visiblePercentage;
          maxVisibleSection = section;
        }
      });

      if (maxVisibleSection && maxVisiblePercentage > 0.2) {
        setActiveSection(maxVisibleSection);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      // Clean up the observer and scroll listener when component unmounts
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return activeSection;
}
