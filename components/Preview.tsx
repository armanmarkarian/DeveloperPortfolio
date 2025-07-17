'use client';

import { useEffect, useState } from 'react';
import { templates, TemplateKey } from '@/lib/templates';
import { FaGithub } from 'react-icons/fa';
import React from 'react'

type Project = {
  name: string;
  description: string;
  link: string;
  tags: string[];
};

type Props = {
  username: string;
  name: string;
  subtext: string;
  repoLinks: string[];
  templateKey: TemplateKey;
  showGithubIcon: boolean;
  projects: Project[];
};

export default function TemplatePreview({ username, name, subtext, repoLinks, templateKey, showGithubIcon, projects = [], }: Props) {
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
      className="min-h-screen flex flex-col items-center justify-start"
      style={{
        fontFamily: template.font,
        backgroundColor: template.colors.background,
        color: template.colors.text,
        paddingBottom: '4rem',
      }}
    >
      <div
        style={{
          paddingTop: template.layout?.padding,
          maxWidth: template.layout?.maxWidth,
          width: '100%',
          textAlign: 'left',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>{name}</h1>
        <p style={{ color: template.colors.subtext, fontSize: template.subheading?.fontSize }}>
          {subtext}
        </p>
        {showGithubIcon && username && (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center mt-2 text-blue-500 hover:underline"
          >
            <FaGithub className="w-5 h-5 mr-1" />
            @{username}
          </a>
        )}
  
        {/* Render projects if any */}
        {projects.length > 0 && (
          <div
            className="grid mt-6"
            style={{
              gap: template.layout?.gap,
            }}
          >
            {projects.map((proj, i) => (
              <div
                key={`custom-${i}`}
                style={{
                  backgroundColor: template.colors.cardBackground,
                  padding: template.cardStyle.padding,
                  borderRadius: template.cardStyle.borderRadius,
                  boxShadow: template.cardStyle.boxShadow,
                }}
              >
                <h3 style={{ fontWeight: 700 }}>{proj.name}</h3>
                <p>{proj.description}</p>
                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  {proj.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: template.colors.accent,
                      textDecoration: 'underline',
                      display: 'inline-block',
                      marginTop: '0.5rem',
                    }}
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
  
        {/* Render repos */}
        <div
          className="grid mt-6"
          style={{
            gap: template.layout?.gap,
          }}
        >
          {repos.map((repo, i) => (
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
                rel="noreferrer"
                style={{
                  color: template.colors.accent,
                  textDecoration: 'underline',
                }}
              >
                View Repo
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}