'use client';

import { useState } from 'react';
import { templates, TemplateKey } from '@/lib/templates';
import TemplatePreview from '@/components/Preview';

type BuilderProps = {
  defaultName: string;
  defaultSubtext: string;
};

export default function Builder() {
  const [name, setName] = useState('');
  const [subtext, setSubtext] = useState('');
  const [repos, setRepos] = useState<string[]>(['']);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('light');

  const handleRepoChange = (value: string, index: number) => {
    const newRepos = [...repos];
    newRepos[index] = value;
    setRepos(newRepos);
  };

  const addRepoField = () => setRepos([...repos, '']);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Portfolio Builder</h1>

      <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border" />
      <input placeholder="Subtext / Tagline" value={subtext} onChange={e => setSubtext(e.target.value)} className="w-full p-2 border" />

      <div>
        <label className="font-semibold">Select Template:</label>
        <select
          value={selectedTemplate}
          onChange={e => setSelectedTemplate(e.target.value as TemplateKey)}
          className="w-full p-2 border mt-1"
        >
          {Object.keys(templates).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="font-semibold">Featured GitHub Repositories:</label>
        {repos.map((repo, index) => (
          <input
            key={index}
            placeholder="https://github.com/user/repo"
            value={repo}
            onChange={e => handleRepoChange(e.target.value, index)}
            className="w-full p-2 border"
          />
        ))}
        <button onClick={addRepoField} className="text-blue-500 mt-2">+ Add another repo</button>
      </div>

      <TemplatePreview name={name} subtext={subtext} repoLinks={repos} templateKey={selectedTemplate} />
    </div>
  );
}