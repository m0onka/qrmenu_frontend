import React, { useContext, useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { createPaymentIntent } from '../apis';
import AuthContext from '../contexts/AuthContext';

const PaymentForm = ({ amount, items, onDone, color }) => {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const auth = useContext(AuthContext);
  const params = useParams();

  const onSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      setLoading(true);
      const json = await createPaymentIntent({
        payment_method: paymentMethod,
        amount,
        place: params.id,
        table: params.table,
        detail: items
      }, auth.token);

      if (json?.success) {
        toast(`Ваш заказ #${json.order} обрабатывается`, {type: "success"});
        onDone();
        setLoading(false);
      } else if (json?.error) {
        toast(json.error, {type: "error"});
        setLoading(false);
      }
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button variant="standard" style={{ backgroundColor: color }} className="mt-4" block type="submit" disabled={loading}>
        {loading ? "Обработка..." : "Оплатить"}
      </Button>
    </Form>
  );
};

const stripePromise = loadStripe('pk_test_51I1mbCGi6ZyLV0th2pzGEGwGppthFwuXOjP8yfc3PAGwv7bWQicLsGsa4L8w0rjhDSlhZ3WEMl7sa0Ee2EUHHgec006b3rEyMV');

const StripeContext = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default StripeContext;
