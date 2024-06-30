import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-lime-300">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">finanzApp</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-black">Legal</h2>
                            <ul className="text-black-500 dark:text-black-400 font-medium">
                                <li className="mb-4">
                                    <a href="/info/terms" className="hover:underline">Políticas de privacidad</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-black">Sobre nosotros</h2>
                            <ul className="text-black-500 dark:text-black-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://github.com/alvuberui" className="hover:underline ">Sobre el autor</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-black-900 uppercase dark:text-black">Soporte</h2>
                            <ul className="text-black dark:text-black-400 font-medium">
                                <li className="mb-4">
                                    <a href="/info/help" className="hover:underline">Centro de ayuda</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-800 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-800 sm:text-center dark:text-gray-800">© 2024 <a href="/home" className="hover:underline">Álvaro Úbeda™</a>. Todos los derechos reservados.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="https://www.facebook.com/profile.php?id=100010164360323" className="text-black-800 hover:text-black-900 dark:hover:text-black">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="https://x.com/i/flow/login?redirect_after_login=%2Falvaro_ubeda8" className="text-black-800 hover:text-black-900 dark:hover:text-black ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="https://github.com/alvuberui" className="text-black-800 hover:text-black-900 dark:hover:text-black ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">GitHub account</span>
                        </a>
                        <a href="https://www.instagram.com/alvaro_ubeda8/" className="text-black-800 hover:text-black-900 dark:hover:text-black ms-5">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 0c3.29 0 3.68.012 4.96.07 1.26.057 2.13.26 2.94.55.79.3 1.47.7 2.14 1.36.66.66 1.06 1.34 1.36 2.14.29.81.49 1.68.55 2.94.06 1.28.07 1.67.07 4.96s-.012 3.68-.07 4.96c-.057 1.26-.26 2.13-.55 2.94-.3.79-.7 1.47-1.36 2.14-.66.66-1.34 1.06-2.14 1.36-.81.29-1.68.49-2.94.55-1.28.06-1.67.07-4.96.07s-3.68-.012-4.96-.07c-1.26-.057-2.13-.26-2.94-.55-.79-.3-1.47-.7-2.14-1.36-.66-.66-1.06-1.34-1.36-2.14-.29-.81-.49-1.68-.55-2.94C.012 15.68 0 15.29 0 12s.012-3.68.07-4.96c.057-1.26.26-2.13.55-2.94.3-.79.7-1.47 1.36-2.14C2.68 1.06 3.34.66 4.14.36 4.95.07 5.82-.13 7.08-.19 8.36-.26 8.75-.27 12-.27zm0 1.8c-3.19 0-3.56.01-4.8.07-1.18.06-1.97.24-2.6.5-.67.28-1.22.64-1.78 1.2-.56.56-.92 1.1-1.2 1.78-.26.63-.44 1.42-.5 2.6-.06 1.24-.07 1.61-.07 4.8s.01 3.56.07 4.8c.06 1.18.24 1.97.5 2.6.28.67.64 1.22 1.2 1.78.56.56 1.1.92 1.78 1.2.63.26 1.42.44 2.6.5 1.24.06 1.61.07 4.8.07s3.56-.01 4.8-.07c1.18-.06 1.97-.24 2.6-.5.67-.28 1.22-.64 1.78-1.2.56-.56.92-1.1 1.2-1.78.26-.63.44-1.42.5-2.6.06-1.24.07-1.61.07-4.8s-.01-3.56-.07-4.8c-.06-1.18-.24-1.97-.5-2.6-.28-.67-.64-1.22-1.2-1.78-.56-.56-1.1-.92-1.78-1.2-.63-.26-1.42-.44-2.6-.5-1.24-.06-1.61-.07-4.8-.07zM12 5.82a6.18 6.18 0 100 12.36A6.18 6.18 0 0012 5.82zm0 1.8a4.38 4.38 0 110 8.76 4.38 4.38 0 010-8.76zm5.16-2.7a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" clipRule="evenodd"/>
</svg>

                            <span className="sr-only">Instagram account</span>
                        </a>
                        <a href="https://www.linkedin.com/in/%C3%A1lvaro-%C3%BAbeda-8358691a9/" className="text-black-800 hover:text-black-900 dark:hover:text-black ms-5">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M22.23 0H1.77C.79 0 0 .8 0 1.77v20.45C0 23.21.8 24 1.77 24h20.45c.98 0 1.77-.8 1.77-1.77V1.77C24 .8 23.21 0 22.23 0zm-14.8 20.48H3.54V9.1h3.9v11.38zm-1.95-12.97a2.28 2.28 0 110-4.56 2.28 2.28 0 010 4.56zm15.37 12.97h-3.9v-5.54c0-1.32-.47-2.23-1.65-2.23-.9 0-1.44.61-1.68 1.2-.09.23-.11.54-.11.85v5.72h-3.9s.05-9.29 0-10.25h3.9v1.45c.52-.8 1.45-1.95 3.53-1.95 2.58 0 4.52 1.69 4.52 5.35v5.4z" clipRule="evenodd"/>
</svg>
                            <span className="sr-only">Linkedin</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
