import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignUp from "../components/SignUp";

export default function SignUpPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <SignUp />;
      </div>
    </div>
  );
}
