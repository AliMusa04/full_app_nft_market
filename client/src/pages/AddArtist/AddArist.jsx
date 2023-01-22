import React from "react";
import "./AddArtist.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddArist = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      change: "",
      NFTsold: "",
      volume: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      change: Yup.number().required("Required"),
      NFTsold: Yup.number().required("Required"),
      volume: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      // console.log(JSON.stringify(values));
      axios.post("http://localhost:8080/api/artists", values);

      toast.success("Successfully created !");
    },
  });
  return (
    <div className="add_page_background">
      <div className="add_page_contanier">
        <h2>Create your own Artist</h2>
        <div className="formik_artist_div">
          <form className="formik_artist" onSubmit={formik.handleSubmit}>
            <input
              placeholder="Enter your Artist's first & last name"
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <span>{formik.errors.name} !</span>
            ) : null}

            <input
              placeholder="Enter your changes"
              id="change"
              name="change"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.change}
            />
            {formik.touched.change && formik.errors.change ? (
              <span>{formik.errors.change} !</span>
            ) : null}

            <input
              placeholder="Enter your sale"
              id="NFTsold"
              name="NFTsold"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.NFTsold}
            />
            {formik.touched.NFTsold && formik.errors.NFTsold ? (
              <span>{formik.errors.NFTsold} !</span>
            ) : null}

            <input
              placeholder="Enter Artist's volume"
              id="volume"
              name="volume"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.volume}
            />
            {formik.touched.volume && formik.errors.volume ? (
              <span>{formik.errors.volume}</span>
            ) : null}

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArist;
