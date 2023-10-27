import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  closePopup,
  handleCardNumberChange,
  handleExpiryDateChange,
  fetchPopup,
  handlePhoneNumberChange,
} from "../../redux/slices/popupSlice";
import { AppDispatch, RootState } from "../../redux/store";

import "./deliveryPopup.scss";

const DeliveryPopup = () => {
  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Invalid card number")
      .required("Card number is required"),
    expiryDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)")
      .required("Expiry date is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{3} \d{3} \d{2} \d{2}$/, "Invalid phone number")
      .required("Phone number is required"),
  });

  const { cardNumber, expiryDate, phoneNumber } = useSelector(
    (state: RootState) => state.popup
  );
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(fetchPopup()).then((result) => {
      if (fetchPopup.fulfilled.match(result)) {
        dispatch(handleCardNumberChange(""));
        dispatch(handleExpiryDateChange(""));
        dispatch(handlePhoneNumberChange(""));
        dispatch(closePopup());
      }
    });
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => dispatch(closePopup())}>
            &times;
          </span>
          <h2>Enter your details</h2>
          <Formik
            initialValues={{ cardNumber, expiryDate, phoneNumber }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <label htmlFor="cardNumber">Card number:</label>
              <Field
                className="delivery-input"
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="Enter card number"
                inputMode="numeric"
              />
              <ErrorMessage
                name="cardNumber"
                component="div"
                className="error-message"
              />
              <label htmlFor="expiryDate">Validity:</label>
              <Field
                className="delivery-input"
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="Enter expiration date"
                inputMode="numeric"
              />
              <ErrorMessage
                name="expiryDate"
                component="div"
                className="error-message"
              />
              <label htmlFor="phoneNumber">Phone number:</label>
              <Field
                className="delivery-input"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="055 555 55 55"
                inputMode="numeric"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="error-message"
              />
              <button className="button_submit" type="submit">
                Order
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default DeliveryPopup;
