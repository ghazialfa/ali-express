"use client";

import { useSearchParams } from "next/navigation";

const ClientFlashComponent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  return (
    <div>
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded relative"
          role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ClientFlashComponent;
