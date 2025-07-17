"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Builder from '@/components/Builder';
import TemplatePreview from '@/components/Preview';
import { TemplateKey } from '@/lib/templates';

type Project = {
  name: string;
  description: string;
  link: string;
  tags: string[];
};

export default function BuilderPage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState(() => session?.user?.name || '');
  const [subtext, setSubtext] = useState('');
  const [repos, setRepos] = useState<string[]>(['']);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('light');
  const [showGithubIcon, setShowGithubIcon] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const username = session?.user?.username || '';

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!username) return;

      try {
        const res = await fetch(`/api/portfolio/${username}`);
        if (!res.ok) return;

        const data = await res.json();
        setName(data.name || '');
        setSubtext(data.subtext || '');
        setRepos(data.repoLinks?.length ? data.repoLinks : ['']);
        setSelectedTemplate(data.templateKey || 'light');
        setShowGithubIcon(!!data.showGithubIcon);
        setProjects(data.projects || []);
      } catch (err) {
        console.error('Failed to load portfolio:', err);
      }
    };

    if (status === 'authenticated') {
      fetchPortfolio();
    }
  }, [status, username]);

  if (status === 'loading') return <p className="p-6">Loading...</p>;
  if (!session) return <p className="p-6">You must be signed in to access this page.</p>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/3 lg:w-1/4 bg-[var(--background)] text-[var(--foreground)] p-6 border-b md:border-b-0 md:border-r overflow-y-auto">
        <Builder
          username={username}
          name={name}
          setName={setName}
          subtext={subtext}
          setSubtext={setSubtext}
          repos={repos}
          setRepos={setRepos}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          showGithubIcon={showGithubIcon}
          setShowGithubIcon={setShowGithubIcon}
          projects={projects}
          setProjects={setProjects}
        />
      </div>

      <div className="flex-1 overflow-y-auto min-h-[300px] p-4">
        <TemplatePreview
          username={username}
          name={name}
          subtext={subtext}
          repoLinks={repos}
          templateKey={selectedTemplate}
          showGithubIcon={showGithubIcon}
          projects={projects}
        />
      </div>
    </div>
  );
}