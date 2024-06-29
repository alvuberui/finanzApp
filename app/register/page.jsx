'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import useAuth from '../handlers/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {

  const router = useRouter();
  const { signup } = useAuth();
  const [ isLoading, setIsLoading ] = useState(false);

  return (
    <main style={{ width: '100%' }} className="flex min-h-screen flex-col items-center justify-between pt-5 bg-white">
      {isLoading && <LoadingSpinner />}
      <Formik
        initialValues={{ name: '', firstName: '', lastName: '', birthDate: '', currentMoney: 0, email: '', password: '', confirmPassword: '', acceptedTerms: false }}
        validationSchema={Yup.object({
          name: Yup.string().required('Campo obligatorio').max(50, 'Máximo 50 caracteres'),
          firstName: Yup.string().required('Campo obligatorio').max(50, 'Máximo 50 caracteres'),
          lastName: Yup.string().required('Campo obligatorio').max(50, 'Máximo 50 caracteres'),
          birthDate: Yup.date().max(new Date(new Date().getFullYear() - 12, new Date().getMonth(), new Date().getDate()), 'Debes de tener al menos 12 años').required('Campo obligatorio'),
          currentMoney: Yup.number().required('Campo obligatorio').min(0, 'No puede ser negativo'),
          email: Yup.string().email('Email inválido').required('Campo obligatorio').max(500, 'Máximo 500 caracteres'),
          password: Yup.string().min(6, 'Debe de contener al menos 6 caracteres').required('Campo obligatorio').max(50, 'Máximo 50 caracteres'),
          confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Campo obligatorio'),
          acceptedTerms: Yup.boolean().oneOf([true], 'Debes de aceptar términos y condiciones').required('Campo obligatorio')
        })}
        onSubmit={async (values) => {
            const response = await signup(values, setIsLoading)
            if (response) {
              router.push('/home')
            }
        }}
      >
        <Form className="my-auto mb-5 flex flex-col w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-5">Crear cuenta</h1>
          <p className="text-gray-600 text-sm text-center mb-5">Si ya tienes cuenta puedes <a href="/" className="text-red-400 hover:underline ">iniciar sesión aquí</a></p>
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
          <div className="flex flex-col mb-5">
            <label htmlFor="password" className="text-sm mb-1">Contraseña</label>
            <Field name="password" type="password" placeholder="Contraseña" className="border border-gray-300 p-2 rounded-md" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="confirmPassword" className="text-sm mb-1">Confirmar contraseña</label>
            <Field name="confirmPassword" type="password" placeholder={"Confirmar contraseña"} className="border border-gray-300 p-2 rounded-md" />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex items-center mb-5">
            <Field type="checkbox" name="acceptedTerms" className="mr-2" />
            <label htmlFor="acceptedTerms" className="text-sm text-gray-700">Acepto los términos y condiciones</label>
          </div>
          <ErrorMessage name="acceptedTerms" component="div" className="text-red-500 text-sm" />
          <button type="submit" className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300 ease-in-out">Crear cuenta</button>
        </Form>
      </Formik>
    </main>
  );

}
