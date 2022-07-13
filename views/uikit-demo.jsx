import React from "react";
import ForgeUI, { Button, Fragment, Text, Badge } from "@forge/ui";

export default function App() {
  return (
    <Fragment>
      <Text>
        <Badge appearance="removed" text="-10" />
        <Badge appearance="added" text="+27" />
        <Badge appearance="primary" text="5K" />
      </Text>
      <Text>This is the demo text </Text>
      <Button text="Click"/>
    </Fragment>
  );
}
