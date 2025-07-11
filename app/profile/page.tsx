"use client";

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Builder from '@/components/Builder';
import TemplatePreview from '@/components/Preview';
import { TemplateKey } from '@/lib/templates';

export default function BuilderPage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const [subtext, setSubtext] = useState('');
  const [repos, setRepos] = useState<string[]>(['']);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('light');
  const [showGithubIcon, setShowGithubIcon] = useState(false);

  if (status === 'loading') return <p className="p-6">Loading...</p>;
  if (!session) return <p className="p-6">You must be signed in to access this page.</p>;

  const username = session.user?.name || '';

  return (
    <div className="flex min-h-screen">
      <div className="md:w-1/3 lg:w-1/4 bg-gray-100 p-6 border-r overflow-y-auto">
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
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <TemplatePreview
          username={username}
          name={name}
          subtext={subtext}
          repoLinks={repos}
          templateKey={selectedTemplate}
          showGithubIcon={showGithubIcon}
        />
      </div>
    </div>
  );
}