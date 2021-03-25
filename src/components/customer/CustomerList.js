import React from "react";

const CustomerList = ({ customers }) => {
  return (
    <div>
      <ul>
        {customers.map((customer) => {
          return <li key={customer._id}>{customer.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default CustomerList;
