import React from "react";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div className="text-center">
      <h2>Successfully Added User</h2>
      <Link to="/">Home</Link>
    </div>
  );
}
