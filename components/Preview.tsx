'use client';

import { useEffect, useState } from 'react';
import { templates, TemplateKey } from '@/lib/templates';

type Props = {
  name: string;
  subtext: string;
  repoLinks: string[];
  templateKey: TemplateKey;
};

export default function TemplatePreview({ name, subtext, repoLinks, templateKey }: Props) {
  const [repos, setRepos] = useState<any[]>([]);
  const template = templates[templateKey];

  useEffect(() => {
    async function fetchRepos() {
      const results = await Promise.all(
        repoLinks.filter(Boolean).map(async (url) => {
          try {
            const res = await fetch('/api/github/repository-info', {
              method: 'POST',
              body: JSON.stringify({ repoUrl: url }),
              headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
              console.error('Failed to fetch repo:', url);
              return null;
            }

            return res.json();
          } catch (err) {
            console.error('Error fetching repo:', err);
            return null;
          }
        })
      );

      setRepos(results.filter(Boolean));
    }

    if (repoLinks.length) {
      fetchRepos();
    }
  }, [repoLinks]);

  return (
    <div
      className="border-t mt-6"
      style={{
        paddingTop: template.layout?.padding,
        fontFamily: template.font,
        color: template.colors.text,
        backgroundColor: template.colors.background,
        maxWidth: template.layout?.maxWidth,
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: template.heading?.fontSize,
          fontWeight: template.heading?.fontWeight,
          marginBottom: '1rem',
        }}
      >
        Preview
      </h2>

      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>{name}</h1>
      <p style={{ color: template.colors.subtext, fontSize: template.subheading?.fontSize }}>
        {subtext}
      </p>

      <div
        className="grid mt-4"
        style={{
          gap: template.layout?.gap,
        }}
      >
        {repos.length === 0 ? (
          <p style={{ color: template.colors.subtext }}>No repositories loaded.</p>
        ) : (
          repos.map((repo, i) => (
            <div
              key={i}
              style={{
                backgroundColor: template.colors.cardBackground,
                padding: template.cardStyle.padding,
                borderRadius: template.cardStyle.borderRadius,
                boxShadow: template.cardStyle.boxShadow,
              }}
            >
              <h3 style={{ fontWeight: 700 }}>{repo.name}</h3>
              <p>{repo.description}</p>
              <p style={{ fontSize: '0.875rem', color: template.colors.subtext }}>
                ⭐ {repo.stargazers_count} • 🍴 {repo.forks_count}
              </p>
              <a
                href={repo.html_url}
                target="_blank"
                style={{
                  color: template.colors.accent,
                  textDecoration: 'underline',
                }}
              >
                View Repo
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}