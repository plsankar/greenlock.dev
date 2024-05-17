import React, { useState } from 'react';
import OrderRequestForm from './order-request-form';
import Challenges from './challenges';
import VerifyButton from './verify-button';

const SSLGenerateForm = () => {
  return (
    <div className="grid space-y-8 w-full max-w-xl">
      <OrderRequestForm />
      <Challenges />
      <VerifyButton />
    </div>
  );
};

export default SSLGenerateForm;
