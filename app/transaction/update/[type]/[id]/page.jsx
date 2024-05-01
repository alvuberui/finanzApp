'use client';
import useTransaction from '@/app/handlers/useTransaction';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const page = ({params}) => {
  const router = useRouter();
  const { type, id } = params;
  const [ oldTransactions, setOldTransactions ] = useState();
  const { getTransactionByTypeAndId, updateTransaction } = useTransaction();

  useEffect(() => {
    async function fetchData() {
      if(type && id) {
        const ot = await getTransactionByTypeAndId(type, id);
        if(ot) {
          const dateObj = new Date(ot.date).toISOString().slice(0, 10);
          ot.date = dateObj;
        }
        setOldTransactions(ot);
      }
    }
    fetchData();
  }, []);

  if(!oldTransactions) {
    return (
      <main style={{ width: '100%' }} className="flex min-h-screen flex-col items-center justify-between pt-5 bg-white">
      </main>
    )
  } 
  return (
    <main style={{ width: '100%' }} className="flex min-h-screen flex-col items-center justify-between pt-5 bg-white">
      <Formik
        initialValues={{ movementType: oldTransactions.type, quantity: oldTransactions.quantity, description: oldTransactions.description, date: oldTransactions.date , expenseType: oldTransactions.expenseType, investmentType: oldTransactions.investmentType }}
        const validationSchema = { Yup.object({
          movementType: Yup.string().required('El tipo de movimiento es requerido'),
          quantity: Yup.number().required('La cantidad es requerida').min(1, 'Debe de ser mayor a 0'),
          description: Yup.string().required('La descripción es requerida').max(100, 'Máximo 100 caracteres'),
          date: Yup.date().required('La fecha es requerida').max(new Date(), 'La fecha no puede ser futura'),
          investmentType: Yup.string().when('movementType', {
            is: (val) => val === 'investment',
            then: () => Yup.string().required('El tipo de inversión es requerido'),
          }),
          expenseType: Yup.string().when('movementType', {
            is: (val) => val === 'expense',
            then: () => Yup.string().required('El tipo de gasto es requerido'),
          }),
        })}
        onSubmit={async (values) => {
          const response = await updateTransaction(type, id, values);
          if(response) {
            router.push('/home');
            setOldTransactions();
          }
        }}
      >
        {formik => (
          <Form className="my-auto mb-auto flex flex-col w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-center mb-5">Nuevo movimiento</h1>
            <div className="flex flex-col mb-5">
              <label htmlFor="movementType" className="text-sm mb-1">Tipo de movimiento</label>
              <Field disabled={true} name="movementType" as="select" className="border border-gray-300 p-2 rounded-md">
                <option value="benefit">Beneficio</option>
                <option value="expense">Gasto</option>
                <option value="investment">Inversiones</option>
              </Field>
              <ErrorMessage name="movementType" component="div" className="text-red-500 text-sm" />
            </div>

            {formik.values.movementType === 'benefit' && (
              <>
                <div className="flex flex-col mb-5">
                  <label htmlFor="quantity" className="text-sm mb-1">Cantidad</label>
                  <Field name="quantity" type="number" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="description" className="text-sm mb-1">Descripción</label>
                  <Field name="description" type="text" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="date" className="text-sm mb-1">Fecha</label>
                  <Field name="date" type="date" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                </div>
              </>
            )}

            {formik.values.movementType === 'expense' && (
              <>
                <div className="flex flex-col mb-5">
                  <label htmlFor="expenseType" className="text-sm mb-1">Tipo de gasto</label>
                  <Field name="expenseType" as="select" className="border border-gray-300 p-2 rounded-md">
                    <option value="MANDATORY">Necesario</option>
                    <option value="UNNECESSARY">Prescindible</option>
                  </Field>
                  <ErrorMessage name="expenseType" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="quantity" className="text-sm mb-1">Cantidad</label>
                  <Field name="quantity" type="number" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="description" className="text-sm mb-1">Descripción</label>
                  <Field name="description" type="text" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="date" className="text-sm mb-1">Fecha</label>
                  <Field name="date" type="date" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                </div>
              </>
            )}

            {formik.values.movementType === 'investment' && (
              <>
                <div className="flex flex-col mb-5">
                  <label htmlFor="investmentType" className="text-sm mb-1">Tipo de inversión</label>
                  <Field name="investmentType" as="select" className="border border-gray-300 p-2 rounded-md">
                    <option value="BENEFIT">Beneficio de inversiones</option>
                    <option value="INVESTMENT">Voy a invertir dinero</option>
                  </Field>
                  <ErrorMessage name="investmentType" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="quantity" className="text-sm mb-1">Cantidad</label>
                  <Field name="quantity" type="number" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="description" className="text-sm mb-1">Descripción</label>
                  <Field name="description" type="text" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="date" className="text-sm mb-1">Fecha</label>
                  <Field name="date" type="date" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                </div>
              </>
            )}

            <button type="submit" className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300 ease-in-out">Actualizar movimiento</button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default page
