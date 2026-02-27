import React from 'react';
import { FaCode, FaJava, FaReact, FaAws } from 'react-icons/fa';
import { SiSpringboot, SiApachekafka } from 'react-icons/si';

export const skillCategories = [
  { title: "Languages", skills: ["Java (Core/Advanced)", "JavaScript (ES6+)", "Python", "SQL"], icon: React.createElement(FaCode) },
  { title: "Backend", skills: ["Spring Boot", "Microservices", "RESTful APIs", "System Design"], icon: React.createElement(FaJava) },
  { title: "Frontend", skills: ["React.js", "Redux", "Tailwind CSS", "Framer Motion"], icon: React.createElement(FaReact) },
  { title: "DevOps", skills: ["AWS", "Docker", "Kubernetes", "Kafka", "CI/CD"], icon: React.createElement(FaAws) }
];

export const experiences = [
  {
    company: "Tata Consultancy Services",
    role: "Software Development Engineer",
    period: "Sep 2023 – Present",
    achievements: [
      "Re-architected legacy batch processing system reducing workflow time by 95%",
      "Engineered event-driven microservices using Apache Kafka",
      "Maintained 99.9% uptime with robust CI/CD pipelines"
    ]
  },
  {
    company: "Claysys Technologies",
    role: "RPA Developer",
    period: "Jun 2023 – Aug 2023",
    achievements: [
      "Designed workflow automation tools reducing manual reporting by 30%",
      "Integrated backend services for better data visibility"
    ]
  },
  {
    company: "Freelancer",
    role: "Full Stack Developer",
    period: "Jun 2022 – Jun 2023",
    achievements: [
      "Architected academic management platform automating workflows by 40%",
      "Implemented secure RBAC and OAuth2 integration"
    ]
  }
];

export const projects = [
  {
    title: "Real-Time Event Processing",
    tech: ["Kafka", "Spring Boot", "PostgreSQL"],
    desc: "Scalable event streaming pipeline improving throughput by 60%.",
    icon: React.createElement(SiApachekafka)
  },
  {
    title: "Railway Management System",
    tech: ["Java", "React", "MySQL"],
    desc: "Concurrent reservation system with optimistic locking.",
    icon: React.createElement(FaJava)
  },
  {
    title: "E-Commerce Microservices",
    tech: ["Spring Cloud", "Docker", "K8s"],
    desc: "Fully distributed e-commerce backend with discovery service.",
    icon: React.createElement(SiSpringboot)
  }
];