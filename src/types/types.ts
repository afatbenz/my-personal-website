export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  thumbnail: string;
  features?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ApiResponse<T> {
  data: T;
  error: string | null;
}