import { Metadata } from 'next';
import HallOfFamePage from './HallOfFame';

export const metadata: Metadata = {
  title: 'Hall of Fame | Security Acknowledgements | Sajal Gupta',
  description: 'View my security acknowledgements from major companies like Google, Apple, Microsoft, and more for responsibly disclosing vulnerabilities.',
  keywords: 'security researcher, bug bounty, hall of fame, vulnerability disclosure, security acknowledgements, white hat hacker, ethical hacker, Sajal Gupta',
  openGraph: {
    title: 'Security Hall of Fame | Sajal Gupta',
    description: 'Security acknowledgements from major tech companies for responsible vulnerability disclosure',
    url: 'https://guptasajal.com/hall-of-fame',
    type: 'website',
  },
};

export default function Page() {
  return <HallOfFamePage />;
} 