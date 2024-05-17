'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Order } from './common';
import { useSSLOrderStore } from './ssl-order-store';
import { LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VerifyButton = () => {
  const { request, setOrder, order } = useSSLOrderStore();

  const mutation = useMutation({
    mutationFn: () => {
      return api.post<Order>('/order/verify', {
        orderId: order?.orderId,
        email: request?.email,
      });
    },
    onSuccess(data) {
      setOrder(data.data);
    },
  });

  if (!order) {
    return null;
  }

  return (
    <div>
      {mutation.isPending ? (
        <LoaderCircleIcon size={24} className="animate-spin" />
      ) : (
        <Button onClick={() => mutation.mutate()}>Submit</Button>
      )}
    </div>
  );
};

export default VerifyButton;
