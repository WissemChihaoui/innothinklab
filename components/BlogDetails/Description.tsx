'use client'
import React, { FC } from "react";


const Description = ({ description }: { description: string }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: description }} />
  );
};

export default Description;
