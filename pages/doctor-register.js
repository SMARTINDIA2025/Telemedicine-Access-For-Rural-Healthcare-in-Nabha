import { useRouter } from 'next/router';
import DoctorRegister from '../components/DoctorRegister';

export default function DoctorRegistrationPage() {
  const router = useRouter();

  const handleRegistration = (doctorData) => {
    // Redirect to login page after successful registration
    router.push('/doctor-view');
  };

  return (
    <div>
      <DoctorRegister onRegister={handleRegistration} />
    </div>
  );
}