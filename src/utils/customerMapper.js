export function customerToJson(customer) {
  return {
    email: customer.email,
    metadata: {
      fullname: customer.fullname,
      city: customer.city,
      street: customer.street,
      housenumber: customer.housenumber,
      zip: customer.zip,
    },
  };
}

export function jsonToCustomer(data) {
  return {
    id: data.id,
    fullname: data.metadata.fullname,
    email: data.email,
    city: data.metadata.city,
    street: data.metadata.street,
    housenumber: data.metadata.housenumber,
    zip: data.metadata.zip,
  };
}
