import React, {useState,useEffect} from "react";
import classNames from "classnames";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromHTML, EditorState, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'

const HTMLEditor = ({
  label,
  placeholder,
  className,
  field,
  form: { touched, errors },
  setFieldValue,
  ...props
}) => {
    const [state,setState] = useState( EditorState.createWithContent(
        ContentState.createFromBlockArray(
            htmlToDraft(field.value)
        )
      ))
    return(
  <div
    className={classNames("form-group", className, {
      error: touched[field.name] && errors[field.name]
    })}
  
  >
    {label && (
      <label className="form-label" htmlFor={field.name}>
        {label}
      </label>
    )}
      <Editor
                editorStyle={{border:'1px solid black'}}
              editorClassName="editor"
              editorState={
                state
              }
             onEditorStateChange={(editState, test)=>{
                setState(editState)
            }}
            onBlur={
                ()=> setFieldValue(field.name,draftToHtml(convertToRaw(state.getCurrentContent())))
             }
    />
    {touched[field.name] && errors[field.name] && (
      <div className="invalid-feedback">{errors[field.name]}</div>
    )}
  </div>
)};

export default HTMLEditor;
