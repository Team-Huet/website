import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { GradientText } from '@/components/react-bits/GradientText/GradientText';
import { Trajectory } from '@/components/ui/Trajectory/Trajectory';
import { SectionEntrance } from '@/components/ui/SectionEntrance';
import { SiteFrame } from './SiteFrame';
import styles from './page.module.scss';

const editorialText = {
  strong: (text: ReactNode) => (
    <strong className={styles.emphasis}>{text}</strong>
  ),
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Home');

  return (
    <SiteFrame locale={locale}>
      <main id="main" tabIndex={-1}>
        <section id="home" className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" />
              {t('eyebrow')}
            </p>
            <h1 id="hero-title">
              <span>{t('title')}</span>{' '}
              <span className={styles.terminalLine}>
                <GradientText
                  colors={['var(--hero-gold-peak)', 'var(--hero-gold-shade)']}
                >
                  {t('titleAccent')}
                </GradientText>
                <span aria-hidden="true" className={styles.cursor}>
                  _
                </span>
              </span>
            </h1>
            <p className={styles.description}>{t('description')}</p>
            <a className={styles.explore} href="#initiative">
              {t('explore')}
            </a>
            <p className={styles.status}>
              <span aria-hidden="true" />
              {t('status')}
            </p>
          </div>
          <Trajectory play={t('playMotion')} pause={t('pauseMotion')} />
        </section>
        <SectionEntrance>
          <section
            className={styles.initiative}
            id="initiative"
            aria-labelledby="initiative-title"
          >
            <div>
              <p className={styles.eyebrow}>{t('sectionLabel')}</p>
              <h2 id="initiative-title">
                {t.rich('sectionTitle', editorialText)}
              </h2>
            </div>
            <div className={styles.initiativeCopy}>
              <p>{t.rich('sectionBody', editorialText)}</p>
              <p>{t('sectionNote')}</p>
            </div>
          </section>
          <section
            className={styles.challenge}
            id="challenge"
            aria-labelledby="challenge-title"
          >
            <p className={styles.eyebrow}>{t('challengeLabel')}</p>
            <h2 id="challenge-title">{t('challengeTitle')}</h2>
            <p className={styles.challengeBody}>
              {t.rich('challengeBody', editorialText)}
            </p>
          </section>
          <section
            className={styles.proposal}
            id="proposal"
            aria-labelledby="proposal-title"
          >
            <div>
              <p className={styles.eyebrow}>{t('proposalLabel')}</p>
              <h2 id="proposal-title">{t('proposalTitle')}</h2>
              <p>{t.rich('proposalBody', editorialText)}</p>
            </div>
            <dl>
              {(['record', 'describe', 'consult'] as const).map((topic) => (
                <div key={topic}>
                  <dt>{t(`${topic}Title`)}</dt>
                  <dd>{t.rich(`${topic}Body`, editorialText)}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section
            id="applications"
            className={styles.applications}
            aria-labelledby="applications-title"
          >
            <p className={styles.eyebrow}>{t('applicationsLabel')}</p>
            <h2 id="applications-title">{t('applicationsTitle')}</h2>
            <p className={styles.applicationsIntro}>{t('applicationsIntro')}</p>
            <div className={styles.applicationItems}>
              {(['linguistics', 'vision', 'ai'] as const).map((area) => (
                <details key={area} open={area === 'linguistics'}>
                  <summary>{t(`${area}Title`)}</summary>
                  <p>{t(`${area}Example`)}</p>
                </details>
              ))}
            </div>
          </section>
        </SectionEntrance>
        <section
          id="contact"
          className={styles.proposal}
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title">{t('contactLabel')}</h2>
          <p className={styles.contactEmail}>joao@huet.io</p>
        </section>
      </main>
    </SiteFrame>
  );
}
