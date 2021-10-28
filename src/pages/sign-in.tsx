import type { NextPage } from 'next';
import React from 'react';
import { FormBasic } from '@src/modules/FormBasic';

const SignIn: NextPage = () => {
  return (
    <>
      <FormBasic initialValues={{ a: '123' }}>
        {({ values }) => {
          return 123;
        }}
      </FormBasic>
    </>
  );
};

export default SignIn;
