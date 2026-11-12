import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle';
import { SectionMenu } from '@/components/ui/SectionMenu';
import styles from './page.module.scss';
export async function SiteFrame({
  locale,
  about = false,
  children,
}: {
  locale: string;
  about?: boolean;
  children: ReactNode;
}) {
  const nextLocale = locale === 'pt-BR' ? 'en' : 'pt-BR';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const t = await getTranslations('Home');
  const nav = await getTranslations('Navigation');

  const languageLabel = nav(nextLocale === 'en' ? 'english' : 'portuguese');

  return (
    <>
      <a href="#main" className="skip-link">
        {nav('skip')}
      </a>
      <header className={styles.header}>
        <Link href="/" aria-label={nav('home')} className={styles.wordmark}>
          HU
          <span className={styles.etLetters}>ET</span>
          <svg
            className={styles.etLigature}
            viewBox="0 0 3462 1536"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="currentColor"
              d="M192 0H3491V160H2723V1536H2531V160H384V672H1645V832H384V1376H1728V1536H192Z"
            />
          </svg>
          <span className={styles.logoDot} aria-hidden="true" />
        </Link>
        <nav
          className="flex items-center gap-1 sm:gap-4"
          aria-label={t('sectionsLabel')}
        >
          {/* Each locale owns its HTML document and server-rendered theme script. */}
          <a
            href={`${basePath}/${nextLocale}/${about ? 'about/' : ''}`}
            lang={nextLocale}
            hrefLang={nextLocale}
            aria-label={languageLabel}
            title={languageLabel}
            className={styles.language}
          >
            <span key={locale}>
              <Image
                src={`${basePath}/flags/${locale === 'en' ? 'us' : 'br'}.svg`}
                width={32}
                height={32}
                alt=""
                unoptimized
              />
            </span>
          </a>
          <ThemeToggle label={nav('theme')} />
          <SectionMenu title={nav('menu')}>
            {(
              [
                ['home', 'heroLabel'],
                ['about', 'aboutLabel'],
                ['contact', 'contactLabel'],
              ] as const
            ).map(([id, label]) => (
              <a
                key={id}
                aria-current={about && id === 'about' ? 'page' : undefined}
                href={
                  id === 'about'
                    ? `${basePath}/${locale}/about/`
                    : `${about ? `${basePath}/${locale}/` : ''}#${id}`
                }
              >
                {t(label)}
              </a>
            ))}
          </SectionMenu>
        </nav>
      </header>
      {children}
      <footer className={styles.footer}>
        <span>HUET</span>
        <p>{t('footer')}</p>
      </footer>
    </>
  );
}
