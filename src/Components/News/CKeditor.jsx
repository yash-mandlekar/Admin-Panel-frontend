import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const MyCkeditor = ({ setNewsForm, description }) => {
  return (
    <div>
      <div classwane="App">
        <CKEditor
          editor={Editor}
          data={description}
          onChange={(e, editor) => {
            const data = editor.getData();
            setNewsForm((prev) => ({ ...prev, description: data }));
          }}
        />
      </div>
    </div>
  );
};

export default MyCkeditor;
