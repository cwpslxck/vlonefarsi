import Link from "next/link";
import React from "react";

function dashboardPage() {
  return (
    <div>
      <Link href={"/dashboard/new"}>افزودن محصول جدید</Link>
    </div>
  );
}

export default dashboardPage;
