import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container footer mx-auto flex flex-col items-center space-y-6 px-2 py-2 sm:flex-row sm:justify-between sm:space-y-0 sm:px-6 lg:px-8">
      <div className="flex flex-shrink-0 flex-col items-center space-y-4 sm:h-full sm:flex-row sm:space-x-6 sm:space-y-0">
        <div className="flex flex-shrink-0 items-center">
          <Link href="/">
            {/* <Image
              width={64}
              height={64}
              src="/logo.png"
              alt="ModalEval Logo"
              priority
            /> */}
            <h1 className="font-['Monaco'] font-bold tracking-tight text-primary text-lg">
              ModelEval
            </h1>
          </Link>
        </div>
        <div className="flex flex-shrink-0 flex-col items-center text-sm text-gray-500 sm:flex-row">
          <div>
            <p>&copy; 2023 ModalEval.&nbsp;</p>
          </div>
          <div>
            <p>All right reserved.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 text-gray-500 sm:flex-row sm:space-x-6 sm:space-y-0">
        <a
          href="mailto:chenjimmy91@hotmail.com"
          className="flex flex-row items-center space-x-2 hover:font-semibold hover:text-gray-700 sm:flex-col sm:space-x-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>

          <p className="text-sm text-gray-600">Contact</p>
        </a>
      </div>
    </footer>
  );
}
