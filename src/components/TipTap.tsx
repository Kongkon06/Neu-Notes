import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Button } from '../components/ui/button'
import { ImageResize } from 'tiptap-extension-resize-image'
import { useState } from 'react'
import Highlight from '@tiptap/extension-highlight';

const Tiptap = ({darkMode} : {darkMode : boolean}) => {
  const obsidianColors = {
    background: darkMode ? "#212121" : "#f8f8f8",
    card: darkMode ? "#2d2d2d" : "#ffffff",
    accent: darkMode ? "#8c78c9" : "#6A9C89",
    text: darkMode ? "#dddddd" : "#333333",
    textSecondary: darkMode ? "#888888" : "#666666",
    border: darkMode ? "#333333" : "#e0e0e0",
    hoverBg: darkMode ? "#363636" : "#f5f5f5",
    activeBg: darkMode ? "#454545" : "#e6e6e6",
    inputBg: darkMode ? "#3a3a3a" : "#ffffff",
  };
  const [title, setTitle] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            width: { default: '100%' },
            height: { default: 'auto' },
          }
        },
      }),
      ImageResize,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Highlight,
    ],
    content: '<p>Start writing your article...</p>',
    editorProps: {
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items
        if (!items) return false

        for (const item of items) {
          if (item.type.indexOf('image') === 0) {
            event.preventDefault()
            const file = item.getAsFile()
            if (file) {
              const reader = new FileReader()
              reader.onload = (readerEvent) => {
                const base64 = readerEvent.target?.result
                if (base64) {
                  view.dispatch(
                    view.state.tr.replaceSelectionWith(
                      view.state.schema.nodes.image.create({
                        src: base64,
                        alt: 'Pasted image',
                      })
                    )
                  )
                }
              }
              reader.readAsDataURL(file)
            }
            return true
          }
        }
        return false
      },
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none p-6 min-h-[500px]',
      },
    },
  })

  const addImage = (url: string) => {
    if (editor && url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const saveArticle = async () => {
    if (!editor || !title) return
    
    setIsSaving(true)
    try {
      const contentHtml = editor.getHTML()
      const contentJson = editor.getJSON()
      
      // Replace with your API call
      console.log('Saving article:', { title, contentHtml, contentJson })
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
    } finally {
      setIsSaving(false)
    }
  }

  if (!editor) return null

  return (
    <div 
      className="max-w-4xl mx-auto my-8"
      style={{ backgroundColor: obsidianColors.background }}
    >
      {/* Article Title */}
      <input
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          color: obsidianColors.text,
          backgroundColor: obsidianColors.inputBg,
          borderColor: obsidianColors.border
        }}
        className="w-full text-4xl font-bold mb-6 border-b focus:outline-none p-2 placeholder-gray-500"
      />

      {/* Formatting Toolbar */}
      <div 
        style={{
          backgroundColor: obsidianColors.card,
          borderColor: obsidianColors.border
        }}
        className="sticky top-0 z-10 p-2 border rounded-t-lg flex flex-wrap gap-2"
      >
        {/* Heading Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost"
              style={{
                color: obsidianColors.text,
                ':hover': { backgroundColor: obsidianColors.hoverBg }
              }}
            >
              Format
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            style={{
              backgroundColor: obsidianColors.card,
              borderColor: obsidianColors.border
            }}
          >
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              style={{
                color: obsidianColors.text,
                ':hover': { backgroundColor: obsidianColors.hoverBg }
              }}
            >
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              style={{
                color: obsidianColors.text,
                ':hover': { backgroundColor: obsidianColors.hoverBg }
              }}
            >
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              style={{
                color: obsidianColors.text,
                ':hover': { backgroundColor: obsidianColors.hoverBg }
              }}
            >
              Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().setParagraph().run()}
              style={{
                color: obsidianColors.text,
                ':hover': { backgroundColor: obsidianColors.hoverBg }
              }}
            >
              Paragraph
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Formatting Buttons */}
        <Button
          variant={editor.isActive('bold') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={{
            color: obsidianColors.text,
            backgroundColor: editor.isActive('bold') ? obsidianColors.activeBg : 'transparent',
            ':hover': { backgroundColor: obsidianColors.hoverBg }
          }}
        >
          B
        </Button>

        <Button
          variant={editor.isActive('italic') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={{
            color: obsidianColors.text,
            backgroundColor: editor.isActive('italic') ? obsidianColors.activeBg : 'transparent',
            ':hover': { backgroundColor: obsidianColors.hoverBg }
          }}
        >
          I
        </Button>

        <Button
          variant={editor.isActive('strike') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          style={{
            color: obsidianColors.text,
            backgroundColor: editor.isActive('strike') ? obsidianColors.activeBg : 'transparent',
            ':hover': { backgroundColor: obsidianColors.hoverBg }
          }}
        >
          S
        </Button>

        <Button
          variant={editor.isActive('highlight') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          style={{
            color: obsidianColors.text,
            backgroundColor: editor.isActive('highlight') ? obsidianColors.activeBg : 'transparent',
            ':hover': { backgroundColor: obsidianColors.hoverBg }
          }}
        >
          ✨
        </Button>

        {/* Text Alignment */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost"
              style={{
                color: obsidianColors.text,
                ':hover': { backgroundColor: obsidianColors.hoverBg }
              }}
            >
              Align
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            style={{
              backgroundColor: obsidianColors.card,
              borderColor: obsidianColors.border
            }}
          >
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              style={{
                color: obsidianColors.text,
                ':hover': { backgroundColor: obsidianColors.hoverBg }
              }}
            >
              Left
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              style={{
                color: obsidianColors.text,
                ':hover': { backgroundColor: obsidianColors.hoverBg }
              }}
            >
              Center
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              style={{
                color: obsidianColors.text,
                ':hover': { backgroundColor: obsidianColors.hoverBg }
              }}
            >
              Right
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              style={{
                color: obsidianColors.text,
                ':hover': { backgroundColor: obsidianColors.hoverBg }
              }}
            >
              Justify
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = (readerEvent) => {
                addImage(readerEvent.target?.result as string)
              }
              reader.readAsDataURL(file)
            }
          }}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Button 
            variant="ghost"
            style={{
              color: obsidianColors.text,
              ':hover': { backgroundColor: obsidianColors.hoverBg }
            }}
          >
            📷 Image
          </Button>
        </label>

        {/* Save Button */}
        <Button
          style={{
            backgroundColor: obsidianColors.accent,
            color: darkMode ? '#fff' : '#111',
            ':hover': { backgroundColor: darkMode ? '#7a68b5' : '#5d8a77' },
            ':disabled': { opacity: 0.7 }
          }}
          onClick={saveArticle}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Article'}
        </Button>
      </div>

      {/* Editor Content */}
      <div 
        style={{
          borderColor: obsidianColors.border,
          color: obsidianColors.text
        }}
        className="rounded-b-lg border"
      >
        <EditorContent editor={editor} />
      </div>

      {/* Floating Menu */}
      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          style={{
            backgroundColor: obsidianColors.card,
            borderColor: obsidianColors.border
          }}
          className="flex gap-1 p-1 rounded-lg shadow-lg"
        >
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            style={{
              color: obsidianColors.text,
              backgroundColor: editor.isActive('heading', { level: 1 }) 
                ? obsidianColors.activeBg 
                : 'transparent',
              ':hover': { backgroundColor: obsidianColors.hoverBg }
            }}
          >
            H1
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            style={{
              color: obsidianColors.text,
              backgroundColor: editor.isActive('heading', { level: 2 }) 
                ? obsidianColors.activeBg 
                : 'transparent',
              ':hover': { backgroundColor: obsidianColors.hoverBg }
            }}
          >
            H2
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            style={{
              color: obsidianColors.text,
              backgroundColor: editor.isActive('bulletList') 
                ? obsidianColors.activeBg 
                : 'transparent',
              ':hover': { backgroundColor: obsidianColors.hoverBg }
            }}
          >
            • List
          </Button>
        </FloatingMenu>
      )}

      {/* Bubble Menu */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          style={{
            backgroundColor: obsidianColors.card,
            borderColor: obsidianColors.border
          }}
          className="flex gap-1 p-1 rounded-lg shadow-lg"
        >
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            style={{
              color: obsidianColors.text,
              backgroundColor: editor.isActive('bold') 
                ? obsidianColors.activeBg 
                : 'transparent',
              ':hover': { backgroundColor: obsidianColors.hoverBg }
            }}
          >
            B
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            style={{
              color: obsidianColors.text,
              backgroundColor: editor.isActive('italic') 
                ? obsidianColors.activeBg 
                : 'transparent',
              ':hover': { backgroundColor: obsidianColors.hoverBg }
            }}
          >
            I
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            style={{
              color: obsidianColors.text,
              backgroundColor: editor.isActive('blockquote') 
                ? obsidianColors.activeBg 
                : 'transparent',
              ':hover': { backgroundColor: obsidianColors.hoverBg }
            }}
          >
            ❝
          </Button>
        </BubbleMenu>
      )}
    </div>
  )}

export default Tiptap
