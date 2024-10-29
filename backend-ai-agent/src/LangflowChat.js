import React, { useEffect } from 'react';

const LangflowChat = () => {
  useEffect(() => {
    // Check if the script is already loaded to avoid adding it multiple times
    const scriptUrl = "https://cdn.jsdelivr.net/gh/logspace-ai/langflow-embedded-chat@v1.0.6/dist/build/static/js/bundle.min.js";
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onerror = () => {
        console.error("Failed to load the LangFlow script.");
      };
      document.head.appendChild(script);

      // Clean up the script when component unmounts
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <div>
      <langflow-chat
        window_title="My Chatbot"
        flow_id="eefb3a00-970f-475d-aa59-06e693fb3c7e"
        host_url="http://localhost:7860"
      ></langflow-chat>
    </div>
  );
};

export default LangflowChat;
