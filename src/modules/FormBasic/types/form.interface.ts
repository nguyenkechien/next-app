import { FormikProps } from 'formik';
import { HttpResponse } from '../../../types/common.types';

export type FieldValuesType = {
  [x: string]: any;
};

export interface FormBasicProps<
  Values extends FieldValuesType = FieldValuesType,
> {
  initialValues: Values;
  onSubmit?: (values: Values) => Promise<void>;
  onSubmitted?: (response?: HttpResponse<Values>) => Promise<void>;
  children: ((props: FormikProps<Values>) => React.ReactNode) | React.ReactNode;
}

export type FormBasicType<
  Values extends FieldValuesType = FieldValuesType,
  ExtraProps = {},
> = (props: FormBasicProps<Values> & ExtraProps) => JSX.Element;
