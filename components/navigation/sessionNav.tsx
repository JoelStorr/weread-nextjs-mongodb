import Link from "next/link";

const SessionAuth: React.FC = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/community">Community</Link>
        </li>
      </ul>
    </>
  );
}

export default SessionAuth;