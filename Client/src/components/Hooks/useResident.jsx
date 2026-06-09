import { useState, useEffect } from "react";
import api from "../../api/axios";

export const useResident = (searchTerm = "") => {
  const [residents, setResidents] = useState([]);
  const [loding, setLoading] = useState(false);

  const fetchResidents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/resident", {
        params: { search: searchTerm },
      });

      setResidents(res.data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchResidents();
  }, [searchTerm]);

  const addResident = async (residentData) => {
    try {
      const res = await api.post("/resident/add", residentData);
      setResidents((prev) => [...prev, res.data.data]);
      return { success: true };
    } catch (err) {
      console.error("Save Error:", err);
      return { success: false, message: err.response?.data?.message };
    }
  };

  const deleteResident = async (id) => {
    try {
      await api.delete(`/resident/${id}`);
      setResidents((prev) => prev.filter((req) => req._id !== id));
      return true;
    } catch (err) {
      alert("Na Delete Na", err);
    }
  };
  return { residents, addResident, deleteResident };
};
