import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

function LanguageSwitcher() {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;

  function changeLanguage(e) {
    const newLocale = e.target.value;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  }

  return (
    <div style={{ marginBottom: 24, textAlign: 'center' }}>
      <select
        value={locale}
        onChange={changeLanguage}
        style={{
          padding: '8px 16px',
          borderRadius: 6,
          border: '1px solid #1976d2',
          fontSize: '1rem',
          background: '#e3f2fd',
          color: '#0d47a1',
          fontWeight: 'bold',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="pa">ਪੰਜਾਬੀ</option>
      </select>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation('common');
  const cardData = [
    { href: '/hospital-chat', title: t('hospitalSupport'), desc: t('hospitalSupportDesc') },
    { href: '/symptom-checker', title: t('symptomChecker'), desc: t('symptomCheckerDesc') },
    { href: '/appointment', title: t('bookAppointment'), desc: t('bookAppointmentDesc') },
    { href: '/video-consult', title: t('videoConsult'), desc: t('videoConsultDesc') },
    { href: '/health-record', title: t('healthRecord'), desc: t('healthRecordDesc') },
    { href: '/doctor-view', title: t('doctorView'), desc: t('doctorViewDesc') },
    { href: '/patient-view', title: t('patientView'), desc: t('patientViewDesc') },
    { href: '/pharmacy', title: t('pharmacy'), desc: t('pharmacyDesc') },
    { href: '/pharmacy-admin', title: t('pharmacyAdmin'), desc: t('pharmacyAdminDesc') },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>NabhaCare - Your Health Platform</title>
        <meta name="description" content="NabhaCare Integrated Health Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <LanguageSwitcher />
        <h1 className={styles.title}>
          Welcome To Nabha Care!
        </h1>
        <div className={styles.grid}>
          {cardData.map((card, index) => (
            <Link href={card.href} key={index} legacyBehavior>
              <a className={styles.card}>
                <h2>{card.title}</h2>
                <p>{card.desc}</p>
              </a>
            </Link>
          ))}
          <Link href="/super-admin" legacyBehavior>
            <a className={`${styles.card} ${styles.superAdminCard}`}>
              <h2>{t('superAdmin')}</h2>
              <p>{t('superAdminDesc')}</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
