import { useState, useCallback } from "react";

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

type ValidationSchema<T> = (values: T) => Partial<Record<keyof T, string>>;

interface UseFormReturn<T> extends FormState<T> {
  setValue: (name: keyof T, value: any) => void;
  setFieldTouched: (name: keyof T, touched?: boolean) => void;
  setSubmitting: (submitting: boolean) => void;
  reset: () => void;
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e: React.FormEvent) => void;
}

function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: ValidationSchema<T>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: keyof T, value: any) => {
    if (!validationSchema) return undefined;
    
    const newErrors = validationSchema({ ...values, [name]: value });
    return newErrors[name];
  }, [values, validationSchema]);

  const validateForm = useCallback((formValues: T) => {
    if (!validationSchema) return {};
    return validationSchema(formValues);
  }, [validationSchema]);

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name] && validationSchema) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField, validationSchema]);

  const setFieldTouched = useCallback((name: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
    
    if (isTouched && validationSchema) {
      const error = validateField(name, values[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [validateField, values, validationSchema]);

  const setSubmitting = useCallback((submitting: boolean) => {
    setIsSubmitting(submitting);
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback((onSubmit: (values: T) => void | Promise<void>) => 
    (e: React.FormEvent) => {
      e.preventDefault();
      
      const formErrors = validateForm(values);
      setErrors(formErrors);
      
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Partial<Record<keyof T, boolean>>);
      setTouched(allTouched);
      
      if (Object.keys(formErrors).length === 0) {
        setIsSubmitting(true);
        const result = onSubmit(values);
        
        if (result instanceof Promise) {
          result.finally(() => setIsSubmitting(false));
        } else {
          setIsSubmitting(false);
        }
      }
    }, [values, validateForm]);

  const isValid = Object.keys(errors).length === 0 && Object.values(values).every(value => 
    value !== "" && value !== null && value !== undefined
  );

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setValue,
    setFieldTouched,
    setSubmitting,
    reset,
    handleSubmit
  };
}

export default useForm;