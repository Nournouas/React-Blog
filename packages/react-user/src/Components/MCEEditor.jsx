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
        selector: 'textarea#premiumskinsandicons-naked',
        skin: 'naked',
        icons: 'small',
        plugins: 'lists code table codesample link',
        menubar: false,
        statusbar: false,
        toolbar: 'blocks | bold italic underline strikethrough bullist link codesample',
        toolbar_location: 'bottom',
        content_style: `#tinymce { background-color: #F1E7D0}`
      }}
      value={formData.description}
      onEditorChange={handleEditorChange}
    />
  );
}