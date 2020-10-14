import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";

const FourOhFour = () => {
  const { Content } = Layout;

  return (
    <Layout>
      <Content>
        <div>
          <h1>404 Error: Not Found</h1>
          <br></br>
          <p>
            The page that you want to see does not exist. This may be because
            the data that you are requesting doesn't exist in the API. If you
            click in "by topic", you will see only indicators that have data.
          </p>
        </div>
      </Content>
    </Layout>
  );
};

export default FourOhFour;
