import Table from "react-bootstrap/Table";
import { confirmAlert } from 'react-confirm-alert';

function ResponsiveTable({ data, onEdit, onDelete }) {
  const keys = data[0];
  const { __typename, ...restKeys } = keys;
  const getColumnValue = (item, key) =>{
  if(typeof item[key] === 'string'){
    return item[key]
  } else if(Array.isArray(item[key])){
    return item[key].map(i => i.name).join(' , ')
  }
    
  }
  return (
    <Table responsive="sm">
      <thead>
        <tr>
          {Object.keys(restKeys).map((key, index) => (
            <th key={key + index}>{key}</th>
          ))}
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.keys(restKeys).map((key) => (
              <td key={key + index}>{getColumnValue(item, key)}</td>
            ))}
            <td>
              {" "}
              {
                <button
                  className="outline edit-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                     onEdit(item)
                  }}
                >
                  <i className="rsc-icon-edit" />
                </button>
              }
            </td>
            <td>
              {" "}
              {
               <button className="outline delete-icon" onClick={async (e) => {
                e.stopPropagation()
                confirmAlert({
                  title: 'Confirm to Delete',
                  message: 'Are you sure you want to delete?.',
                  buttons: [
                    {
                      label: 'Yes',
                      onClick: () => (onDelete(item))
                    },
                    {
                      label: 'No',
                      onClick: () => ({})
                    }
                  ]
                });
               
               }}>
                    <i className="rsc-icon-delete" />
                  </button>
              }
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ResponsiveTable;
