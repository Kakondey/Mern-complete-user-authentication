import axios from "axios";
import React, { useState } from "react";

const CustomerForm = () => {
  const [customerData, setCustomerData] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const customerData_ = {
        name: customerData,
      };
      await axios.post("http://localhost:5000/customer", customerData_);
      setCustomerData("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="customer name"
          value={customerData}
          onChange={(event) => setCustomerData(event.target.value)}
        />
        <button type="submit">Save new customer</button>
      </form>
    </div>
  );
};

export default CustomerForm;
