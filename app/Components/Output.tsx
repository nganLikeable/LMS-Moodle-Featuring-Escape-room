"use client";

import { useState } from "react";
import { Tab } from "./types";

export default function Output() {
  const [output, setOutput] = useState("");
  const generateHtml = () => {
    const saved = localStorage.getItem("tabs");
    let tabButtons = "";
    let tabContents = "";

    if (saved) {
      // convert back to array of objs
      const tabs: Tab[] = JSON.parse(saved);

      let i = 1; // button index

      tabs.forEach((tab: Tab) => {
        tabButtons += `<button class = "tablinks" onClick="openTab(event, '${tab.id}')">${i}. ${tab.title}</button>`;
        tabContents += `
        <div id="${tab.id}" class="tabcontent" style="display:none; padding: 6px 12px; border: 1px solid #ccc; border-top: none;">
            <h3>${tab.title}</h3>
            <pre style="margin:0; line-height:125%; white-space:pre-wrap; word-break:break-all; overflow-wrap:anywhere; overflow: auto;">${tab.content}</pre>
        </div>`;
        i++;
      });
    }

    // generate html code using template literals
    const html = `<!doctype html>
    <html>
    <head>
        <title>Your Tabbed Interface</title>
        <meta charset="UTF-8">    
    </head>
    <body>
        ${tabButtons}
        ${tabContents}


        <!--JavaScript functions, taken from weekAssign.html-->
        <script>
            function openTab(evt, id) {
                var i, tabcontent, tablinks;
                tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablinks");
                for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" active", "");
                }
                document.getElementById(id).style.display = "block";
                evt.currentTarget.className += " active";
            }
        </script>    
    </body>
    </html>

    `;
    setOutput(html);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert("HTML copied to clipboard!");
  };

  return (
    <div>
      <button onClick={generateHtml}>Generate HTML</button>
      {output && (
        <>
          <button onClick={copyToClipboard}>Copy HTML</button>
          <textarea
            value={output}
            readOnly
            style={{ width: "100%", height: "300px", marginTop: "10px" }}
          />
        </>
      )}
    </div>
  );
}
