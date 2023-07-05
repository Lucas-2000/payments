import React, { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="container mx-auto p-2">{children}</div>;
};
