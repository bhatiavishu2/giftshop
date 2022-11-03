import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";
import Select from "components/core/form-controls/Select";
import {createUserRole} from 'graphql/rolesMapping'
import {  useMutation, useQuery } from '@apollo/client';
import {getRoles} from "graphql/roles"
import {getUsers} from "graphql/auth"

const ProductSchema = Yup.object().shape({
});

const CreateProduct = () => {
  const authDispatch = useContext(AuthDispatchContext);
  const { loading:isLoading, error, data = {} } = useQuery(getRoles);
  const { loading:userLoading,  data:userData = {} } = useQuery(getUsers);
  const history = useHistory();
  const location = useLocation();
  const [submitLogin] = useMutation(createUserRole);
  if(userLoading, isLoading){
    return null
  }
 const{roles = []} = data
 const{users = []} = userData

  return (
    <Formik

      initialValues={{
        userId: "",
        roleIds:""
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await submitLogin({ variables:
            values
          });
          resetForm();
          history.push('/userRoles')
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
            name="userId"
            type="text"
            placeholder="User"
            component={Select}
            options={users.map(c => ({name:c.name, value: c.id, label:`${c.name} - ${c.phone}`}))}
          />
        
           <Field
            name="roleIds"
            type="text"
            placeholder="Roles"
            component={Select}
            options={roles.map(c => ({name:c.name, value: c.id, label:c.name}))}
            multi
          />
          <button className="auth-button block" onClick={() => {}}>
            Create User Role
          </button>

        
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
