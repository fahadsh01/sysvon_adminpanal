import React, { useState } from "react";
import axiosInstance from "./axiosinstance";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([
    { id: "", label: "", content: "" },
  ]);
  const [tags, setTags] = useState("");
  const [auther, setAuther] = useState("Sysvon Editorial Team");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { id: "", label: "", content: "" }]);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("auther", auther);
    formData.append("tags", tags);
    formData.append("sections", JSON.stringify(sections));
    formData.append("avatar", avatar);

    try {
      const res = await axiosInstance.post("/blog/create-blog", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("✅ Blog created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating blog.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Create New Blog</h2>
      {message && <p className="mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">
            Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            required
            className="p-3 border border-gray-300 rounded-md w-full"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Sections</h3>
          {sections.map((section, index) => (
            <div key={index} className="border p-4 rounded space-y-2">
              <input
                type="text"
                placeholder="ID"
                value={section.id}
                onChange={(e) =>
                  handleSectionChange(index, "id", e.target.value)
                }
                className="w-full border p-1 rounded"
                required
              />
              <input
                type="text"
                placeholder="Label"
                value={section.label}
                onChange={(e) =>
                  handleSectionChange(index, "label", e.target.value)
                }
                className="w-full border p-1 rounded"
                required
              />
              <textarea
                placeholder="Content"
                value={section.content}
                onChange={(e) =>
                  handleSectionChange(index, "content", e.target.value)
                }
                className="w-full border p-1 rounded"
                required
              />
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="text-red-500 text-sm"
              >
                Remove Section
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="text-blue-600 font-medium"
          >
            ➕ Add Section
          </button>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g. tech,react,node"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <input
          type="text"
          placeholder="Author"
          value={auther}
          onChange={(e) => setAuther(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}
