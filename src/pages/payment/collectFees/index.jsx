import React, { useEffect, useState } from "react";

const CollectFees = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Collect Fees</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Fee Structure
          </label>
          <select className="w-full border rounded px-3 py-2">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Student
          </label>
          <select className="w-full border rounded px-3 py-2">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CollectFees;
