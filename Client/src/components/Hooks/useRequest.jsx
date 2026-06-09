import { useEffect, useState } from "react";
import api from "../../api/axios";

export const useRequest = (searchTerm = "") => {
  const [formData, setFormData] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitRequest = async (selectedType, formData) => {
    setLoading(true);
    try {
      // 1. Payload construction - pinagsasama ang piniling Type at yung Form Data
      const payload = {
        typeOfCertificate: selectedType,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        suffix: formData.suffix,
        contactNumber: formData.contactNumber,
        purpose: formData.purpose,
        quantity: formData.quantity,
      };

      // 2. API Call gamit ang iyong axios instance
      const res = await api.post("/requests/apply", payload);
      return res;
    } catch (err) {
      console.error(
        "Submission Error:",
        err.response?.data?.message || err.message,
      );
      alert("Hindi ma-isave ang request. Pakicheck ang iyong koneksyon.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRequest = async () => {
    setLoading(true);
    try {
      const res = await api.get("/requests", {
        params: { search: searchTerm },
      });

      setRequests(res.data.data || []);
      return true;
    } catch (err) {
      alert("May Mali");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [searchTerm]);

  const sumbitDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/requests/${id}`);
      return true;
    } catch (err) {
      alert("Na delete na", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setLoading(true);
    try {
      const res = await api.put(`/requests/${id}/status`, { status: status });
      return true;
    } catch (err) {
      alert("May Error sa Saver", err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { submitRequest, loading, sumbitDelete, updateStatus, requests };
};
