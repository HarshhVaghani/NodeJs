import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const [students , setStudents] = useState([]);

  const [editStudents , setEditStudents] = useState(null);

  // const fetchStudents = async() => {
  //   const res = axios.get("http://localhost:6030/")
  //   setStudents(res.data)
  // }

  // useEffect(() => {
  //   fetchStudents()
  // } , [])


  return (
    <>
      <div className="heading">Dashboard</div>

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="bg-neutral-secondary-soft border-b border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Student Email
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Student Course
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Student Age
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                Apple Watch 5
              </th>
              <td className="px-6 py-4">Red</td>
              <td className="px-6 py-4">Wearables</td>
              <td className="px-6 py-4">$999</td>
              <td className="px-6 py-4">
                <Link to='/edit' className="font-medium text-fg-brand hover:underline">
                  Edit
                </Link>
                 <Link to="/delete" className="font-medium text-fg-brand hover:underline">
                  Delete
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
