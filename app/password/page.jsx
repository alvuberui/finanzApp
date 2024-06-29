'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuth from '../handlers/useAuth';
import { useRouter } from "next/navigation";
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {

  const { changePassword } = useAuth();
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);

  return (
    <main style={{ width: '100%' }} className="flex min-h-screen flex-col items-center justify-between pt-5 bg-white">
      {isLoading && <LoadingSpinner />}
      <Formik
        initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
        validationSchema={Yup.object({
          currentPassword: Yup.string().min(6, 'Debe de contener al menos 6 caracteres').required('Campo obligatorio'),
          newPassword: Yup.string().min(6, 'Debe de contener al menos 6 caracteres').required('Campo obligatorio'),
          confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Las contraseñas deben coincidir').required('Campo obligatorio'),
        })}
        onSubmit={(values) => {
          setIsLoading(true);
          const response = changePassword(values, setIsLoading);
          if(response) {
            router.push('/home');
          }
        }}
      >
        <Form className="my-auto mb-auto flex flex-col w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-5">Modificar contraseña</h1>
          <p className="text-gray-600 text-sm text-center mb-5">Si quieres editar otros datos de tu cuenta, <a href="/account" className="text-red-400 hover:underline ">puedes hacerlo aquí</a></p>
          <div className="flex flex-col mb-5">
            <label htmlFor="currentPassword" className="text-sm mb-1">Contraseña actual</label>
            <Field name="currentPassword" type="password" placeholder="Contraseña actual" className="border border-gray-300 p-2 rounded-md" />
            <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="newPassword" className="text-sm mb-1">Nueva contraseña</label>
            <Field name="newPassword" type="password" placeholder={"Nueva contraseña"} className="border border-gray-300 p-2 rounded-md" />
            <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="confirmPassword" className="text-sm mb-1">Confirmar contraseña</label>
            <Field name="confirmPassword" type="password" placeholder={"Confirmar contraseña"} className="border border-gray-300 p-2 rounded-md" />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
          </div>
          <button type="submit" className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300 ease-in-out">Modificar contraseña</button>
        </Form>
      </Formik>
    </main>
  );

}
