import { getTranslations } from 'next-intl/server';
import { SiteFrame } from '../SiteFrame';
import styles from '../page.module.scss';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return { title: t('aboutLabel'), description: t('aboutBody') };
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('Home');
  return (
    <SiteFrame locale={locale} about>
      <main className={styles.aboutPage} id="main" tabIndex={-1}>
        <h1>{t('aboutLabel')}</h1>
        <h2>{t('aboutTitle')}</h2>
        <p>{t('aboutBody')}</p>
      </main>
    </SiteFrame>
  );
}
