import { notFound } from 'next/navigation';
import TemplatePreview from '@/components/Preview';
import { getPortfolioByUsername } from '@/lib/firebase';

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const data = await getPortfolioByUsername(params.username);

  if (!data) return notFound();

  return (
    <div className="min-h-screen">
      <TemplatePreview
        username={data.username}
        name={data.name}
        subtext={data.subtext}
        repoLinks={data.repoLinks}
        templateKey={data.templateKey}
        showGithubIcon={data.showGithubIcon}
      />
    </div>
  );
}