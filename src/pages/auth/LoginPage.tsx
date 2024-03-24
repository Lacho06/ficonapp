import FormAuth from './../../components/FormAuth'

const LoginPage = () => {
    return (
        <section className="grid h-screen grid-cols-12">
            <main className="flex flex-col justify-start col-span-12 sm:justify-center sm:col-span-8 place-items-center">
                <FormAuth />
            </main>
            <aside className="hidden sm:block sm:col-span-4 relative">
                <div className="absolute top-0 bottom-0 left-0 right-0 m-auto bg-[url('../src/assets/images/imageLogin.jpg')] bg-no-repeat bg-cover bg-center w-80 h-80 shadow-xl shadow-accent-400 rounded-xl"></div>
            </aside>
        </section>
    )
}

export default LoginPage