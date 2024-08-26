import { useState } from "react";
import "./SearchForm.css";
import SearchIcon from "/assets/icon-search.svg";
import * as yup from "yup";
function SearchForm({handleUserName}) {
    const [formData, setFormData] = useState({
        search: ""
      });
      const [error, setError] = useState({});
      const userSchema = yup.object().shape({
        search: yup.string().required("empty field")
      })
      async function formValidation() {
        try {
          const res = await userSchema.validate(formData, { abortEarly: false });
          setError({});
          return true;
        } catch (e) {
          const newErrors = {};
          e.inner.forEach((error) => {
            newErrors[error.path] = error.message;
          });
          setError(newErrors);
          return false;
        }
      }
      async function handleOnsubmitForm(event) {
        event.preventDefault();
        const isValid = await formValidation();
        if (isValid) {
          handleUserName(formData.search);
          setFormData({
            search:""
          });
        }
      }
      function handleOnChange(event) {
        const keyName = event.target.name;
        let keyValue = event.target.value;
        setFormData({
          [keyName]: keyValue
        });
      }
  return (
    <form action="" onSubmit={handleOnsubmitForm}>
      <img src={SearchIcon} alt="search icon" />
      <input
        type="text"
        name="search"
        value={formData.search}
        onChange={handleOnChange}
        autoComplete="off"
        placeholder="Search Github username..."
      />
      {
        error.search && <span className="error">{error.search}</span>
      }
      
      <button type="submit">Search</button>
    </form>
  );
}
export default SearchForm;
