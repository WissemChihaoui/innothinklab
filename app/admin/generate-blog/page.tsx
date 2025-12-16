"use client";

import { useState } from "react";
// import { Button, Alert, Spinner } from 'react-bootstrap';

export default function GenerateBlogPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to generate blog");

      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1>AI Blog Generator</h1>
      <p className="lead">Generate a new blog post using AI</p>

      <div className="my-4">
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? <>Generating...</> : "Generate Blog Post"}
        </button>
      </div>

      {error && <p className="mt-3">Error: {error}</p>}

      {result && (
        <p className="mt-3">
          <h4>Blog Post Generated Successfully!</h4>
          <p>
            <strong>Title:</strong> {result.data.title}
          </p>
          <p>
            <strong>URL:</strong>{" "}
            {`${window.location.origin}/blog/${result.data.slug}`}
          </p>
          <div className="mt-3">
            <a
              href={`/blog/${result.data.slug}`}
              className="btn btn-sm btn-outline-primary me-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Post
            </a>
            <a href="/admin/blog" className="btn btn-sm btn-outline-secondary">
              Manage Posts
            </a>
          </div>
        </p>
      )}
    </div>
  );
}
