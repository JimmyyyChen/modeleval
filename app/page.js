import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-left">
      <div className="flex flex-col sm:flex-row items-center">
        <img src="logo.png" alt="logo" className="h-24" />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          ModelEval
        </h1>
      </div>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Anim autee id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
        cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
      </p>
      <SignedOut>
        <div className="mt-10 flex items-center justify-left gap-x-3">
          <Link href="/sign-up" className="btn btn-accent">
            注册
          </Link>
          <Link href="/sign-in" className="btn btn-secondary">
            登录
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}
