import { useEffect, useState } from "react";
import api from "../../api/axios";

export const useConcern = () => {
  const [concernData, setConcernData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConcern = async () => {
    setLoading(true);
    try {
      const res = await api.get("/concern");
      setConcernData(res.data.data);
      return true;
    } catch (err) {
      console.error("Fetch Err", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcern();
  }, []);

  const submitConcern = async (data) => {
    try {
      const formData = new FormData();

      if (data.imageFile) {
        formData.append("image", data.imageFile);
      }

      const textFields = {
        typeOfConcern: data.typeOfConcern || "",
        specificConcern: data.specificConcern || "",
        location: data.location || "",
        description: data.description || "",
        date: data.date || "",
        time: data.time || "",
        priorityLevel: data.priorityLevel,
        status: "Pending",
      };

      Object.entries(textFields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await api.post("/concern/add", formData);

      setConcernData((prev) => [...prev, res.data.data]);
      return true;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "May error sa server, subukan muli.";
      console.error("❌ Submission Failed:", errorMessage);

      alert(errorMessage);
      return false;
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/concern/${id}/status`, { status: status });
      return true;
    } catch (err) {
      alert("May Error", err);
      return false;
    }
  };

  const resolveConcern = async (id, formData) => {
    try {
      const res = await api.put(`/concern/resolve/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setConcernData((prev) =>
        prev.map((item) => (item._id === id ? res.data.data : item)),
      );

      return true;
    } catch (err) {
      console.error("❌ Resolution Failed:", err);
      return false;
    }
  };

  return { concernData, submitConcern, updateStatus, loading, resolveConcern };
};
