export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-left">
        <div className="flex items-center">
          <img src="logo.png" alt="logo" className="h-24" />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            ModelEval
          </h1>
        </div>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
        </p>
        <div className="mt-10 flex items-center justify-left gap-x-3">
          <a
            href="/registration"
            className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            注册
          </a>
          <a
            href="/sign-in"
            className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            登录
          </a>
        </div>
      </div>
    </main>
  )
}
