import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { getAboutUs } from "graphql/about";
const AboutUs = ({ match }) => {
  const {
    loading: isLoading,
    error,
    data = {},
    refetch
  } = useQuery(getAboutUs);

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
            __html: data.about.html
          }}
        />
      </div>
    </div>
  );
};

export default AboutUs;
