import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { getContactUs } from "graphql/contact";
const ContactUs = ({ match }) => {
  const {
    loading: isLoading,
    error,
    data = {},
    refetch
  } = useQuery(getContactUs);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="products-wrapper container">
      <div className=" products">
        <div
          dangerouslySetInnerHTML={{
            __html: data.contact.html
          }}
        />
      </div>
    </div>
  );
};

export default ContactUs;
