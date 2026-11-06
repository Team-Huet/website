import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('NotFound');
  return (
    <main className="error-page">
      <p>HUET / 404</p>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <Link href="/">{t('back')}</Link>
    </main>
  );
}
