'use client';

import React from 'react';
import { templates, TemplateKey } from '@/lib/templates';

type BuilderProps = {
  username: string;
  name: string;
  setName: (val: string) => void;
  subtext: string;
  setSubtext: (val: string) => void;
  repos: string[];
  setRepos: (repos: string[]) => void;
  selectedTemplate: TemplateKey;
  setSelectedTemplate: (val: TemplateKey) => void;
  showGithubIcon: boolean;
  setShowGithubIcon: (val: boolean) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
};

type Project = {
  name: string;
  description: string;
  link: string;
  tags: string[];
};

export default function Builder({
  username,
  name,
  setName,
  subtext,
  setSubtext,
  repos,
  setRepos,
  selectedTemplate,
  setSelectedTemplate,
  showGithubIcon,
  setShowGithubIcon,
}: BuilderProps) {
  const [status, setStatus] = React.useState<'idle' | 'publishing' | 'published' | 'error'>('idle');
  const [projects, setProjects] = React.useState<Project[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL ?? 'http://localhost:3000';

  const handleRepoChange = (value: string, index: number) => {
    const newRepos = [...repos];
    newRepos[index] = value;
    setRepos(newRepos);
  };

  const addRepoField = () => setRepos([...repos, '']);

  const addProject = () => {
    setProjects([...projects, { name: '', description: '', link: '', tags: [] }]);
  };

  const handlePublish = async () => {
    setStatus('publishing');
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          name,
          subtext,
          repoLinks: repos,
          projects, // include custom projects
          templateKey: selectedTemplate,
          showGithubIcon,
        }),
      });

      if (!res.ok) throw new Error('Failed to publish');
      setStatus('published');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Portfolio Builder</h1>

      <input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        placeholder="Subtext / Tagline"
        value={subtext}
        onChange={(e) => setSubtext(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <div className="mb-4">
        <label className="font-semibold">Select Template:</label>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value as TemplateKey)}
          className="w-full p-2 mt-1 border rounded"
        >
          {Object.keys(templates).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <label className="font-semibold">Projects:</label>
        {projects.map((proj, idx) => (
          <div key={idx} className="border p-3 mt-3 rounded bg-gray-50">
            <input
              className="w-full p-2 mb-2 border rounded"
              placeholder="Project Name"
              value={proj.name}
              onChange={(e) => {
                const updated = [...projects];
                updated[idx].name = e.target.value;
                setProjects(updated);
              }}
            />
            <textarea
              className="w-full p-2 mb-2 border rounded"
              placeholder="Description"
              value={proj.description}
              onChange={(e) => {
                const updated = [...projects];
                updated[idx].description = e.target.value;
                setProjects(updated);
              }}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              placeholder="Project Link (optional)"
              value={proj.link}
              onChange={(e) => {
                const updated = [...projects];
                updated[idx].link = e.target.value;
                setProjects(updated);
              }}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              placeholder="Tags (comma-separated)"
              value={proj.tags.join(', ')}
              onChange={(e) => {
                const updated = [...projects];
                updated[idx].tags = e.target.value.split(',').map(tag => tag.trim());
                setProjects(updated);
              }}
            />
          </div>
        ))}
        <button onClick={addProject} className="text-blue-500 mt-2">
          + Add another project
        </button>
      </div>

      <div className="mt-6">
        <label className="font-semibold">GitHub Repositories:</label>
        {repos.map((repo, index) => (
          <input
            key={index}
            placeholder="https://github.com/user/repo"
            value={repo}
            onChange={(e) => handleRepoChange(e.target.value, index)}
            className="w-full p-2 mt-2 border rounded"
          />
        ))}
        <button onClick={addRepoField} className="text-blue-500 mt-3">
          + Add another repo
        </button>
      </div>

      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={showGithubIcon}
            onChange={(e) => setShowGithubIcon(e.target.checked)}
            className="mr-2"
          />
          Show GitHub icon
        </label>
      </div>

      <button
        onClick={handlePublish}
        disabled={status === 'publishing'}
        className="w-full bg-blue-600 text-white py-2 rounded mt-6 hover:bg-blue-700"
      >
        Publish
      </button>

      {status === 'publishing' && <p className="text-sm text-gray-500 mt-2">Publishing...</p>}
      {status === 'published' && (
        <p className="text-sm text-green-600 mt-2">
          Published successfully! View your portfolio at{' '}
          <a className="underline" href={`${baseUrl}/${username}`}>
            {baseUrl}/{username}
          </a>
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 mt-2">Failed to publish.</p>
      )}
    </div>
  );
}