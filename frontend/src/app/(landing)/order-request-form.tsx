'use client';

import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import isUrl from 'is-url';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { SpinnerGap as SpinnerGapIcon } from '@phosphor-icons/react';
import { OrderFormSchemaType, OrderRequestSchema } from './common';
import { useSSLOrderStore } from './ssl-order-store';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const OrderRequestForm = () => {
  const form = useForm<OrderFormSchemaType>({
    resolver: zodResolver(OrderRequestSchema),
    defaultValues: {
      domains: '',
      email: '',
    },
  });

  const { setRequest, setOrder, order } = useSSLOrderStore();

  const mutation = useMutation({
    mutationFn: (formValues: OrderFormSchemaType) => {
      return api.post('/order', formValues);
    },
    onSuccess(data, formValues) {
      setRequest(formValues);
      setOrder(data.data);
    },
  });

  function onSubmit(data: OrderFormSchemaType) {
    mutation.mutate(data);
  }

  const isFormInActive = mutation.isPending || order != null;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="domains"
            disabled={isFormInActive}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domains</FormLabel>
                <FormControl>
                  <Input placeholder="example.com,*.example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            disabled={isFormInActive}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="admin@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {mutation.isPending ? (
            <SpinnerGapIcon size={24} className="animate-spin" />
          ) : (
            <Button type="submit" disabled={isFormInActive}>
              Submit
            </Button>
          )}
        </form>
      </Form>
      {mutation.isError ? (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{mutation.error.message}</AlertDescription>
        </Alert>
      ) : null}
    </>
  );
};

export default OrderRequestForm;
