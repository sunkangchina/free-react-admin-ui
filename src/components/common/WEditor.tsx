import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';

interface WEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export function WEditor({ value, onChange }: WEditorProps) {
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // Editor configuration
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: 'Please enter content...',
    MENU_CONF: {},
  };

  // Toolbar configuration
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'headerSelect',
      'blockquote',
      '|',
      'bold',
      'underline',
      'italic',
      {
        key: 'group-more-style',
        title: 'More',
        menuKeys: ['through', 'code', 'clearStyle'],
      },
      '|',
      'bulletedList',
      'numberedList',
      'todo',
      {
        key: 'group-justify',
        title: 'Alignment',
        menuKeys: ['justifyLeft', 'justifyCenter', 'justifyRight'],
      },
      '|',
      'insertLink',
      'insertImage',
      'insertTable',
      '|',
      'undo',
      'redo',
    ],
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-x-hidden">
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        className="border-b border-gray-300"
      />
      <Editor
        defaultConfig={editorConfig}
        value={value}
        onCreated={setEditor}
        onChange={editor => onChange(editor.getHtml())}
        className="min-h-[300px] prose max-w-none"
      />
    </div>
  );
}
