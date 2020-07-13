import React from "react";
import { Editor, EditorTools, EditorUtils } from '@progress/kendo-react-editor';
import "@progress/kendo-theme-material/dist/all.css";

class InputEditor extends React.Component {
    editor = null;
    componentDidUpdate() {
        if (this.editor != null && this.editor.view !== undefined) {
            const view = this.editor.view;
            EditorUtils.setHtml(view, this.props.value);
        }
    }

    render() {
        const {
            Bold, Italic, Underline, Strikethrough, Subscript, Superscript,
            AlignLeft, AlignCenter, AlignRight, AlignJustify,
            Indent, Outdent, OrderedList, UnorderedList,
            Undo, Redo, FontSize, FontName, FormatBlock,
            Link, Unlink, InsertImage, ViewHtml,
            InsertTable,
            AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter,
            DeleteRow, DeleteColumn, DeleteTable,
            MergeCells, SplitCell
        } = EditorTools;
        return (
            <React.Fragment>
                <Editor
                    {...this.props}
                    tools={[
                        [Bold, Italic, Underline, Strikethrough],
                        [Subscript, Superscript],
                        [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                        [Indent, Outdent],
                        [OrderedList, UnorderedList],
                        FontSize, FontName, FormatBlock,
                        [Undo, Redo],
                        [Link, Unlink, InsertImage, ViewHtml],
                        [InsertTable],
                        [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                        [DeleteRow, DeleteColumn, DeleteTable],
                        [MergeCells, SplitCell]
                    ]}
                    contentStyle={{ height: 600, width: 1000 }}
                    ref={editor => this.editor = editor}
                />
            </React.Fragment>
        );
    }
}

export default InputEditor;
