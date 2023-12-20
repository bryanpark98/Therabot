import juice from "juice";
import showdown from "showdown";

const converter = new showdown.Converter();

export class MarkdownService {
  public static formatMarkdownToHtml(markdown: string): string {
    const html = `<body><div class="container">${converter.makeHtml(
      markdown
    )}</div></body>`;
    return juice.inlineContent(html, styles);
  }
}

const styles = `
    body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #555;
        margin: 0;
        padding: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container {
        max-width: 600px; // Changed to 400px as requested
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
    }
    h1 {
        font-size: 24px;
        margin-top: 0;
    }
    h2 {
        font-size: 20px;
    }
    p {
        margin-bottom: 20px;
        font-weight: '200';
    }
    a {
        color: #3498db;
        text-decoration: none;
        border-bottom: 1px solid #3498db;
        padding-bottom: 2px;
    }
    a:hover {
        opacity: 0.8;
    }
    button {
        background-color: #3498db;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 1px;
    }
    button:hover {
        background-color: #2980b9;
    }
    blockquote {
        margin: 20px 0;
        padding-left: 20px;
        border-left: 5px solid #3498db;
        font-style: italic;
        color: #666;
    }
`;
