import { useState, useRef, useEffect } from "react";
import { Send, ChevronDown } from "lucide-react";
import "./Prompt.css";
import PromptApi from './PromptApi';

function Prompt(props) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("industry");
  const textareaRef = useRef();
  const { agentId, agentName } = props.agent;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    const data = {
      agentId: agentId,
      agentName: agentName,
      prompt: text,
      mode: mode,
      sessionId: props.sessionId
    };
    setText("");
    try {
      const res = await PromptApi(data);

      if (res && res.execution_result && props.onResponse) {
        props.onResponse(res.execution_result);
      }
    } catch (error) {
      console.error("Failed to fetch from AI OS:", error);
    }
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [text]);

  return (
    <div className="prompt-root">
      <div className="prompt-controls">
        <div className="select-wrapper">
          <select
            className="cyber-select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="industry">industry</option>
            <option value="project">project</option>
          </select>
          <ChevronDown className="select-arrow" size={14} />
        </div>
      </div>
      <div className="prompt-box">
        <textarea
          ref={textareaRef}
          className="prompt-textarea"
          placeholder="Enter your prompt... (Shift+Enter for new line)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <div className="prompt-box-corner" />
        <button
          className={`send-btn ${text.trim() ? "active" : ""}`}
          onClick={handleSend}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default Prompt;