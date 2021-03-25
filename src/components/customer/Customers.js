import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    const customersRes = await axios.get("http://localhost:5000/customer");
    setCustomers(customersRes.data);
  };

  useEffect(() => {
    getCustomers();
  }, [customers]);
  return (
    <div>
      <CustomerForm />
      <CustomerList customers={customers} />
    </div>
  );
};

export default Customers;
