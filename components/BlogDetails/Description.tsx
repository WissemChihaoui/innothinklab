import React, { FC } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Description = ({ description }: { description: string }) => {
  return (
    <>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {description}
      </ReactMarkdown>
    </>
  );
};

export default Description;
