import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
  HiOutlineChatAlt2,
  HiOutlineClipboardCheck,
  HiOutlineCalendar,
  HiOutlineVideoCamera,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineUser,
  HiOutlineShoppingCart,
  HiOutlineCog,
  HiOutlineShieldCheck,
} from "react-icons/hi"; // Heroicons

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
        className="px-4 py-2 rounded-lg border border-blue-600 bg-blue-50 text-blue-800 font-semibold cursor-pointer shadow-md"
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
      icon: <HiOutlineChatAlt2 className="w-8 h-8 text-blue-600" />,
    },
    {
      href: "/symptom-checker",
      title: t("symptomChecker"),
      desc: t("symptomCheckerDesc"),
      icon: <HiOutlineClipboardCheck className="w-8 h-8 text-green-600" />,
    },
    {
      href: "/appointment",
      title: t("bookAppointment"),
      desc: t("bookAppointmentDesc"),
      icon: <HiOutlineCalendar className="w-8 h-8 text-purple-600" />,
    },
    {
      href: "/video-consult",
      title: t("videoConsult"),
      desc: t("videoConsultDesc"),
      icon: <HiOutlineVideoCamera className="w-8 h-8 text-red-500" />,
    },
    {
      href: "/health-record",
      title: t("healthRecord"),
      desc: t("healthRecordDesc"),
      icon: <HiOutlineDocumentText className="w-8 h-8 text-indigo-600" />,
    },
    {
      href: "/doctor-view",
      title: t("doctorView"),
      desc: t("doctorViewDesc"),
      icon: <HiOutlineUserGroup className="w-8 h-8 text-teal-600" />,
    },
    {
      href: "/patient-view",
      title: t("patientView"),
      desc: t("patientViewDesc"),
      icon: <HiOutlineUser className="w-8 h-8 text-orange-500" />,
    },
    {
      href: "/pharmacy",
      title: t("pharmacy"),
      desc: t("pharmacyDesc"),
      icon: <HiOutlineShoppingCart className="w-8 h-8 text-pink-500" />,
    },
    {
      href: "/pharmacy-admin",
      title: t("pharmacyAdmin"),
      desc: t("pharmacyAdminDesc"),
      icon: <HiOutlineCog className="w-8 h-8 text-gray-700" />,
    },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Head>
        <title>NabhaCare - Your Health Platform</title>
        <meta name="description" content="NabhaCare Integrated Health Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/ministry.png"
          alt="Healthcare Background"
          fill
          className="object-cover opacity-15 mix-blend-overlay"
          priority
          unoptimized
        />
      </div>

      <main className="flex flex-col items-center px-6 py-10 relative z-10">
        {/* Header with Punjab Logo, Language Switcher, and Ministry Logo */}
        <div className="w-full max-w-6xl mb-6 flex justify-between items-center">
          <div className="w-48 h-24 relative">
            <Image
              src="/images/ministry.png"
              alt="Punjab Government Logo"
              width={100}
              height={100}
              className="object-contain"
              priority
              unoptimized
            />
          </div>
          <LanguageSwitcher />
          <div className="w-48 h-24 relative">
            <Image
              src="/images/punjab.png"
              alt="Ministry Logo"
              width={100}
              height={100}
              className="object-contain background-white rounded-lg"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Banner Section */}
        <div className="w-full max-w-6xl mb-10 relative rounded-2xl overflow-hidden shadow-xl">
          <div className="aspect-[21/9] relative">
            <Image
              src="/images/banner.jpg"
              alt="Healthcare Banner"
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
              <div className="p-8 text-white max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Transforming Rural Healthcare</h2>
                <p className="text-lg text-white/90">
                  Bringing quality healthcare services to the doorsteps of 173 villages in Nabha
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 text-center mb-4 drop-shadow-lg">
          Welcome To Nabha Care!
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mb-10">
          Bridging healthcare gaps for 173 villages through telemedicine,
          multilingual consultations, and real-time access to medical support.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {cardData.map((card, index) => (
            <Link href={card.href} key={index} legacyBehavior>
              <a className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-200 hover:border-green-500 flex flex-col gap-3">
                {card.icon}
                <h2 className="text-xl font-semibold text-green-800">{card.title}</h2>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </a>
            </Link>
          ))}

          {/* Super Admin Card */}
          <Link href="/super-admin" legacyBehavior>
            <a className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col gap-3">
              <HiOutlineShieldCheck className="w-8 h-8" />
              <h2 className="text-xl font-semibold">{t("superAdmin")}</h2>
              <p className="text-sm">{t("superAdminDesc")}</p>
            </a>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-gray-600 text-sm text-center border-t pt-4 w-full">
          © {new Date().getFullYear()} Nabha Care • SIH Telemedicine Solution <br />
          In collaboration with <span className="font-semibold">Punjab Government</span> &{" "}
          <span className="font-semibold">Ministry of Health</span>
        </footer>
      </main>
    </div>
  );
}
