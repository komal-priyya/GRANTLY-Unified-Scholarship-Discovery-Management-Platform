import React from "react";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer>
        <span className="footer-brand">grantly.</span>
        <span>Your ambition deserves a little support.</span>
        <span>
          Built for brighter beginnings <Leaf size={13} />
        </span>
      </footer>
    </>
  );
}
