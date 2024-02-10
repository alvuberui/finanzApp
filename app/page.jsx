'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import InfoHome from './components/InfoHome';
import Link from 'next/link';

export default function Home() {

  return (
    <main style={{ width: '100%' }} className="flex min-h-screen flex-col items-center justify-between pt-10">
      <div style={{ width: '100%' }} className="flex items-center flex-col">
        <div className="flex justify-between flex-col w-full sm:w-[90%] md:w-[70%] lg:w-[70%] xl:w-[70%] max-w-[90%] sm:max-w-[90%] md:max-w-[70%] lg:max-w-[70%] xl:max-w-[70%]">
          <div className="flex justify-between flex-col sm:flex-row rounded p-5 bg-gray-100 shadow-lg">
            <div className="w-5/10 sm:w-6/10 mx-auto text-center pb-8 lg:pt-8 xl:pt-8 ">
              <h1 className="font-extrabold text-4xl text-black-600">Controla en todo momento</h1>
              <h2 className="font-extrabold text-4xl mb-4 text-red-400">tus finanzas personales</h2>
              <p className="font-light text-gray-700 text-lg">¡Crea tu cuenta y empieza a gestionar tu dinero!</p>
              <Link href="/register">
                <button className="bg-lime-300 text-black font-regular py-2 px-4 rounded cursor-pointer mt-10 hover:bg-lime-500">
                  Crear cuenta
                </button>
              </Link>
            </div>
            <div className="w-5/10 sm:w-4/10  mx-auto text-center bg-gray-50  rounded pt-8 pb-4 pr-4 pl-4  shadow-md">
              <h2 className="font-bold text-3xl text-black-600 mb-4">Accede a tu cuenta</h2>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                  email: Yup.string().email('Email invalido').required('El email es requerido'),
                  password: Yup.string().required('La contraseña es requerida'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                <Form className="flex flex-col items-center">
                  <div className="w-full mb-4">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                  </div>
                  <div className="w-full mb-4">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Contraseña"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                  </div>
                  <button type="submit" className="bg-lime-300 text-black font-regular py-2 px-4 rounded cursor-pointer hover:bg-lime-500">Acceder</button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col text-center sm:flex-row sm:w-4/5 lg:w-3/5 xl:w-3/5 mt-10 rounded p-5">
          <h1 className="font-extrabold text-center text-4xl text-black-600">¿Qué puedes hacer con finanzApp?</h1>
        </div>
        <div className="mt-5 mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:w-2/3">
          <div className="flex justify-center items-center">
            <InfoHome title="Obtén el control total de tus gastos" text="Podrás gestionar todos tus gastos a través de categorías" />
          </div>
          <div className="flex justify-center items-center">
            <InfoHome title="Obtén el control total de tus beneficios" text="Podrás gestionar todos tus beneficios" />
          </div>
          <div className="flex justify-center items-center">
            <InfoHome title="Obtén el control total de tus inversiones" text="Podrás gestionar todas tus inversiones" />
          </div>
          <div className="flex justify-center items-center">
            <InfoHome title="Obtén informes todos los meses" text="Obtendrás un informe por cada mes" />
          </div>
          <div className="flex justify-center items-center">
            <InfoHome title="Obtén estadísticas todos los años" text="Estadísticas anuales todos los años" />
          </div>
          <div className="flex justify-center items-center">
            <InfoHome title="Obten estadisticas históricas desde el primer momento" text="Podrás obtener en cualquier momento " />
          </div>
        </div>
      </div>
    </main>
  );
}
