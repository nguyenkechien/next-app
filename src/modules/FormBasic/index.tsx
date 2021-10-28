import { Formik, FormikHelpers, isFunction } from 'formik';
import React from 'react';
import { FormBasicType, FieldValuesType } from './types/form.interface';

const FormBasic: FormBasicType = props => {
  const { initialValues, onSubmit, onSubmitted, children } = props;

  const handleSubmitForm = async (
    values: FieldValuesType,
    formikHelpers: FormikHelpers<FieldValuesType>,
  ) => {
    console.log(`values`, values);
    console.log(`formikHelpers`, formikHelpers);
    // TODO submit form
    if (isFunction(onSubmit)) await onSubmit(values);
    if (isFunction(onSubmitted)) await onSubmitted();
    formikHelpers.resetForm();
  };

  return (
    <>
      <Formik initialValues={{ a: 'bac' }} onSubmit={handleSubmitForm}>
        {formProps => {
          return isFunction(children) ? children(formProps) : children;
        }}
      </Formik>
    </>
  );
};

export { FormBasic };
