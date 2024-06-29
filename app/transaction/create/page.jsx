'use client';
import useTransaction from '@/app/handlers/useTransaction';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import * as Yup from 'yup';

const Page = () => {

  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);

  const { createBenefitTransaction, createExpenseTransaction, createInvestmentTransaction } = useTransaction();

  return (
    <main style={{ width: '100%' }} className="flex min-h-screen flex-col items-center justify-between pt-5 bg-white">
      {isLoading && <LoadingSpinner />}
      <Formik
        initialValues={{ movementType: 'benefit', amount: '1', description: '', date: new Date().toISOString().substring(0, 10) , spentType: 'necessary', investmentType: 'benefit' }}
        const validationSchema = { Yup.object({
          movementType: Yup.string().required('El tipo de movimiento es requerido'),
          amount: Yup.number().required('La cantidad es requerida').min(1, 'Debe de ser mayor a 0'),
          description: Yup.string().required('La descripción es requerida').max(100, 'Máximo 100 caracteres'),
          date: Yup.date().required('La fecha es requerida').max(new Date(), 'La fecha no puede ser futura'),
          investmentType: Yup.string().when('movementType', {
            is: (val) => val === 'investment',
            then: () => Yup.string().required('El tipo de inversión es requerido'),
          }),
          spentType: Yup.string().when('movementType', {
            is: (val) => val === 'spent',
            then: () => Yup.string().required('El tipo de gasto es requerido'),
          }),
        })}
        onSubmit={async (values) => {
          switch (values.movementType) {
            case 'benefit':
              setIsLoading(true);
              const finalBenefit = { "quantity": values.amount, "description": values.description, "date": values.date };
              const resBenefit = await createBenefitTransaction(finalBenefit, setIsLoading);
              if(resBenefit) {
                router.push('/home');
              }
              break;
            case 'spent':
              setIsLoading(true);
              const finalExpense = { "quantity": values.amount, "description": values.description, "date": values.date, "expenseType": values.spentType === 'necessary' ? 'MANDATORY' : 'UNNECESSARY'};
              const resExpense = await createExpenseTransaction(finalExpense, setIsLoading);
              if(resExpense) {
                router.push('/home');
              }
              break;
            case 'investment':
              setIsLoading(true);
              const finalInvestment = { "quantity": values.amount, "description": values.description, "date": values.date, "investmentType": values.investmentType === 'benefit' ? 'BENEFIT' : 'INVESTMENT'};
              const resInvestment = await createInvestmentTransaction(finalInvestment, setIsLoading);
              if(resInvestment) {
                router.push('/home');
              }
              break;
          }
        }}
      >
        {formik => (
          <Form className="my-auto mb-auto flex flex-col w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-center mb-5">Nuevo movimiento</h1>
            <div className="flex flex-col mb-5">
              <label htmlFor="movementType" className="text-sm mb-1">Tipo de movimiento</label>
              <Field name="movementType" as="select" className="border border-gray-300 p-2 rounded-md">
                <option value="benefit">Beneficio</option>
                <option value="spent">Gasto</option>
                <option value="investment">Inversiones</option>
              </Field>
              <ErrorMessage name="movementType" component="div" className="text-red-500 text-sm" />
            </div>

            {formik.values.movementType === 'benefit' && (
              <>
                <div className="flex flex-col mb-5">
                  <label htmlFor="amount" className="text-sm mb-1">Cantidad</label>
                  <Field name="amount" type="number" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
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

            {formik.values.movementType === 'spent' && (
              <>
                <div className="flex flex-col mb-5">
                  <label htmlFor="spentType" className="text-sm mb-1">Tipo de gasto</label>
                  <Field name="spentType" as="select" className="border border-gray-300 p-2 rounded-md">
                    <option value="necessary">Necesario</option>
                    <option value="unnecessary">Prescindible</option>
                  </Field>
                  <ErrorMessage name="spentType" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="amount" className="text-sm mb-1">Cantidad</label>
                  <Field name="amount" type="number" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
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
                    <option value="benefit">Beneficio de inversiones</option>
                    <option value="spent">Voy a invertir dinero</option>
                  </Field>
                  <ErrorMessage name="investmentType" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="amount" className="text-sm mb-1">Cantidad</label>
                  <Field name="amount" type="number" className="border border-gray-300 p-2 rounded-md" />
                  <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
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

            <button type="submit" className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300 ease-in-out">Añadir movimiento</button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default Page;
