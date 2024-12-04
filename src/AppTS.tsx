import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:1337/api/companies"; // URL da API das empresas

interface Company {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    description: string;
    type: string;
    maximumTime: string;
    doubleEntry: boolean;
    credit: boolean;
    blackList: boolean;
    companyID: string;
    companyName: string;
    tradeName: string;
    igonreAntiDoubleEntry: boolean;
    totalPersons: number;
    personGroup: boolean;
  };
}

const Sidebar: React.FC<{ onMenuSelect: (menu: string) => void }> = ({ onMenuSelect }) => (
  <div style={{ width: "250px", backgroundColor: "#f0f0f0", padding: "20px", position: "fixed", left: 0, top: 0, height: "100vh" }}>
    <h3>Menu</h3>
    <ul>
      <li onClick={() => onMenuSelect("Dashboard")}>Dashboard</li>
      <li onClick={() => onMenuSelect("Monitoramento de Acessos")}>Monitoramento de Acessos</li>
      <li onClick={() => onMenuSelect("Monitoramento de Veículos")}>Monitoramento de Veículos</li>
      <li onClick={() => onMenuSelect("Monitoramento de Alarmes")}>Monitoramento de Alarmes</li>
      <li onClick={() => onMenuSelect("Planta Baixa")}>Planta Baixa</li>
      <li>Cadastros
        <ul>
          <li onClick={() => onMenuSelect("Pessoas")}>Pessoas</li>
          <li onClick={() => onMenuSelect("Visitantes")}>Visitantes</li>
          <li onClick={() => onMenuSelect("Grupos")}>Grupos</li>
          <li onClick={() => onMenuSelect("Empresas")}>Empresas</li>
          <li onClick={() => onMenuSelect("Tipos de Créditos")}>Tipos de Créditos</li>
          <li onClick={() => onMenuSelect("Gerenciamento de Créditos")}>Gerenciamento de Créditos</li>
          <li onClick={() => onMenuSelect("Cartões Provisórios")}>Cartões Provisórios</li>
          <li onClick={() => onMenuSelect("Veículos")}>Veículos</li>
        </ul>
      </li>
      <li onClick={() => onMenuSelect("Estacionamentos")}>Estacionamentos</li>
      <li onClick={() => onMenuSelect("Acesso")}>Acesso</li>
      <li onClick={() => onMenuSelect("Relatórios")}>Relatórios</li>
      <li onClick={() => onMenuSelect("Configurações")}>Configurações</li>
    </ul>
  </div>
);

const Dashboard: React.FC<{ companies: Company[] }> = ({ companies }) => (
  <div style={{ marginLeft: "270px" }}>
    <h1>Dashboard</h1>
    <h2>Companies List</h2>
    <ul>
      {companies.map((company) => (
        <li key={company.id}>
          <strong>{company.attributes.companyName}</strong> - {company.attributes.description}
        </li>
      ))}
    </ul>
  </div>
);

const App: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState<Partial<Company>>({});
  const [editingCompanyId, setEditingCompanyId] = useState<number | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string>("Dashboard");

  useEffect(() => {
    if (selectedMenu === "Empresas") {
      fetchCompanies();
    }
  }, [selectedMenu]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }
      const data = await response.json();
      if (data && data.data) {
        setCompanies(data.data);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCompanyId) {
        await updateCompany(editingCompanyId, formData);
      } else {
        await createCompany(formData);
      }
      setFormData({});
      setEditingCompanyId(null);
      fetchCompanies();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const createCompany = async (data: Partial<Company>) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create company");
      }
      fetchCompanies();
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const updateCompany = async (id: number, data: Partial<Company>) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update company");
      }
      fetchCompanies();
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  const deleteCompany = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete company");
      }
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleEdit = (company: Company) => {
    setFormData(company.attributes);
    setEditingCompanyId(company.id);
  };

  const handleCancelEdit = () => {
    setFormData({});
    setEditingCompanyId(null);
  };

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <div>
      <Sidebar onMenuSelect={handleMenuSelect} />
      {selectedMenu === "Empresas" && <Dashboard companies={companies} />}
      <form onSubmit={handleSubmit} style={{ marginLeft: "270px" }}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName || ""}
          onChange={handleInputChange}
        />
        <br />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description || ""}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">{editingCompanyId ? "Update" : "Create"}</button>
        {editingCompanyId && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default App;
