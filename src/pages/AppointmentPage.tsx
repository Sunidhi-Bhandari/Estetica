import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/AppointmentPage.css";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setAppointmentItems, updateItemQty, setDiscountPercent } from "../features/appointment/appointmentSlice";
import { setAppointmentItems as setFromCart } from "../features/appointment/appointmentSlice";

const schema = yup.object({
  customerName: yup.string().required("Name required"),
  phone: yup.string().required("Phone required"),
});

type FormData = {
  customerName: string;
  phone: string;
  notes?: string;
};

const AppointmentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(s => s.cart.items);
  const appointment = useAppSelector(s => s.appointment);

  useEffect(() => {
    if (appointment.items.length === 0 && cartItems.length) {
      dispatch(setFromCart(cartItems));
    }
  }, []);

  const subtotal = appointment.items.reduce((a,b)=> a + b.price * b.qty, 0);
  const taxes = +(subtotal * 0.1).toFixed(0);
  const discount = +(subtotal * (appointment.discountPercent / 100));
  const total = subtotal + taxes - discount;

  const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log("Appointment", { data, items: appointment.items, totals: { subtotal, taxes, discount, total }});
    alert("Appointment submitted — check console");
  };

  return (
    <div className={"page"}>
      <h2>Complete Appointment</h2>
      <div className={"layout"}>
        <form className={"form"} onSubmit={handleSubmit(onSubmit)}>
          <div className={"field"}>
            <label>Name</label>
            <input {...register("customerName")} />
            <p className={"err"}>{errors.customerName?.message}</p>
          </div>
          <div className={"field"}>
            <label>Phone</label>
            <input {...register("phone")} />
            <p className={"err"}>{errors.phone?.message}</p>
          </div>
          <div className={"field"}>
            <label>Notes</label>
            <textarea {...register("notes")} rows={4}/>
          </div>

          <div className={"actions"}>
            <button type="submit">Submit Appointment</button>
          </div>
        </form>

        <aside className={"summary"}>
          <h3>Products in Appointment</h3>
          {appointment.items.length === 0 && <p className={"muted"}>No products selected</p>}
          {appointment.items.map(it => (
            <div key={it.id} className={"aItem"}>
              <img src={it.image} alt={it.name}/>
              <div className={"meta"}>
                <div>{it.name}</div>
                <div className={"controls"}>
                  <button onClick={() => dispatch(updateItemQty({ id: it.id, qty: it.qty - 1 }))}>-</button>
                  <span>{it.qty}</span>
                  <button onClick={() => dispatch(updateItemQty({ id: it.id, qty: it.qty + 1 }))}>+</button>
                </div>
              </div>
              <div>₹{it.price * it.qty}</div>
            </div>
          ))}

          <div className={"calc"}>
            <div><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div><span>Taxes (10%)</span><span>₹{taxes}</span></div>
            <div className={"discountRow"}>
              <label>Discount %</label>
              <input type="number" value={appointment.discountPercent} onChange={(e)=>dispatch(setDiscountPercent(Number(e.target.value || 0)))} />
            </div>
            <div className={"totalRow"}><strong>Total</strong><strong>₹{total}</strong></div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AppointmentPage;
