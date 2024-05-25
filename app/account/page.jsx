'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuth from '../handlers/useAuth';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function AccountData() {
  const router = useRouter();
  const { deleteAccount } = useAuth();

  const handleDeleteAccount = async () => {
    confirmAlert({
      title: '¿Seguro que deseas eliminar tu cuenta?',
      message: '¡Esta acción es irreversible!',
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            const response = await deleteAccount();
            if(response) {
              toast.success(response);
              router.push('/');
            }
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  return (
    <main style={{ width: '100%' }} className="flex min-h-screen flex-col items-center justify-between pt-5 bg-white">
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Campo obligatorio'),
          firstName: Yup.string().required('Campo obligatorio'),
          lastName: Yup.string().required('Campo obligatorio'),
          birthDate: Yup.date().required('Campo obligatorio'),
          currentMoney: Yup.number().required('Campo obligatorio'),
          email: Yup.string().email('Email inválido').required('Campo obligatorio'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        <Form className="mx-auto my-auto flex flex-col w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-5">Modificar datos</h1>
          <p className="text-gray-600 text-sm text-center mb-5">Si deseas modificar tu contraseña <a href="/password" className="text-red-400 hover:underline ">hazlo aquí</a></p>
          <div className="flex flex-col mb-5">
            <label htmlFor="name" className="text-sm mb-1">Nombre</label>
            <Field name="name" type="text" placeholder="Nombre" className="border border-gray-300 p-2 rounded-md" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="firstName" className="text-sm mb-1">Primer apellido</label>
            <Field name="firstName" type="text" placeholder="Primer apellido" className="border border-gray-300 p-2 rounded-md" />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="lastName" className="text-sm mb-1">Segundo apellido</label>
            <Field name="lastName" type="text" placeholder="Segundo apellido" className="border border-gray-300 p-2 rounded-md" />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
          </div>
          <div style={{ width: "100%" }} className="flex flex-col mb-5">
            <label htmlFor="birthDate" className="text-sm mb-1">Fecha de nacimiento</label>
            <div className="relative">
              <Field style={{ width: "100%", backgroundColor: "white" }} name="birthDate" type="date" className="border border-gray-300 p-2 rounded-md" />
              <span className="absolute top-2 left-2 text-gray-400 pointer-events-none block xl:hidden">Fecha de nacimiento</span>
            </div>
            <ErrorMessage name="birthDate" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="currentMoney" className="text-sm mb-1">Dinero actual</label>
            <Field name="currentMoney" type="number" placeholder="Dinero actual" className="border border-gray-300 p-2 rounded-md" />
            <ErrorMessage name="currentMoney" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="text-sm mb-1">Email</label>
            <Field name="email" type="email" placeholder="Email" className="border border-gray-300 p-2 rounded-md" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <ErrorMessage name="acceptedTerms" component="div" className="text-red-500 text-sm" />
          <button type="submit" className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300 ease-in-out">Modificar datos</button>
        </Form>
      </Formik>
      { /* Add delete account button */ }
      <div className="mx-auto my-auto flex flex-col w-full max-w-md bg-white rounded-lg shadow-md p-8 mt-4 mb-4">
        <h1 className="text-3xl font-bold text-center mb-5">Eliminar cuenta</h1>
        <p className="text-gray-600 text-sm text-center mb-5">¡Esta acción es irreversible!</p>
        <button onClick={handleDeleteAccount} className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300 ease-in-out">Eliminar cuenta</button>
      </div>
    </main>
  );

}
