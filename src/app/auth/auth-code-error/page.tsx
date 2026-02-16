import Link from "next/link";

export default function AuthCodeError() {
  return (
    <div>
      <h1>Authentication Error</h1>
      <p>There was an error signing in. Please try again.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
