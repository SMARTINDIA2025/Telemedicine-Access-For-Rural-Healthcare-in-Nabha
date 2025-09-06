import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

// ---------------- LANGUAGE SWITCHER ----------------
function LanguageSwitcher() {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;

  function changeLanguage(e) {
    const newLocale = e.target.value;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  }

  return (
    <div className="mb-6 text-center">
      <select
        value={locale}
        onChange={changeLanguage}
        className="px-4 py-2 rounded-lg border border-blue-600 bg-blue-50 text-blue-800 font-semibold cursor-pointer shadow-sm"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="pa">ਪੰਜਾਬੀ</option>
      </select>
    </div>
  );
}

// ---------------- MAIN PAGE ----------------
export default function Home() {
  const { t } = useTranslation("common");

  const cardData = [
    {
      href: "/hospital-chat",
      title: t("hospitalSupport"),
      desc: t("hospitalSupportDesc"),
    },
    {
      href: "/symptom-checker",
      title: t("symptomChecker"),
      desc: t("symptomCheckerDesc"),
    },
    {
      href: "/appointment",
      title: t("bookAppointment"),
      desc: t("bookAppointmentDesc"),
    },
    {
      href: "/video-consult",
      title: t("videoConsult"),
      desc: t("videoConsultDesc"),
    },
    {
      href: "/health-record",
      title: t("healthRecord"),
      desc: t("healthRecordDesc"),
    },
    {
      href: "/doctor-view",
      title: t("doctorView"),
      desc: t("doctorViewDesc"),
    },
    {
      href: "/patient-view",
      title: t("patientView"),
      desc: t("patientViewDesc"),
    },
    {
      href: "/pharmacy",
      title: t("pharmacy"),
      desc: t("pharmacyDesc"),
    },
    {
      href: "/pharmacy-admin",
      title: t("pharmacyAdmin"),
      desc: t("pharmacyAdminDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>NabhaCare - Your Health Platform</title>
        <meta
          name="description"
          content="NabhaCare Integrated Health Platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center px-6 py-10">
        {/* Language Switch */}
        <LanguageSwitcher />

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-4">
          Welcome To Nabha Care!
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-10">
          Bridging healthcare gaps for 173 villages through telemedicine,
          multilingual consultations, and real-time access to medical support.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {cardData.map((card, index) => (
            <Link href={card.href} key={index} legacyBehavior>
              <a className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between border border-gray-200 hover:border-blue-500">
                <h2 className="text-xl font-semibold text-gray-900">
                  {card.title}
                </h2>
                <p className="mt-2 text-gray-600 text-sm">{card.desc}</p>
              </a>
            </Link>
          ))}

          {/* Super Admin Card */}
          <Link href="/super-admin" legacyBehavior>
            <a className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h2 className="text-xl font-semibold">{t("superAdmin")}</h2>
              <p className="mt-2 text-sm">{t("superAdminDesc")}</p>
            </a>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} Nabha Care • SIH Telemedicine Solution
        </footer>
      </main>
    </div>
  );
}
