import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function MCEEDitor({formData, setFormData}) {
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    setFormData({...formData, description: content})
  }
  return (
    <Editor
      onInit={(evt, editor) => editorRef.current = editor}
      apiKey='ttl5j2zelyu37t9w6vlko7s4q2pxbs4xvt20gq1xlp74i7g5'
      init={{
        plugins: 'advlist autolink lists link image charmap preview anchor ' +
          'searchreplace visualblocks code fullscreen ' +
          'insertdatetime media table code help wordcount'
        ,
        menubar: true,
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

      }}
      value={formData.description}
      onEditorChange={handleEditorChange}
    />
  );
}