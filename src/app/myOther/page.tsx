"use client";
import { useState, useEffect } from "react";
import { FaApple, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Dot from "@/components/dot/Dot";
import Image from "next/image";

export default function MyOtherProjects() {
  const dotMessages = [
    "Welcome to my project showcase!",
    "Explore my iOS and Web applications",
    "EasyBudget - Comprehensive expense tracking",
    "MovieScout - Modern movie browsing platform",
    "GitHub Manager - Follower analytics tool",
    "Click any project to visit the live app!",
    "Built with Swift, React, and Next.js",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [dotKey, setDotKey] = useState(0);

  useEffect(() => {
    const totalAnimationTime = 7000;
    const timer = setTimeout(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % dotMessages.length);
      setDotKey((prev) => prev + 1);
    }, totalAnimationTime);

    return () => clearTimeout(timer);
  }, [currentMessageIndex, dotMessages.length]);

  const projects = [
    {
      title: "EasyBudget",
      subtitle: "iOS App",
      description:
        "A comprehensive budgeting application available on the App Store with intuitive expense tracking and financial insights.",
      image: "/easyBudget.png",
      platform: "iOS",
      platformIcon: <FaApple className="text-lg" />,
      tags: ["Swift", "iOS", "Finance", "Core Data"],
      color: "from-green-500 to-emerald-600",
      link: "https://apps.apple.com/se/app/easybudget/id6446150580?l=en-GB",
    },
    {
      title: "MovieScout",
      subtitle: "Web Platform",
      description:
        "A movie and TV show browsing platform with modern UI/UX, featuring detailed information and personalized recommendations.",
      image: "/MovieScoutLogo.png",
      platform: "Web",
      platformIcon: <FaExternalLinkAlt className="text-lg" />,
      tags: ["React", "Next.js", "TMDB API", "Tailwind"],
      color: "from-blue-500 to-cyan-600",
      link: "https://movie-scout-rho.vercel.app/",
    },
    {
      title: "GitHub Manager",
      subtitle: "Web Application",
      description:
        "An interactive web-based GitHub follower manager with analytics and relationship tracking features.",
      image: "/githubIcon.jpg",
      platform: "Web",
      platformIcon: <FaGithub className="text-lg" />,
      tags: ["JavaScript", "GitHub API", "Analytics", "Web"],
      color: "from-purple-500 to-violet-600",
      link: "https://github-followers-manager-sigma.vercel.app/",
    },
  ];

  const handleProjectClick = (projectLink: string) => {
    window.open(projectLink, "_blank");
  };

  return (
    <div className="grid w-full justify-center">
      {/*--------- Projects header section ----------*/}
      <section className="self-end mb-1 px-10">
        <div className="flex flex-col gap-2 w-full bg-neutral-600 rounded-t-2xl py-2">
          {/*--------- Projects dot UI ----------*/}
          <div className="flex w-full justify-center">
            <Dot
              key={dotKey}
              text={dotMessages[currentMessageIndex]}
              dotColor="bg-white my-1"
              textColor="text-white text-lg font-semibold"
              speed={60}
              className="w-fit"
            />
          </div>
        </div>
      </section>

      {/*--------- main projects section ----------*/}
      <div className="grid bg-neutral-600 p-6 rounded-3xl self-start max-w-6xl">
        {/*--------- Welcome message ----------*/}
        <div className="text-center mb-6">
          <h1 className="text-white text-3xl font-bold mb-4">My Other Projects</h1>
          <p className="text-white text-lg leading-relaxed">
            A collection of applications I&apos;ve built across different platforms and technologies.
          </p>
        </div>

        {/*--------- Projects Grid ----------*/}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-neutral-800 p-6 rounded-2xl hover:bg-neutral-700 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1 hover:scale-[1.02]"
              onClick={() => handleProjectClick(project.link)}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-neutral-700 rounded-lg group-hover:bg-neutral-600 transition-colors overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.subtitle}</p>
                </div>
                <div className="flex items-center gap-1 bg-neutral-700 px-2 py-1 rounded-full text-white text-xs">
                  {project.platformIcon}
                  <span>{project.platform}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-neutral-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/*--------- GitHub Profile Section ----------*/}
        <div className="bg-neutral-800 p-6 rounded-2xl mb-6 hover:shadow-xl hover:shadow-black/30 transition-all duration-300">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Image
              src="/kikoIcon.jpg"
              alt="GitHub"
              width={32}
              height={32}
              className="rounded-md object-cover"
            />
            <h3 className="text-white font-semibold text-xl">Find More Projects</h3>
          </div>
          <p className="text-gray-300 text-center mb-4">
            Visit my GitHub profile for complete project details, source code, and additional projects.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => {
                window.open("https://github.com/kikoDevv", "_blank");
              }}
              className="bg-neutral-700 hover:bg-neutral-600 px-6 py-3 text-white rounded-full cursor-pointer transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-black/40 hover:scale-105">
              <Image
                src="/githubIcon.jpg"
                alt="GitHub"
                width={20}
                height={20}
                className="rounded-sm object-cover"
              />
              <span className="font-medium">Visit GitHub Profile</span>
              <FaExternalLinkAlt className="text-sm" />
            </button>
          </div>
        </div>

        {/*--------- Footer message ----------*/}
        <div className="text-center">
          <p className="text-white font-medium mb-2">Portfolio Showcase</p>
          <p className="text-gray-400 text-sm">© 2025 KikoDevv. All projects available on GitHub.</p>
        </div>
      </div>
    </div>
  );
}
