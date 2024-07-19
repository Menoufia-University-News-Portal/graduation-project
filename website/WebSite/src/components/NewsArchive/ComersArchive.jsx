import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { IconField } from "primereact/iconfield";
import { Calendar } from "primereact/calendar";
//import "./archive.css";


export default function ComersArchive() {
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/comers-news/viewAll')
      .then(response => response.json())
      .then(data => setNews(getCustomers(data)))
      .catch(error => console.error('Error fetching news:', error));
    setLoading(false);
    initFilters();
  }, []);

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.created_at = new Date(d.created_at);
      return d;
    });
  };

  const formatDate = (value) => {
    return value.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      title: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      created_at: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
    });
    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        {/*<Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} /> */}
        {/*  <IconField iconPosition="left">*/}
        <p></p>
        {/* <InputIcon className="pi pi-search" />*/}
       <p> <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="                        ...ابحث هنا"  /> </p>
        {/*</IconField> */}
      </div>
    );
  };

  const dateBodyTemplate = (value) => {
    return formatDate(value.created_at);
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.created_at}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const balanceBodyTemplate = (rowData) => {
    return <Link  to={`/news/${rowData.news_id}`}>اقرأ المزيد</Link>;
  };

  const titleBodyTemplate = (rowData) => {
    return (
      <div lang="ar" dir="rtl" className="flex align-items-center justify-center gap-8">
        <span>{rowData.title}... </span>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className=" responsive-card" style={{ paddingTop: 70 }}>
      <DataTable
        value={news}
        paginator
        rows={10}
        loading={loading}
        dataKey="id"
        filters={filters}
        globalFilterFields={["title"]}
        header={header}
        emptyMessage="No data found."
        className="responsive-table"
      >
        <Column style={{ minWidth: "7rem" }} body={balanceBodyTemplate} />
        <Column field="title" body={titleBodyTemplate} />
        <Column
        className="clander"
          header="تاريخ الخبر"
          filterField="created_at"
          dataType="date"
          style={{ minWidth: "5rem" }}
          body={dateBodyTemplate}
          filter
          filterElement={dateFilterTemplate}
        />
      </DataTable>
    </div>
  );
}
