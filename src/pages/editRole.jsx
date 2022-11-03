import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";
import Select from "components/core/form-controls/Select";
import {getPermissions} from 'graphql/permissions';
import {updateRole,getRoleById} from 'graphql/roles'
import {  useMutation, useQuery } from '@apollo/client';

const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!")
});

const CreateProduct = ({match}) => {
  const authDispatch = useContext(AuthDispatchContext);
  const { loading:isLoading, error, data = {} } = useQuery(getPermissions);

  const  { loading:roleDataLoading,  data:roleData = {} } = useQuery(getRoleById, {variables:{
    id: match?.params?.id
  }});

  const history = useHistory();
  const location = useLocation();
  const [submitLogin] = useMutation(updateRole);
  if(roleDataLoading){
    return null
  }
 const{permissions = []} = data

  return (
    <Formik

      initialValues={{
        name: "",
        permissions:"",
        ...roleData.role,
        permissions: roleData.role.permissionsDetails.map(permission => permission.id)
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await submitLogin({ variables:
            values
          });
          resetForm();
          history.push('/roles')
          // getContext({ variables:
          //   {token:userData?.data?.login?.token}
          // });
         
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {() => (
        <Form  className="form-container">
          <Field
            name="name"
            type="text"
            placeholder="Role Name"
            component={Input}
          />
        
           <Field
            name="permissions"
            type="text"
            placeholder="Permissions"
            component={Select}
            options={permissions.map(c => ({name:c.name, value: c.id, label:c.name}))}
            multi
          />
          <button className="auth-button block" onClick={() => {}}>
            Update Role
          </button>

        
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
